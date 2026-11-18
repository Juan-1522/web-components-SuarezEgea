# Investigación: Web Components, HTML Templates y frameworks

Autor: Juan Andrés Suarez Egea — trabajo individual.
Todas las fuentes se consultaron el **17 de noviembre de 2026**.

## Parte 1 — Web Components

### 1. ¿Qué problema resuelven y qué aporta cada tecnología?

Normalmente, para repetir un pedazo de interfaz (una tarjeta, un botón con sus estilos) toca copiar el HTML y el CSS en cada página, y cualquier estilo global puede dañarlo. Los Web Components resuelven eso empaquetando ese pedazo como una etiqueta propia que funciona en cualquier página sin librerías. **Custom Elements** es la API de JavaScript para definir esa etiqueta y su comportamiento; **Shadow DOM** encierra su estructura y sus estilos en una "burbuja" para que no se mezclen con los de la página; **HTML Templates** aporta el molde de markup que no se renderiza hasta que se clona.

### 2. ¿En qué se diferencia un `<template>` de un `<div>` con `display: none`?

Un `<div>` oculto con `display: none` sigue siendo parte del DOM: no se pinta, pero sus scripts sí se ejecutan, sus imágenes sí se cargan y `document.querySelector` sí lo encuentra. El contenido de un `<template>` es inerte: no se muestra, sus scripts no se ejecutan, sus imágenes no se descargan y `document.querySelector` no lo encuentra, porque vive en un fragmento aparte (`template.content`). Por eso es ideal como molde: no cuesta nada hasta que se clona con `cloneNode(true)`.

### 3. ¿Qué cambia entre Shadow DOM "open" y "closed"?

Con `mode: "open"`, cualquier script de la página puede entrar al árbol interno leyendo `elemento.shadowRoot` y hasta modificarlo. Con `mode: "closed"`, `shadowRoot` devuelve `null` desde afuera y solo el código que lo creó conserva la referencia (normalmente guardada dentro de la clase). El encapsulamiento visual es igual en los dos modos: "closed" solo dificulta el acceso externo, no es una medida de seguridad real.

### 4. ¿Qué es un `<slot>` y para qué sirve?

Un `<slot>` es un hueco que se deja dentro del Shadow DOM y que se llena con el contenido que el usuario escribe entre las etiquetas del componente. En mi `<ficha-mascota>`, la nota libre de cada paciente entra por el slot: el componente pone la estructura y el estilo, y quien lo usa aporta su propio texto sin tocar el interior. También existen slots con nombre (`name="..."`) para proyectar contenidos distintos en lugares distintos de la plantilla.

### 5. ¿Qué navegadores los soportan hoy?

Todos los navegadores modernos: Chrome 67+, Edge 79+, Firefox 63+, Opera 64+ y Safari 10.1+ (Safari soporta los elementos personalizados autónomos, pero no los "customized built-in" que extienden etiquetas existentes). Según Can I use, el soporte llega al **97.37 % del uso global** (81.23 % completo + 16.14 % parcial), con estadísticas de octubre de 2026. Internet Explorer nunca los soportó. Fuentes: caniuse.com/custom-elementsv1 y MDN Web Docs, consultadas el 17 de noviembre de 2026.
