#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import ssl
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LATEST_DIR = ROOT / "data" / "latest"
PERIOD_DIR = ROOT / "data" / "social"

POPULATION_URL = "https://email.chcg.gov.tw/df/ksp8g3hdawy5c7yc5q7s2e8dd972af"
INCOME_URL = "https://www.fia.gov.tw/WEB/fia/ias/ias111/111_165-9.csv"

TOWNS = [
    "彰化市",
    "鹿港鎮",
    "和美鎮",
    "線西鄉",
    "伸港鄉",
    "福興鄉",
    "秀水鄉",
    "花壇鄉",
    "芬園鄉",
    "員林市",
    "溪湖鎮",
    "田中鎮",
    "大村鄉",
    "埔鹽鄉",
    "埔心鄉",
    "永靖鄉",
    "社頭鄉",
    "二水鄉",
    "北斗鎮",
    "二林鎮",
    "田尾鄉",
    "埤頭鄉",
    "芳苑鄉",
    "大城鄉",
    "竹塘鄉",
    "溪州鄉",
]


def download(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(request, timeout=45, context=context) as response:
        return response.read()


def number(value: str | None) -> int:
    return int((value or "0").replace(",", "").replace('"', "").strip() or 0)


def load_population(csv_text: str) -> dict[str, dict[str, int]]:
    rows = csv.DictReader(csv_text.splitlines())
    output = {town: {"population": 0, "age0_14": 0, "age15_44": 0, "age45_64": 0, "age65Plus": 0} for town in TOWNS}
    for row in rows:
        town = (row.get("區域別") or "").strip()
        if town not in output:
            continue
        values = {age: number(row.get(f"{age}歲(人數)")) for age in range(100)}
        values[100] = number(row.get("100歲以上(人數)"))
        output[town]["age0_14"] += sum(values[age] for age in range(0, 15))
        output[town]["age15_44"] += sum(values[age] for age in range(15, 45))
        output[town]["age45_64"] += sum(values[age] for age in range(45, 65))
        output[town]["age65Plus"] += sum(values[age] for age in range(65, 101))
    for data in output.values():
        data["population"] = data["age0_14"] + data["age15_44"] + data["age45_64"] + data["age65Plus"]
    return output


def load_income(csv_text: str) -> dict[str, dict[str, float]]:
    rows = csv.DictReader(csv_text.splitlines())
    output = {town: {"taxUnits": 0, "totalIncomeK": 0} for town in TOWNS}
    for row in rows:
        area = (row.get("\ufeff縣市別") or row.get("縣市別") or "").strip()
        if not area.startswith("彰化縣"):
            continue
        for town in TOWNS:
            if area == f"彰化縣{town}" or area.startswith(f"彰化縣{town}"):
                output[town]["taxUnits"] += number(row.get("納稅單位(戶)"))
                output[town]["totalIncomeK"] += number(row.get("綜合所得總額"))
                break
    for data in output.values():
        units = data["taxUnits"]
        data["avgIncomeK"] = round(data["totalIncomeK"] / units, 1) if units else 0
    return output


def main() -> None:
    LATEST_DIR.mkdir(parents=True, exist_ok=True)
    PERIOD_DIR.mkdir(parents=True, exist_ok=True)

    population_bytes = download(POPULATION_URL)
    income_bytes = download(INCOME_URL)
    population_text = population_bytes.decode("utf-8-sig")
    income_text = income_bytes.decode("utf-8-sig")

    population = load_population(population_text)
    income = load_income(income_text)
    towns = []
    for town in TOWNS:
        merged = {"name": town, **population[town], **income[town]}
        merged["youthShare"] = round(merged["age0_14"] / merged["population"], 4) if merged["population"] else 0
        merged["seniorShare"] = round(merged["age65Plus"] / merged["population"], 4) if merged["population"] else 0
        towns.append(merged)

    payload = {
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "population": {
            "source": "彰化縣現住人口之年齡結構",
            "sourceUrl": "https://data.gov.tw/dataset/27615",
            "downloadUrl": POPULATION_URL,
        },
        "income": {
            "source": "綜稅綜合所得總額全國各縣市鄉鎮村里統計分析表",
            "sourceUrl": "https://data.gov.tw/dataset/103066",
            "downloadUrl": INCOME_URL,
            "year": "111",
            "unit": "千元 / 納稅單位",
        },
        "towns": towns,
    }

    json_text = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    (LATEST_DIR / "changhua-social.json").write_text(json_text, encoding="utf-8")
    (PERIOD_DIR / "changhua-social.json").write_text(json_text, encoding="utf-8")
    (PERIOD_DIR / "changhua-population-age.csv").write_bytes(population_bytes)
    (PERIOD_DIR / "income-111.csv").write_bytes(income_bytes)
    print(f"Wrote {len(towns)} town social records")


if __name__ == "__main__":
    main()
