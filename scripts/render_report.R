#!/usr/bin/env Rscript
if (!require("rmarkdown")) install.packages("rmarkdown", repos="http://cran.rstudio.com/")
if (!require("readr")) install.packages("readr", repos="http://cran.rstudio.com/")
if (!require("dplyr")) install.packages("dplyr", repos="http://cran.rstudio.com/")
if (!require("ggplot2")) install.packages("ggplot2", repos="http://cran.rstudio.com/")
if (!require("plotly")) install.packages("plotly", repos="http://cran.rstudio.com/")
if (!require("jsonlite")) install.packages("jsonlite", repos="http://cran.rstudio.com/")
if (!require("tidyr")) install.packages("tidyr", repos="http://cran.rstudio.com/")

rmarkdown::render("report.Rmd", output_file = "report.html")
