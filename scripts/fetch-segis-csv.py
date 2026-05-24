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
    zip_bytes = download()
    with zipfile.ZipFile(BytesIO(zip_bytes)) as archive:
        csv_names = [name for name in archive.namelist() if name.lower().endswith(".csv")]
        if not csv_names:
            raise RuntimeError("No CSV found in downloaded ZIP")
        
        # We'll use the first CSV to determine the year and season
        first_csv_text = archive.read(csv_names[0]).decode("utf-8-sig")
        rows = list(csv.reader(first_csv_text.splitlines()))
        year, season = normalized_period(rows)
        
        period_name = f"{year}-{season}"
        target_dir = ROOT / "data" / period_name
        target_dir.mkdir(parents=True, exist_ok=True)
        
        manifest_files = []
        
        for name in csv_names:
            csv_bytes = archive.read(name)
            filename = Path(name).name
            # Simplified filename for the repo
            if "縣市" in filename:
                repo_name = "house-age-county.csv"
            elif "鄉鎮市區" in filename:
                repo_name = "house-age-township.csv"
            else:
                repo_name = filename
            
            target_csv = target_dir / repo_name
            target_csv.write_text(csv_bytes.decode("utf-8-sig"), encoding="utf-8")
            
            # Update latest copy
            LATEST_DIR.mkdir(parents=True, exist_ok=True)
            latest_csv = LATEST_DIR / repo_name
            shutil.copyfile(target_csv, latest_csv)
            
            manifest_files.append(str(target_csv.relative_to(ROOT)))
            manifest_files.append(str(latest_csv.relative_to(ROOT)))
            print(f"Extracted {filename} -> {target_csv.relative_to(ROOT)}")

        manifest = {
            "sourcePage": "https://segis.moi.gov.tw/STATCloud/QueryInterfaceView?COL=CC2HBmJVqP%252fIpaJ3ipfNUw%253d%253d&MCOL=LumnmerulLcB%252bBLmWOEuNw%253d%253d",
            "downloadUrl": CSV_ZIP_URL,
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
            "period": f"{year}Y{season}",
            "year": year,
            "season": season,
            "files": manifest_files,
        }
        manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
        (target_dir / "manifest.json").write_text(manifest_text, encoding="utf-8")
        (LATEST_DIR / "manifest.json").write_text(manifest_text, encoding="utf-8")


if __name__ == "__main__":
    main()
