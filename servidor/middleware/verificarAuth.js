const controladorPrincipal = require("../controladores/controladorPrincipal");

module.exports.ensureAuthenticated = function (peticion, respuesta, siguiente) {
  if (peticion.isAuthenticated() && peticion.usuario) {
    console.log("Usuario autenticado");
    return siguiente();
  }

  console.log("Usuario no autenticado");
  controladorPrincipal.pag401(peticion, respuesta); // Redirige al usuario a la página 401
};