const express = require("express");
const router = express.Router();
const controladorAuth = require("../controladores/controladorAuth");

// Ruta para registrar un usuario
router.post("/crear-cuenta", controladorAuth.registro);

// Ruta para iniciar sesión
router.post("/iniciar-sesion", controladorAuth.inicioSesion);

module.exports = router;
