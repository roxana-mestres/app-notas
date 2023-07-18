const express = require("express");
const router = express.Router();
const controladorNotas = require("../controladores/controladorNotas");
const {conectado} = require("../middleware/verificarAuth");
const path = require("path");

router.get("/notas", conectado, controladorNotas.notas);

//Página edicion-nota
exports.edicionNota = async (peticion, respuesta) => {
    const locals = {
        titulo: "Edición de nota"
    }

    respuesta.render("edicion-nota", {
        nombre: peticion.usuario.displayName,
        locals,
        layout: path.join("layouts", "pag-edicion-nota")
    });
};

module.exports = router;