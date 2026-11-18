# Web Components — Ficha de mascota (Veterinaria Huellitas)

Actividad evaluativa: **Web Components, HTML Templates y frameworks** — Noviembre de 2026.

## Autor

- Juan Andrés Suarez Egea — GitHub: [Juan-1522](https://github.com/Juan-1522)

> Trabajo individual. El repositorio se llama `web-components-SuarezEgea` con mis dos apellidos y todos los commits son míos.

## Caso elegido

**Ficha de mascota para una veterinaria.** Cada ficha muestra nombre, especie, edad y próxima vacuna, más una nota libre. El estado de la vacuna (Al día / Próxima / Vencida) se calcula solo comparando la fecha con el día actual.

## Cómo probar el componente

1. Clona o descarga el repositorio. No necesita npm, servidor ni librerías.
2. Abre `index.html` con doble clic en cualquier navegador moderno (Chrome, Edge, Firefox o Safari).
3. Verás **3 fichas** con datos distintos, creadas con el mismo componente `<ficha-mascota>`.
4. Prueba el formulario **"Registrar nueva mascota"**: crea una ficha nueva al instante con los atributos que escribas; la nota opcional se proyecta por el `<slot>`.
5. Prueba el botón **Eliminar** de cualquier ficha: la tarjeta desaparece y el contador de pacientes se actualiza.
6. Abre la consola con F12: no debe aparecer ningún error.

## Archivos

| Archivo | Contenido |
|---|---|
| `README.md` | Este archivo: autor, caso, cómo probar y declaración de IA |
| `INVESTIGACION.md` | Partes 1 y 2 de la investigación, tabla comparativa y fuentes con fecha |
| `index.html` | El `<template>` propio y las 3 instancias del componente |
| `js/main.js` | La clase del componente, comentada requisito por requisito |

## Dónde está cada requisito

- **R1 — Template propio:** `<template id="template-ficha">` al final de `index.html`, con su `<style>` y marcadores vacíos (`.nombre`, `.especie`, `.edad`, `.vacuna`, `.estado`, `.dias`) que se rellenan desde JavaScript.
- **R2 — Componente:** clase `FichaMascota extends HTMLElement` en `js/main.js`, registrada con `customElements.define('ficha-mascota', ...)`, que clona el template dentro de su Shadow DOM (`mode: 'open'`).
- **R3 — Atributos:** recibe `nombre`, `especie`, `edad` y `vacuna` (4 atributos) y los muestra en el template; `observedAttributes` + `attributeChangedCallback` repintan la ficha si un atributo cambia.
- **R4 — Slot:** `<slot>` dentro del recuadro de nota; el texto escrito entre `<ficha-mascota>...</ficha-mascota>` se proyecta ahí. Si no hay nota, el recuadro se oculta.
- **R5 — Reutilización:** 3 instancias con datos distintos en `index.html`, y el formulario crea instancias nuevas en vivo.

## Declaración de uso de IA

Usé IA (el asistente Qoder) como apoyo para construir y depurar el código del componente y como borrador de las respuestas de investigación. El código se probó en el navegador (renderizado, formulario, eliminación y consola sin errores) y las respuestas se revisaron y se ajustaron con mis palabras antes de entregar.