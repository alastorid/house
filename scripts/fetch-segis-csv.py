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
        
        manifest_files = {}
        
        for name in archive.namelist():
            if not name.lower().endswith(".csv"):
                continue
                
            content = archive.read(name)
            original_filename = Path(name).name
            
            # Save original in period dir
            target_path = target_dir / original_filename
            target_path.write_bytes(content)
            
            # Copy to latest dir
            LATEST_DIR.mkdir(parents=True, exist_ok=True)
            latest_path = LATEST_DIR / original_filename
            latest_path.write_bytes(content)
            
            # Identify file type for manifest
            if "縣市" in original_filename:
                manifest_files["county"] = original_filename
            elif "鄉鎮市區" in original_filename:
                manifest_files["township"] = original_filename
            
            print(f"Extracted {original_filename} -> {target_path.relative_to(ROOT)}")

        manifest = {
            "sourcePage": "https://segis.moi.gov.tw/STATCloud/QueryInterfaceView?COL=CC2HBmJVqP%252fIpaJ3ipfNUw%253d%253d&MCOL=LumnmerulLcB%252bBLmWOEuNw%253d%253d",
            "downloadUrl": CSV_ZIP_URL,
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
            "period": f"{year}Y{season}",
            "year": year,
            "season": season,
            "dataFiles": manifest_files,
        }
        manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
        (target_dir / "manifest.json").write_text(manifest_text, encoding="utf-8")
        (LATEST_DIR / "manifest.json").write_text(manifest_text, encoding="utf-8")


if __name__ == "__main__":
    main()
