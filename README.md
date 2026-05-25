# Changhua Housing Age

Focused GitHub Pages site for Changhua County housing age and household-count data.

## What is included

- Changhua-only landing page.
- Exact county-level housing age buckets extracted from the MOI SEGIS CSV download.
- Same-origin CSV files refreshed by GitHub Actions to avoid browser CORS failures.
- Changhua township/city table and map based on Changhua County Government housing analysis tables 2-4 and 2-5.
- Search, metric coloring, and selected-area detail panel.
- Sankey township visibility filters with metric range sliders.
- Township-level population age structure and comprehensive-income-tax indicators refreshed into local JSON.
- GitHub Actions workflows for data refresh and automatic GitHub Pages deployment.

## Data note

County-level counts use SEGIS fields for housing-tax residential stock by age bucket and are stored in annual/period folders such as `data/114/2S/house-age-county.csv`, with a convenience copy at `data/latest/house-age-county.csv`. Township-level age counts are calculated from the official Changhua County Government published total housing stock and age-percentage table, then adjusted to each township total. Township average floor area uses the same report's table 2-5.

Population age structure is downloaded from the Changhua County Government dataset on data.gov.tw. Income indicators are aggregated from the Ministry of Finance comprehensive income tax township/village CSV; these are tax-filing statistics and should not be interpreted as disposable household income.
