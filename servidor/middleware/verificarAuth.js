const passport = require("passport");
exports.conectado = function (peticion, respuesta, siguiente) {
  console.log("Verifying user authentication...");
  if (peticion.isAuthenticated()) {
    console.log("User is authenticated.");
    siguiente();
  } else {
    console.log("User is not authenticated.");
    return respuesta.status(401).render("pag-401");
  }
};