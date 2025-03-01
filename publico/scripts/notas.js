const notasGrid = document.querySelector(".notas-grid");

function crearNota() {

  const nota = document.createElement("div");
  nota.classList.add("nota");

  const contenidoNota = document.createElement("div");
  contenidoNota.classList.add("contenido-nota");
  contenidoNota.style.backgroundColor = "#F27E5A";

  const titulo = document.createElement("h3");
  titulo.textContent = "Título de la nota";

  const cuerpo = document.createElement("p");
  cuerpo.textContent = "Escribe tu nota aquí...";

  contenidoNota.appendChild(titulo);
  contenidoNota.appendChild(cuerpo);

  const flecha = document.createElement("div");
  flecha.classList.add("flecha");

  const iconoFlecha = document.createElement("span");
  iconoFlecha.classList.add("material-icons");
  iconoFlecha.textContent = "arrow_forward";

  flecha.appendChild(iconoFlecha);


  nota.appendChild(contenidoNota);
  nota.appendChild(flecha);

  notasGrid.appendChild(nota);
}

function agregarNotas() {
  fetch("/app-notas/notas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: "Título de la nueva nota",
      cuerpo: "Contenido de la nueva nota"
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Nota creada:", data);
      window.location.reload();
    })
    .catch(error => {
      console.log("Error al crear la nota:", error);
    });
}

//BOTÓN
const botonSubir = document.querySelector(".boton-subir");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    botonSubir.classList.add("enlace_activo");
  } else {
    botonSubir.classList.remove("enlace_activo");
  }
});


botonSubir.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
