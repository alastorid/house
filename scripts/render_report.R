#!/usr/bin/env Rscript
options(repos = c(RSPM = "https://packagemanager.posit.co/cran/__linux__/noble/latest"))

packages <- c("rmarkdown", "readr", "dplyr", "ggplot2", "plotly", "jsonlite", "networkD3", "tidyr")
missing <- packages[!vapply(packages, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing) > 0) {
  install.packages(missing)
}

rmarkdown::render("report.Rmd", output_file = "report.html")
