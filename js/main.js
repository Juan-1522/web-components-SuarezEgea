// Actividad evaluativa: Web Components, HTML Templates y frameworks
// Componente <ficha-mascota> para la Veterinaria Huellitas. Sin librerías.

// R2 — Componente: clase que extiende HTMLElement, con nombre con guion,
// registrada con customElements.define() y que clona el template en su Shadow DOM.
class FichaMascota extends HTMLElement {

  // R3 — Atributos: el componente observa estos atributos y se repinta si cambian.
  static get observedAttributes() {
    return ['nombre', 'especie', 'edad', 'vacuna'];
  }

  constructor() {
    super();
    // R1 — Template propio: se clona el <template id="template-ficha"> del index.html
    // (con su <style> y sus marcadores vacíos) dentro de un Shadow DOM abierto.
    const plantilla = document.getElementById('template-ficha');
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.appendChild(plantilla.content.cloneNode(true));
  }

  connectedCallback() {
    this.pintar();

    // R4 — Slot: si no llega nota libre, el recuadro de la nota se oculta.
    const slot = this.shadowRoot.querySelector('slot');
    const nota = this.shadowRoot.querySelector('.nota');
    const revisarNota = () => { nota.hidden = slot.assignedNodes().length === 0; };
    slot.addEventListener('slotchange', revisarNota);
    revisarNota();
  }

  // R3 — Atributos: cada cambio en un atributo observado vuelve a pintar la ficha.
  attributeChangedCallback() {
    this.pintar();
  }

  pintar() {
    const raiz = this.shadowRoot;
    const nombre = this.getAttribute('nombre') || 'Sin nombre';
    const especie = (this.getAttribute('especie') || 'otro').toLowerCase();
    const edad = this.getAttribute('edad');
    const vacuna = this.getAttribute('vacuna');

    // R3 — los datos de los atributos se muestran en los marcadores del template.
    raiz.querySelector('.nombre').textContent = nombre;
    raiz.querySelector('.especie').textContent = especie.charAt(0).toUpperCase() + especie.slice(1);
    raiz.querySelector('.tarjeta').dataset.especie = especie;
    raiz.querySelector('.edad').textContent = edad === null || edad === ''
      ? 'Sin dato'
      : (edad === '1' ? '1 año' : `${edad} años`);

    const estado = raiz.querySelector('.estado');
    const diasTexto = raiz.querySelector('.dias');
    const vacunaTexto = raiz.querySelector('.vacuna');

    if (!vacuna) {
      vacunaTexto.textContent = 'Sin programar';
      estado.textContent = 'Pendiente';
      estado.className = 'estado pendiente';
      diasTexto.textContent = 'Agenda su primera vacuna';
      return;
    }

    const fecha = new Date(`${vacuna}T00:00:00`);
    if (Number.isNaN(fecha.getTime())) {
      vacunaTexto.textContent = 'Fecha inválida';
      estado.textContent = 'Pendiente';
      estado.className = 'estado pendiente';
      diasTexto.textContent = 'Revisa el formato AAAA-MM-DD';
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const dias = Math.round((fecha - hoy) / 86400000);
    vacunaTexto.textContent = fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

    if (dias < 0) {
      estado.textContent = 'Vencida';
      estado.className = 'estado vencida';
      diasTexto.textContent = dias === -1 ? 'Venció ayer' : `Venció hace ${-dias} días`;
    } else if (dias <= 30) {
      estado.textContent = 'Próxima';
      estado.className = 'estado proxima';
      diasTexto.textContent = dias === 0 ? 'La vacuna toca hoy' : `Faltan ${dias} días`;
    } else {
      estado.textContent = 'Al día';
      estado.className = 'estado al-dia';
      diasTexto.textContent = `Faltan ${dias} días`;
    }
  }
}

// R2 — registro del elemento personalizado (nombre con guion obligatorio).
customElements.define('ficha-mascota', FichaMascota);

// ----- Lógica de la página: contador y formulario -----

const contenedor = document.getElementById('fichas');
const formulario = document.getElementById('form-registro');
const contador = document.getElementById('contador');
const aviso = document.getElementById('aviso');
let temporizadorAviso = null;

function actualizarContador() {
  const total = contenedor.querySelectorAll('ficha-mascota').length;
  contador.textContent = total === 1 ? '1 paciente' : `${total} pacientes`;
}

function mostrarAviso(mensaje) {
  aviso.textContent = mensaje;
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 4000);
}

// R5 — Reutilización: el formulario crea nuevas instancias del mismo componente.
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const datos = new FormData(formulario);
  const nombre = datos.get('nombre').trim();

  const ficha = document.createElement('ficha-mascota');
  ficha.setAttribute('nombre', nombre);
  ficha.setAttribute('especie', datos.get('especie'));
  ficha.setAttribute('edad', datos.get('edad'));
  ficha.setAttribute('vacuna', datos.get('vacuna'));

  const nota = datos.get('nota').trim();
  if (nota) {
    ficha.textContent = nota; // R4 — este texto se proyecta en el <slot>.
  }

  contenedor.appendChild(ficha);
  formulario.reset();
  actualizarContador();
  mostrarAviso(`Listo, quedó la ficha de ${nombre}.`);
  ficha.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

actualizarContador();