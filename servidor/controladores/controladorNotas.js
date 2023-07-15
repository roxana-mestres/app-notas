//Página inicial
exports.notas = async (peticion, respuesta) => {
    const locals = {
        titulo: "Notas"
    }

    respuesta.render("notas", {
        locals,
        layout: "../views/layouts/notas"
    });
};
