const express = require("express");
const router = express.Router();
const controladorPrincipal = require("../controladores/controladorPrincipal");
const autenticar = require("../middleware/autenticar");

// Rutas app
router.get("/", controladorPrincipal.paginaInicial);
router.get("/crear-cuenta", controladorPrincipal.crearCuenta);
router.get("/iniciar-sesion", controladorPrincipal.iniciarSesion);
router.get("/notas", autenticar, controladorPrincipal.notas);
router.get("/edicion-nota", autenticar, controladorPrincipal.edicionNota);
router.get("/pag-404", controladorPrincipal.pag404);
router.get("/pag-401", controladorPrincipal.pag401);
router.get("/cerrar-sesion", controladorPrincipal.cerrarSesion);

module.exports = router;
