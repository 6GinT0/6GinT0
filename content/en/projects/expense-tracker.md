---
title: "Expense Tracker"
description: "A robust application for personal finance management from the command line. It allows detailed expense control, automatic categorization, monthly summaries, and data export for external analysis."
slug: "expense-tracker"
short_description: "Personal finance manager with reports and CSV export."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-06"
highlight: false
---

# Expense Tracker

This project was born out of the need to simplify daily expense tracking. It is a powerful CLI tool designed in Python that uses the file system to maintain a historical record of all the user's financial transactions.

## ✨ Main Features

- **Total Expense Control**: Detailed recording of transactions including description, amount, and category.
- **Summaries and Reports**: Automatic generation of total expense summaries or filtered by specific month and year.
- **Advanced Filtering**: Ability to search for transactions by custom categories.
- **Data Export**: Integrated function to export all records to CSV format, facilitating their use in spreadsheets.
- **Monthly Budget**: Alert and tracking system to avoid exceeding set spending limits.

## ⚡ Installation

You can install the expense management tool directly from GitHub:

```sh
pip install git+https://github.com/6GinT0/Expense-Tracker.git
```

## 🚀 Basic Usage

The application uses intuitive arguments to manage your finances:

```bash
# Add an expense
$ expense-tracker add --description "Netflix Subscription" --amount 15.99 --category "Entertainment"

# View general summary
$ expense-tracker summary

# View summary for a specific month
$ expense-tracker summary --month 2 --year 2026

# Export data
$ expense-tracker export --filename my_expenses.csv

# List all expenses
$ expense-tracker list
```

## 📜 License

This project is licensed under the **MIT** License. You are free to use, modify, and distribute it.
