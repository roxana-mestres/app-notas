// BORRAR

function borrarNota() {
  if (confirm("¿Estás seguro de que deseas borrar la nota?")) {
    document.getElementById("borrar-nota-form").submit();
  }
};
/* Crea mensaje de confirmación en navegador antes de borrar nota */