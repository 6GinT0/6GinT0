---
title: "Task Tracker CLI"
description: "Una aplicación de línea de comandos (CLI) desarrollada en Python para la gestión eficiente de tareas. Permite crear, actualizar y realizar el seguimiento de actividades directamente desde la terminal, utilizando el sistema de archivos para la persistencia de datos."
slug: "task-tracker"
short_description: "Gestor de tareas eficiente ejecutado desde la terminal."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-04"
highlight: false
---

# Task Tracker CLI

Este proyecto consiste en una herramienta de línea de comandos (CLI) para monitorear y gestionar tareas personales. Fue implementado siguiendo los retos de **roadmap.sh**, con el objetivo de profundizar en el manejo de entrada/salida de datos, persistencia en archivos JSON y la creación de interfaces de terminal intuitivas.

## ✨ Características principaless

- **Gestión Completa**: Capacidad para añadir, actualizar y eliminar tareas con identificadores únicos.
- **Seguimiento de Estado**: Clasificación de tareas en tres estados: `todo` (pendiente), `in-progress` (en progreso) y `done` (completada).
- **Filtrado Inteligente**: Listado de tareas con la posibilidad de filtrar por su estado actual.
- **Persistencia**: Los datos se almacenan de forma local, asegurando que la información se mantenga entre sesiones.

## ⚡ Instalación

Puedes instalar Task Tracker directamente desde mi repositorio de GitHub:

```sh
pip install git+https://github.com/6GinT0/Task-Tracker.git
```

## 🚀 Uso básico

La herramienta es sencilla de usar a través del comando `task-cli`:

```bash
# Añadir una nueva tarea
$ task-cli add "Completar mi portafolio"

# Actualizar la descripción de una tarea
$ task-cli update 1 "Mejorar el diseño del portafolio"

# Cambiar el estado
$ task-cli mark-in-progress 1
$ task-cli mark-done 1

# Listar tareas
$ task-cli list           # Todas las tareas
$ task-cli list todo      # Solo pendientes

# Eliminar una tarea
$ task-cli delete 1
```

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo.
