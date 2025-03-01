const express = require("express");
const router = express.Router();
const controladorPrincipal = require("../controladores/controladorPrincipal");
const controladorNotas = require("../controladores/controladorNotas");
const { conectado } = require("../middleware/verificarAuth");

// Rutas app
router.get("/app-notas/", controladorPrincipal.paginaInicial);
router.get("/app-notas/notas", conectado, controladorNotas.notas);
router.post("/app-notas/notas", conectado, controladorNotas.agregarNotas);
router.get("/app-notas/edicion-nota/:id", conectado, controladorNotas.verNota);
router.delete("/app-notas/edicion-nota/:id", conectado, controladorNotas.borrarNota);
router.put("/app-notas/edicion-nota/:id", conectado, controladorNotas.actualizarNota);
router.get("/app-notas/pag-404", controladorPrincipal.pag404);
router.get("/app-notas/pag-401", controladorPrincipal.pag401);

module.exports = router;
