# House Data Taiwan

GitHub Pages site for visualizing Taiwan housing information, with a Changhua district map and public-data source links.

## What is included

- Static HTML/CSS/JS dashboard.
- Live in-browser fetch from the MOI real-price registration CSV ZIP.
- Taiwan county map with selectable point-of-interest metrics.
- Changhua district search, sorting, table, and clickable SVG map.
- Public-source references for MOI housing statistics and data.gov.tw housing usage data.
- GitHub Actions workflow for automatic GitHub Pages deployment.

## Local preview

Open `index.html` directly in a browser, or run any static server from this folder.

## Data note

The live Taiwan map downloads the current MOI real-price registration CSV ZIP in the browser and computes selected county metrics client-side. The Changhua district panel keeps a display-ready local dataset for quick comparison and should be replaced with a verified processed export when exact official district-level housing-stock figures are required.
