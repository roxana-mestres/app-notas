/* Middleware que permite verificar autenticación del usuario. Luego se incorpora en las rutas de index.js */

exports.conectado = function (peticion, respuesta, siguiente) {
  console.log("Verificando autenticación del usuario");
  if (peticion.isAuthenticated()) {
    console.log("Usuario autenticado");
    siguiente(); //Si está autenticado, pasa al siguiente middleware.
  } else {
    console.log("Usuario no autenticado");
    return respuesta.status(401).render("pag-401");
  }
};