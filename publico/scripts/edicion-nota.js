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