//Página inicial
exports.notas = async (peticion, respuesta) => {
    const locals = {
        titulo: "Notas"
    }

    respuesta.render("notas", {
        locals,
        layout: "../views/layouts/pag-notas"
    });
};

//Página edicion-nota
exports.edicionNota = async (peticion, respuesta) => {
    const locals = {
        titulo: "Edición de nota"
    }

    respuesta.render("edicion-nota", {
        locals,
        layout: "../views/layouts/pag-edicion-nota"
    });
};
