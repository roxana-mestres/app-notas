/* EDITAR TEXTO */
document.addEventListener('DOMContentLoaded', () => {
  const tituloNota = document.getElementById('titulo-nota');
  const cuerpoNota = document.getElementById('cuerpo-nota');
  const editarEnlace = document.getElementById('enlace-editar');

  editarEnlace?.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    if (tituloNota?.contentEditable === 'true') {
      // Modo de guardado
      tituloNota.contentEditable = 'false';
      cuerpoNota.contentEditable = 'false';
      toggleEditIcon(event.target); // Pasar el enlace como argumento
    } else {
      // Modo de edición
      tituloNota.contentEditable = 'true';
      cuerpoNota.contentEditable = 'true';
      toggleEditIcon(event.target); // Pasar el enlace como argumento
    }
  });
});

/* BOTÓN BORRAR VENTANA */

/* ELIMINAR NOTA */
const botonBorrarNota = document.getElementById('borrar-nota');

botonBorrarNota.addEventListener('click', () => {
  confirmarEliminar();
});

function confirmarEliminar() {
  const popup = crearPopup();
  const mensaje = document.createElement('p');
  mensaje.textContent = '¿Seguro que quieres borrar esta nota?';
  popup.appendChild(mensaje);

  const botonConfirmar = document.createElement('button');
  botonConfirmar.textContent = 'Sí';
  popup.appendChild(botonConfirmar);

  const botonCancelar = document.createElement('button');
  botonCancelar.textContent = 'Cancelar';
  popup.appendChild(botonCancelar);

  botonConfirmar.addEventListener('click', () => {
    // Agrega aquí la lógica para borrar la nota
    document.body.removeChild(popup);
  });

  botonCancelar.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
}

function crearPopup() {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  document.body.appendChild(popup);
  return popup;
}

/* FECHA */
const fechaActual = new Date();

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre"
];

const diaSemana = diasSemana[fechaActual.getDay()];
const dia = fechaActual.getDate();
const mes = meses[fechaActual.getMonth()];
const anio = fechaActual.getFullYear();

const fechaFormateada = `${diaSemana} ${dia} de ${mes} de ${anio}`;

document.getElementById("fecha").textContent = fechaFormateada;

/* CAMBIAR TAMAÑO LETRA */

const tamanosIcons = document.querySelectorAll('.tamano span');
const textoParagraph = document.querySelector('.texto p');

tamanosIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    let fontSize;
    if (index === 0) {
      fontSize = '18px';
    } else if (index === 1) {
      fontSize = '22px';
    } else if (index === 2) {
      fontSize = '26px';
    }
    textoParagraph.style.fontSize = fontSize;
  });
});

/* CAMBIAR RESALTADO DE LA NOTA */

const circulosColores = document.querySelectorAll('.circulo');
const divResaltado = document.querySelector('.resaltado');

circulosColores.forEach(circulo => {
  circulo.addEventListener('click', () => {
    const color = window.getComputedStyle(circulo).backgroundColor;
    divResaltado.style.backgroundColor = `rgba(${getColorValues(color)}, 0.7)`;
  });
});

function getColorValues(color) {
  const matches = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (matches && matches.length === 4) {
    return [matches[1], matches[2], matches[3]];
  }
  return [];
}
