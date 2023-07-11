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

/*CAMBIAR TAMAÑO LETRA*/

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


