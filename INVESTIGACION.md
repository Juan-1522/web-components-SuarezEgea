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

## Parte 2 — Frameworks, librerías y Node.js

### 1. Estándar, librería, framework y entorno de ejecución, con un ejemplo

Pensemos en una tienda en línea. El **estándar del navegador** es una etiqueta como `<button>`: funciona en cualquier navegador sin instalar nada. Una **librería** como React es un conjunto de funciones que uno llama desde su propio código para construir la interfaz, pero uno decide la estructura y el flujo. Un **framework** como Angular funciona al revés: él impone la estructura y llama nuestro código en los momentos que él define. Y **Node.js** no es ninguna de las tres: es el **entorno de ejecución** que permite correr JavaScript fuera del navegador, por ejemplo en el servidor de la tienda.

### 2. Tabla comparativa

| Criterio | Web Components nativos | React | Vue | Angular |
|---|---|---|---|---|
| Tipo | Estándar del navegador | Librería | Framework (se define como "progresivo") | Framework |
| Cómo se crea un componente | Clase que extiende `HTMLElement`, registrada con `customElements.define()` | Función de JavaScript que devuelve JSX | Archivo `.vue` (SFC) con `<template>`, `<script>` y `<style>` | Clase con el decorador `@Component` y su template |
| Necesita instalar herramientas (npm) | No: funciona con un `<script>` normal | Sí, para instalar React y compilar el JSX | Sí en proyectos con archivos `.vue` (también puede usarse sin build) | Sí, se trabaja con su CLI y npm |
| Ventajas principales | Sin dependencias, sirve en cualquier proyecto o framework, estilos encapsulados de verdad | Ecosistema y comunidad enormes, muy flexible, mucha oferta laboral | Curva de aprendizaje suave, documentación clara, reactividad automática | Todo incluido (rutas, formularios, inyección de dependencias), TypeScript, pensado para equipos grandes |
| Desventajas principales | Más código manual: no trae reactividad ni herramientas de construcción | Hay que elegir y configurar aparte muchas piezas (rutas, estado, build) | Ecosistema más pequeño que el de React | Pesado y con curva de aprendizaje alta para proyectos pequeños |

### 3. ¿Qué es Node.js y qué relación tiene npm con React, Vue y Angular?

Node.js es un **entorno de ejecución** de JavaScript construido sobre el motor V8 (el mismo de Chrome) que permite correr JS fuera del navegador: servidores, APIs y herramientas de línea de comandos. No es un framework. npm es el gestor de paquetes que viene con Node y con él se instalan React, Vue y Angular, además de las herramientas que los compilan. Si una tienda en línea usa React y Node.js: **React** construye la interfaz que el cliente ve y toca en su navegador (catálogo, carrito, botones), y **Node.js** corre en el servidor atendiendo lo que esa interfaz pide (consultar productos, guardar pedidos, procesar pagos).

### 4. ¿Qué herramienta usarías en cada caso?

**a. Un botón de chat que varias empresas pegan en sus propias páginas:** Web Components nativos. El botón tiene que funcionar en páginas que no controlamos, hechas con tecnologías distintas; al ser un estándar del navegador funciona en todas con un solo script, y el Shadow DOM evita que los estilos de la página anfitriona lo dañen (y que los suyos dañen la página). Con React o Angular obligaríamos a cada empresa a instalar dependencias y montar un proceso de compilación solo para un botón.

**b. Una aplicación web grande para un banco, con muchos equipos de desarrollo:** Angular. Con muchos equipos hace falta que todos trabajen igual, y Angular impone una estructura única con TypeScript, rutas, formularios, inyección de dependencias y pruebas ya integradas. Su forma opinionada de trabajar y su calendario de soporte predecible reducen la improvisación en un proyecto donde la seguridad y el mantenimiento a largo plazo importan más que la rapidez para empezar.

## Fuentes

1. MDN Web Docs — *Web Components*. https://developer.mozilla.org/en-US/docs/Web/API/Web_components — consultada el 17 de noviembre de 2026.
2. Can I use — *Custom Elements (V1)*, tabla de soporte y estadísticas de uso de octubre de 2026. https://caniuse.com/custom-elementsv1 — consultada el 17 de noviembre de 2026.
3. React — *Quick Start (Learn React)*. https://react.dev/learn — consultada el 17 de noviembre de 2026.
4. Vue.js — *Introduction (Vue 3 Guide)*. https://vuejs.org/guide/introduction.html — consultada el 17 de noviembre de 2026.
5. Angular — *What is Angular? (Overview)*. https://angular.dev/overview — consultada el 17 de noviembre de 2026.
6. Node.js — *About Node.js*. https://nodejs.org/en/about — consultada el 17 de noviembre de 2026.