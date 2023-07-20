exports.conectado = function (peticion, respuesta, siguiente) {
  console.log("Verificando autenticación del usuario");
  if (peticion.isAuthenticated()) {
    console.log("Usuario autenticado");
    siguiente();
  } else {
    console.log("Usuario no autenticado");
    return respuesta.status(401).render("pag-401");
  }
};