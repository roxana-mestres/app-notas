const circuloMas = document.getElementById("circulo-mas");
const circulos = Array.from(document.querySelectorAll(".circulo"));
let desplegado = false;

circuloMas.addEventListener("click", () => {
  if (desplegado) {
    for (let i = circulos.length - 1; i >= 1; i--) {
      setTimeout(() => {
        circulos[i].classList.toggle("mostrar");
        circulos[i].classList.toggle("oculto");
      }, (circulos.length - i) * 200); // Ajusta el tiempo de duración de la animación
    }
  } else {
    for (let i = 1; i < circulos.length; i++) {
      setTimeout(() => {
        circulos[i].classList.toggle("mostrar");
        circulos[i].classList.toggle("oculto");
      }, i * 200); // Ajusta el tiempo de duración de la animación
    }
  }
  desplegado = !desplegado;
});
