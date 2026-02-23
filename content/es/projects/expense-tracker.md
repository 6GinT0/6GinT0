---
title: "Expense Tracker"
description: "Una aplicación robusta para la gestión de finanzas personales desde la línea de comandos. Permite el control detallado de gastos, categorización automática, resúmenes mensuales y exportación de datos para análisis externo."
slug: "expense-tracker"
short_description: "Gestor de finanzas personales con reportes y exportación CSV."
type: "CLI"
technologies: ["Python"]
under_construction: false
date: "2026-02-06"
highlight: false
---

# Expense Tracker

Este proyecto nace con la necesidad de simplificar el seguimiento de los gastos diarios. Es una herramienta CLI potente diseñada en Python que utiliza el sistema de archivos para mantener un registro histórico de todas las transacciones financieras del usuario.

## ✨ Características principales

- **Control Total de Gastos**: Registro detallado de transacciones incluyendo descripción, monto y categoría.
- **Resúmenes y Reportes**: Generación automática de resúmenes de gastos totales o filtrados por mes y año específico.
- **Filtrado Avanzado**: Capacidad de buscar transacciones por categorías personalizadas.
- **Exportación de Datos**: Función integrada para exportar todos los registros a formato CSV, facilitando su uso en hojas de cálculo.
- **Presupuesto Mensual**: Sistema de alertas y seguimiento para no exceder los límites de gasto establecidos.

## ⚡ Instalación

Puedes instalar la herramienta de gestión de gastos directamente desde GitHub:

```sh
pip install git+https://github.com/6GinT0/Expense-Tracker.git
```

## 🚀 Uso básico

La aplicación utiliza argumentos intuitivos para gestionar tus finanzas:

```bash
# Añadir un gasto
$ expense-tracker add --description "Suscripción Netflix" --amount 15.99 --category "Entretenimiento"

# Ver un resumen general
$ expense-tracker summary

# Ver resumen de un mes específico
$ expense-tracker summary --month 2 --year 2026

# Exportar datos
$ expense-tracker export --filename mis_gastos.csv

# Listar todos los gastos
$ expense-tracker list
```

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo.
