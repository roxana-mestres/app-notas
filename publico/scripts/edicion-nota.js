// BORRAR

function borrarNota() {
  if (confirm("¿Estás seguro de que deseas borrar la nota?")) {
    document.getElementById("borrar-nota-form").submit();
  }
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

const tamanosIconos = document.querySelectorAll(".tamano span");
const textoArea = document.getElementById("cuerpo-nota");

tamanosIconos.forEach((icono, index) => {
  icono.addEventListener('click', () => {
    let fontSize;
    if (index === 0) {
      fontSize = '18px';
    } else if (index === 1) {
      fontSize = '22px';
    } else if (index === 2) {
      fontSize = '26px';
    }
    textoArea.style.fontSize = fontSize;
  });
});

/* CAMBIAR RESALTADO DE LA NOTA */

const circulosColores = document.querySelectorAll('.circulo');
const divResaltado = document.querySelector('.resaltado');
const inputColor = document.getElementById('input-color');

circulosColores.forEach(circulo => {
  circulo.addEventListener('click', () => {
    const color = window.getComputedStyle(circulo).backgroundColor;
    divResaltado.style.backgroundColor = color;
    inputColor.value = color; // Actualizar el valor del input oculto con el color seleccionado
  });
});

// Círculos

function desplegarCirculos() {
  const circulos = document.querySelectorAll(".circulo");
  let i = 0;

  const intervalo = setInterval(() => {
    circulos[i].classList.remove("oculto");
    i++;
    if (i >= circulos.length) {
      clearInterval(intervalo);
    }
  }, 100);
}

window.addEventListener("load", desplegarCirculos);
