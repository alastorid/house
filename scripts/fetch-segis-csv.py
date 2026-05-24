#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import re
import shutil
import ssl
import urllib.request
import zipfile
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

CSV_ZIP_URL = (
    "https://segis.moi.gov.tw/STATCloud/reqcontroller.file?"
    "method=filedown.downloadproductfile&"
    "code=LumnmerulLcB%2bBLmWOEuNw%3d%3d&"
    "STTIME=114Y2S&STUNIT=U01CO&BOUNDARY=%E5%85%A8%E5%9C%8B"
)
ROOT = Path(__file__).resolve().parents[1]
LATEST_DIR = ROOT / "data" / "latest"


def download() -> bytes:
    request = urllib.request.Request(CSV_ZIP_URL, headers={"User-Agent": "Mozilla/5.0"})
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(request, timeout=30, context=context) as response:
        return response.read()


def extract_csv(zip_bytes: bytes) -> tuple[str, bytes]:
    with zipfile.ZipFile(BytesIO(zip_bytes)) as archive:
        csv_names = [name for name in archive.namelist() if name.lower().endswith(".csv")]
        if not csv_names:
            raise RuntimeError("No CSV found in downloaded ZIP")
        name = csv_names[0]
        return Path(name).name, archive.read(name)


def normalized_period(rows: list[list[str]]) -> tuple[str, str]:
    header = rows[0]
    info_index = header.index("INFO_TIME")
    period = rows[2][info_index].strip().strip('"')
    match = re.fullmatch(r"(\d+)Y(\d+)S", period)
    if not match:
        raise RuntimeError(f"Unexpected INFO_TIME: {period}")
    year, season = match.groups()
    return year, f"{season}S"


def main() -> None:
    csv_name, csv_bytes = extract_csv(download())
    text = csv_bytes.decode("utf-8-sig")
    rows = list(csv.reader(text.splitlines()))
    year, season = normalized_period(rows)

    target_dir = ROOT / "data" / year / season
    target_dir.mkdir(parents=True, exist_ok=True)
    target_csv = target_dir / "house-age-county.csv"
    target_csv.write_text(text, encoding="utf-8")

    LATEST_DIR.mkdir(parents=True, exist_ok=True)
    latest_csv = LATEST_DIR / "house-age-county.csv"
    shutil.copyfile(target_csv, latest_csv)

    manifest = {
        "sourcePage": "https://segis.moi.gov.tw/STATCloud/QueryInterfaceView?COL=CC2HBmJVqP%252fIpaJ3ipfNUw%253d%253d&MCOL=LumnmerulLcB%252bBLmWOEuNw%253d%253d",
        "downloadUrl": CSV_ZIP_URL,
        "originalCsvName": csv_name,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "period": f"{year}Y{season}",
        "year": year,
        "season": season,
        "files": [
            str(target_csv.relative_to(ROOT)),
            str(latest_csv.relative_to(ROOT)),
        ],
    }
    manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    (target_dir / "manifest.json").write_text(manifest_text, encoding="utf-8")
    (LATEST_DIR / "manifest.json").write_text(manifest_text, encoding="utf-8")
    print(f"Extracted {csv_name} -> {target_csv.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
