const notasGrid = document.querySelector(".notas-grid");

function createNota() {
  const nota = document.createElement("div");
  nota.classList.add("nota");

  const contenidoNota = document.createElement("div");
  contenidoNota.classList.add("contenido-nota");

  const titulo = document.createElement("h3");
  titulo.textContent = "Título de la nota";

  const texto = document.createElement("p");
  texto.textContent = "Escribe el texto aquí...";

  contenidoNota.appendChild(titulo);
  contenidoNota.appendChild(texto);

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
  fetch("/notas", {
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
      window.location.href = "/notas";
    })
    .catch(error => {
      console.log("Error al crear la nota:", error);
    });
}

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
