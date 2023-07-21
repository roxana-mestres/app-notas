/* Controladores de Node que permiten renderizar las distintas páginas de la aplicación (al igual que el controladorNotas) */

//Página inicial
exports.paginaInicial = async (peticion, respuesta) => {
    const locals = {
        titulo: "Aplicación de Notas"
    }

    respuesta.render("index", locals);
};

//Página 404
exports.pag404 = async (peticion, respuesta) => {
    const locals = {
        titulo: "Esta página no existe"
    }

    respuesta.render("pag-404", {
        locals,
        layout: "layouts/pag-404"
    });
};

//Página 401
exports.pag401 = async (peticion, respuesta) => {
    const locals = {
        titulo: "No tiene autorización"
    }

    respuesta.render("pag-401", {
        locals,
        layout: "layouts/pag-401"
    });
};