const passport = require("passport");
exports.conectado = function (peticion, respuesta, siguiente) {
    if (peticion.isAuthenticated()) {
      siguiente();
    } else {
      return respuesta.status(401).render("pag-401");
    }
  };
  