const express = require("express");
const router = express.Router();
const controladorPrincipal = require("../controladores/controladorPrincipal");
const controladorNotas = require("../controladores/controladorNotas");
const { conectado } = require("../middleware/verificarAuth");

/* Rutas de las distintas páginas. Algunas se encuentran en el controladorprincipal, otras en el controladorNotas. Cada una con el método que corresponde, dependiendo de la función */

// Rutas app
router.get("/", controladorPrincipal.paginaInicial);
router.get("/notas", conectado, controladorNotas.notas);
router.post("/notas", conectado, controladorNotas.agregarNotas);
router.get("/edicion-nota/:id", conectado, controladorNotas.verNota);
router.delete("/edicion-nota/:id", conectado, controladorNotas.borrarNota);
router.put("/edicion-nota/:id", conectado, controladorNotas.actualizarNota);
router.get("/pag-404", controladorPrincipal.pag404);
router.get("/pag-401", controladorPrincipal.pag401);

module.exports = router;
