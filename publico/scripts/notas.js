const circuloMas = document.getElementById("circulo-mas");
const circulos = Array.from(document.querySelectorAll(".circulo"));
const notasGrid = document.querySelector(".notas-grid");
let desplegado = false;
let notaIndex = 0;

function toggleCirculo(index) {
  circulos[index].classList.toggle("mostrar");
  circulos[index].classList.toggle("oculto");
}

function animateOut() {
  let i = circulos.length - 1;
  const interval = setInterval(() => {
    toggleCirculo(i);
    i--;
    if (i < 1) {
      clearInterval(interval);
    }
  }, 100);
}

function animateIn() {
  let i = 1;
  const interval = setInterval(() => {
    toggleCirculo(i);
    i++;
    if (i >= circulos.length) {
      clearInterval(interval);
    }
  }, 100);
}

function createNota() {
  const nota = document.createElement("div");
  nota.classList.add("nota");

  const contenidoNota = document.createElement("div");
  contenidoNota.classList.add("contenido-nota");

  const titulo = document.createElement("h3");
  titulo.textContent = "Título de la nota";

  const texto = document.createElement("p");
  texto.textContent =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A rem magnam necessitatibus repellendus officia, non quisquam ipsam similique beatae, labore ut.";

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

circuloMas.addEventListener("click", () => {
  if (desplegado) {
    animateOut();
  } else {
    animateIn();
  }
  desplegado = !desplegado;
});

circulos.forEach((circulo, index) => {
  circulo.addEventListener("click", () => {
    if (index !== 0) {
      createNota();
    }
  });
});

const botonSubir = document.querySelector(".boton-subir");

window.addEventListener("scroll", () => {
    if(window.scrollY > 100) {
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
