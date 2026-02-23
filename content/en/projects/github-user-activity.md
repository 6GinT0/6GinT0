---
title: "GitHub User Activity"
description: "CLI tool designed to connect with the GitHub API and visualize the recent activity of any user in real-time. Ideal for performing quick audits of contributions directly from the terminal."
slug: "github-user-activity"
short_description: "GitHub user activity visualizer in the terminal."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-09"
highlight: false
---

# GitHub User Activity

My implementation of GitHub User Activity allows you to elegantly fetch and display the most recent events from a GitHub profile. The project focuses on efficiency, making asynchronous requests to the official API and formatting the output to be readable and useful.

## ✨ Main Features

- **Real-Time Requests**: Direct connection with the public GitHub API for up-to-date data.
- **Output Formatting**: Clear visualization of events such as commits, open issues, pull requests, and push events.
- **Error Handling**: Robust system for managing API limits, non-existent users, or network failures.
- **No Heavy Dependencies**: A lightweight and fast tool designed to be run instantly.

## ⚡ Installation

Install the GitHub activity visualizer with the following command:

```sh
pip install git+https://github.com/6GinT0/Github-User-Activity.git
```

## 🚀 Usage

It's as simple as passing the GitHub username as an argument:

```bash
$ github-activity linustorvalds
```

## 📜 License

This project is licensed under the **MIT** License. You are free to use, modify, and distribute it.
