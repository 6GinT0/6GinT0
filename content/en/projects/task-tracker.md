---
title: "Task Tracker CLI"
description: "A command-line interface (CLI) application developed in Python for efficient task management. It allows creating, updating, and tracking activities directly from the terminal, using the file system for data persistence."
slug: "task-tracker"
short_description: "Efficient task manager run from the terminal."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-04"
highlight: false
---

# Task Tracker CLI

This project consists of a command-line tool (CLI) to monitor and manage personal tasks. It was implemented following the challenges from **roadmap.sh**, with the aim of deepening knowledge in data input/output handling, persistence in JSON files, and the creation of intuitive terminal interfaces.

## ✨ Main Features

- **Full Management**: Ability to add, update, and delete tasks with unique IDs.
- **Status Tracking**: Classification of tasks into three states: `todo` (pending), `in-progress`, and `done` (completed).
- **Smart Filtering**: Task listing with the possibility to filter by their current status.
- **Persistence**: Data is stored locally, ensuring information is maintained between sessions.

## ⚡ Installation

You can install Task Tracker directly from my GitHub repository:

```sh
pip install git+https://github.com/6GinT0/Task-Tracker.git
```

## 🚀 Basic Usage

The tool is simple to use through the `task-cli` command:

```bash
# Add a new task
$ task-cli add "Complete my portfolio"

# Update a task description
$ task-cli update 1 "Improve portfolio design"

# Change status
$ task-cli mark-in-progress 1
$ task-cli mark-done 1

# List tasks
$ task-cli list           # All tasks
$ task-cli list todo      # Only pending

# Delete a task
$ task-cli delete 1
```

## 📜 License

This project is licensed under the **MIT** License. You are free to use, modify, and distribute it.
