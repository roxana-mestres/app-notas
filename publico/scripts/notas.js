const notasGrid = document.querySelector(".notas-grid");

function crearNota() {

  //Aquí se crean los elementos HTML de la nota
  const nota = document.createElement("div");
  nota.classList.add("nota");

  const contenidoNota = document.createElement("div");
  contenidoNota.classList.add("contenido-nota");
  contenidoNota.style.backgroundColor = "#F27E5A";

  const titulo = document.createElement("h3");
  titulo.textContent = "Título de la nota";

  const cuerpo = document.createElement("p");
  cuerpo.textContent = "Escribe tu nota aquí...";

  // Se agregan al contenido de la nota
  contenidoNota.appendChild(titulo);
  contenidoNota.appendChild(cuerpo);

  // Lo mismo con la flecha
  const flecha = document.createElement("div");
  flecha.classList.add("flecha");

  const iconoFlecha = document.createElement("span");
  iconoFlecha.classList.add("material-icons");
  iconoFlecha.textContent = "arrow_forward";

  flecha.appendChild(iconoFlecha);


  // Aquí la sección de contenido y flecha se añaden a la nota.
  nota.appendChild(contenidoNota);
  nota.appendChild(flecha);

  // Aquí se añade la nota al contenedor de notas.
  notasGrid.appendChild(nota);
}

function agregarNotas() {
  // Utiliza el método fetch para enviar una solicitud POST al servidor
  fetch("/notas", {
    method: "POST", // Especifica que la solicitud es de tipo POST (envía datos para crear un elemento)
    headers: {
      "Content-Type": "application/json" // Indica el tipo de contenido que se está enviando en el cuerpo de la solicitud, en este caso, datos en formato JSON. Permite que el servidor pueda leer los datos correctamente.
    },
    body: JSON.stringify({
      titulo: "Título de la nueva nota", // Datos del titulo como objetos de JS
      cuerpo: "Contenido de la nueva nota" // Datos del cuerpo como objetos de JS 
    })
  })
    .then(response => response.json()) // La respuesta recibida en la promesa se pasa a json para que se pueda enviar
    .then(data => { // Recibe los datos en json y los muestra en el terminal
      console.log("Nota creada:", data);
      window.location.reload(); // Refresca la página para mostrar nueva nota
    })
    .catch(error => {
      console.log("Error al crear la nota:", error);
    });
}

//BOTÓN

const botonSubir = document.querySelector(".boton-subir");

// Evento para mostrar u ocultar el botón de volver arriba al hacer scroll.
window.addEventListener("scroll", () => {
  // Si la posición de desplazamiento vertical (scrollY) es mayor a 100 pixels.
  if (window.scrollY > 100) {
    // Agregar la clase CSS "enlace_activo" al botón para mostrarlo.
    botonSubir.classList.add("enlace_activo");
  } else {
    // Si no, remover la clase CSS "enlace_activo" para ocultar el botón.
    botonSubir.classList.remove("enlace_activo");
  }
});

// Permite desplazarse hacia con efecto smooth al hacer clic en el botón de volver arriba.
botonSubir.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
