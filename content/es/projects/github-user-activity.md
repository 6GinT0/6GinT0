---
title: "GitHub User Activity"
description: "Herramienta CLI diseñada para conectarse con la API de GitHub y visualizar en tiempo real la actividad reciente de cualquier usuario. Ideal para realizar auditorías rápidas de contribuciones directamente desde la terminal."
slug: "github-user-activity"
short_description: "Visualizador de actividad de usuarios de GitHub en la terminal."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-09"
highlight: false
---

# GitHub User Activity

Mi implementación de GitHub User Activity permite obtener y mostrar de forma elegante los eventos más recientes de un perfil de GitHub. El proyecto se centra en la eficiencia, realizando peticiones asíncronas a la API oficial y formateando la salida para que sea legible y útil.

## ✨ Características principales

- **Peticiones en Tiempo Real**: Conexión directa con la API pública de GitHub para obtener datos actualizados.
- **Formateado de Salida**: Visualización clara de eventos como commits, issues abiertos, pull requests y push events.
- **Manejo de Errores**: Sistema robusto para gestionar límites de API, usuarios inexistentes o fallos de red.
- **Sin Dependencias Pesadas**: Una herramienta ligera y rápida diseñada para ser ejecutada instantáneamente.

## ⚡ Instalación

Instala el visualizador de actividad de GitHub mediante el siguiente comando:

```sh
pip install git+https://github.com/6GinT0/Github-User-Activity.git
```

## 🚀 Uso

Es tan sencillo como pasar el nombre de usuario de GitHub como argumento:

```bash
$ github-activity linustorvalds
```

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo.
