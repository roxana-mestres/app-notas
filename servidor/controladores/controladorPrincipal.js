//Página inicial
exports.paginaInicial = async (peticion, respuesta) => {
    const locals = {
        titulo: "Aplicación de Notas"
    }

    respuesta.render("index", locals);
};

//Página crear-cuenta
exports.crearCuenta = async (peticion, respuesta) => {
    const locals = {
        titulo: "App de notas: crear cuenta"
    }

    respuesta.render("crear-cuenta", {
        locals,
        layout: "layouts/pag-crear-cuenta"
    });
};

//Página iniciar-sesion
exports.iniciarSesion = async (peticion, respuesta) => {
    const locals = {
        titulo: "App de notas: inicio de sesión"
    }

    respuesta.render("iniciar-sesion", {
        locals,
        layout: "../views/layouts/pag-iniciar-sesion"
    });
};

//Página 404
exports.pag404 = async (peticion, respuesta) => {
    const locals = {
        titulo: "Esta página no existe"
    }

    respuesta.render("pag-404", {
        locals,
        layout: "../views/layouts/pag-404"
    });
};

//Página 401
exports.pag401 = async (peticion, respuesta) => {
    const locals = {
        titulo: "No tiene autorización"
    }

    respuesta.render("pag-401", {
        locals,
        layout: "../views/layouts/pag-401"
    });
};

//Cerrar sesión

exports.cerrarSesion = async (peticion, respuesta) => {
    peticion.session.destroy(); // Eliminar la sesión
    respuesta.redirect("/"); // Redirigir a la página de inicio
  };