const circulos = document.querySelectorAll(".circulo");
const notasGrid = document.querySelector(".notas-grid");
const circuloMas = document.querySelector("#circulo-mas");

let desplegado = false;

function animateIn() {
  let i = 1;
  const interval = setInterval(() => {
    circulos[i].classList.remove("oculto");
    i++;
    if (i >= circulos.length) {
      clearInterval(interval);
    }
  }, 100);
}

function animateOut() {
  let i = circulos.length - 1;
  const interval = setInterval(() => {
    circulos[i].classList.add("oculto");
    i--;
    if (i < 1) {
      clearInterval(interval);
    }
  }, 100);
}

function createNota(colorBorde) { // Agregar el parámetro colorBorde
  const nota = document.createElement("div");
  nota.classList.add("nota");

  const contenidoNota = document.createElement("div");
  contenidoNota.classList.add("contenido-nota");

  const titulo = document.createElement("h3");
  titulo.textContent = "Título de la nota";

  const texto = document.createElement("p");
  texto.textContent =
    "Escribe el texto aquí...";

  contenidoNota.appendChild(titulo);
  contenidoNota.appendChild(texto);

  // Aquí cambiamos el color del borde de la nota según el parámetro colorBorde
  nota.style.borderColor = colorBorde;

  // Aquí agregamos la flecha a la nota y ajustamos su color y enlace
  const flecha = document.createElement("div");
  flecha.classList.add("flecha");

  const iconoFlecha = document.createElement("span");
  iconoFlecha.classList.add("material-icons");
  iconoFlecha.textContent = "arrow_forward";

  iconoFlecha.style.color = colorBorde; // Agregar esta línea para ajustar el color del icono de la flecha

  flecha.appendChild(iconoFlecha);

  nota.appendChild(contenidoNota);
  nota.appendChild(flecha);

  notasGrid.appendChild(nota);
}

circulos.forEach((circulo, index) => {
  circulo.addEventListener("click", () => {
    if (index !== 0) { // Agregar esta condición para evitar que se cree una nota cuando se hace clic en el primer botón "+"
      // Aquí obtenemos el color del borde del botón al que se hizo clic
      const colorBorde = window.getComputedStyle(circulos[index]).getPropertyValue(
        "background-color"
      );
      createNota(colorBorde); // Agregar el parámetro colorBorde
    }
    if (index === 0) { // Agregar esta condición para controlar el botón "+"
      if (desplegado) {
        animateOut();
      } else {
        animateIn();
      }
      desplegado = !desplegado; // Agregar esta línea para cambiar el valor de la variable desplegado
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
