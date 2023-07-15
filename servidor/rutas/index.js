const express = require("express");
const router = express.Router();
const controladorPrincipal = require("../controladores/controladorPrincipal");

// Rutas app
router.get("/", controladorPrincipal.paginaInicial);
router.get("/crear-cuenta", controladorPrincipal.crearCuenta);
router.get("/iniciar-sesion", controladorPrincipal.iniciarSesion);
router.get("/notas", controladorPrincipal.notas);
router.get("/edicion-nota", controladorPrincipal.edicionNota);
router.get("/pag-404", controladorPrincipal.pag404);
router.get("/pag-401", controladorPrincipal.pag401);

module.exports = router;
