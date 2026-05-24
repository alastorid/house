# Changhua Housing Age

Focused GitHub Pages site for Changhua County housing age and household-count data.

## What is included

- Changhua-only landing page.
- Exact county-level housing age buckets from the MOI SEGIS open service snapshot.
- Same-origin JSON data file refreshed by GitHub Actions to avoid browser CORS failures.
- Changhua township/city table and map based on Changhua County Government housing analysis tables 2-4 and 2-5.
- Search, metric coloring, and selected-area detail panel.
- GitHub Actions workflows for data refresh and automatic GitHub Pages deployment.

## Data note

County-level counts use SEGIS fields for housing-tax residential stock by age bucket and are stored at `data/changhua-county-age.json`. Township-level age counts are calculated from the official Changhua County Government published total housing stock and age-percentage table, then adjusted to each township total. Township average floor area uses the same report's table 2-5.
