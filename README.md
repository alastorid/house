# House Data Taiwan

GitHub Pages site for visualizing Taiwan housing information, with a Changhua district map and public-data source links.

## What is included

- Static HTML/CSS/JS dashboard.
- Changhua district search, sorting, table, and clickable SVG map.
- Public-source references for MOI housing statistics and data.gov.tw housing usage data.
- GitHub Actions workflow for automatic GitHub Pages deployment.

## Local preview

Open `index.html` directly in a browser, or run any static server from this folder.

## Data note

The page is designed to attempt live public-source checks in the browser, but government sites may block cross-origin fetches from GitHub Pages. The shipped dataset is an internal, display-ready dataset for the frontend and should be replaced with a verified processed export when exact official district-level figures are required.
