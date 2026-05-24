# Changhua Housing Age Project Overview

This project is a static web application designed to visualize housing age and household count data for Changhua County, Taiwan. It combines real-time data fetching from official sources with a responsive dashboard.

## Key Technologies
- **Frontend:** Vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Data Ingestion:** Python 3 (standard library only).
- **Automation:** GitHub Actions for periodic data updates and automated deployment to GitHub Pages.
- **Data Source:** Ministry of the Interior (MOI) SEGIS (Socio-Economic Geographic Information System) and Changhua County Government housing analysis reports.

## Project Structure
- `index.html`: The main entry point and structure of the dashboard.
- `styles.css`: Custom CSS for layout, interactive elements, and responsiveness.
- `script.js`: Core logic for:
    - Loading and parsing CSV data from the `data/` directory.
    - Handling hardcoded district-level data.
    - Dynamic rendering of charts (age bars) and data panels.
    - Search and filtering functionality for townships/cities.
- `data/`:
    - `latest/`: Contains the most recent housing data (`house-age-county.csv`) and its `manifest.json`.
    - `[Year]-[Season]/`: Archived data snapshots (e.g., `114-2S/`).
- `scripts/`:
    - `fetch-segis-csv.py`: Python script that downloads the latest housing ZIP from SEGIS, extracts the CSV, and updates the `data/` directory.
- `.github/workflows/`:
    - `update-data.yml`: Runs every 6 hours to fetch fresh data and commit it back to the repository.
    - `pages.yml`: Handles the deployment of the `main` branch to GitHub Pages.

## Development Workflow

### Data Update
To manually trigger a data update, run the following command from the project root:
```bash
python3 scripts/fetch-segis-csv.py
```
This will update the files in `data/latest/` and create a new timestamped folder under `data/[Year]/[Season]/`.

### Local Development
Since the project relies on fetching CSV files via `fetch()` in JavaScript, you must serve the directory via a local web server to avoid CORS issues and `file://` protocol restrictions.

Examples:
- **Python:** `python3 -m http.server 8000`
- **Node.js (serve):** `npx serve .`

### Testing
- There are no automated unit tests currently.
- Manual validation: Ensure the dashboard loads correctly and reflects the data present in `data/latest/house-age-county.csv`.
- Script validation: Run the Python script and verify that `data/latest/manifest.json` reflects the current time and correct data period.

## Data Schema & Logic
- **County Data:** Fetched from `data/latest/house-age-county.csv`. The `script.js` parses this file to extract rows where `COUNTY == "彰化縣"`.
- **Township Data:** Currently hardcoded in `script.js` as `districtData`. These values are derived from Changhua County Government analysis tables 2-4 and 2-5 and are adjusted to match official totals.
- **CSV Parsing:** A custom CSV parser is implemented in `script.js` (`parseCsv`) to handle quoted fields and different line endings without external dependencies.
