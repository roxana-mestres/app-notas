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
        layout: "../views/layouts/pag-crear-cuenta"
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

//Página notas
exports.notas = async (peticion, respuesta) => {
    const locals = {
        titulo: "Notas"
    }

    respuesta.render("notas", locals);
};

//Página edicion-nota
exports.edicionNota = async (peticion, respuesta) => {
    const locals = {
        titulo: "Edición de nota"
    }

    respuesta.render("edicion-nota", locals);
};