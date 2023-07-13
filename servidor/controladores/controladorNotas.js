//Página inicial
exports.notas = async (peticion, respuesta) => {
    const locals = {
        titulo: "Notas"
    }

    respuesta.render("notas", {
        locals,
        layouts: "../views/layouts/notas"
    });
};
