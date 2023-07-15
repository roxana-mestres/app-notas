const express = require("express");
const router = express.Router();

const controladorAuth = require("../controladores/controladorAuth");

router.post("/crear-cuenta", (peticion, respuesta, siguiente) => {
    console.log("Ruta: /crear-cuenta");
    controladorAuth.registro(peticion, respuesta, siguiente);
});

router.post("/iniciar-sesion", (peticion, respuesta, siguiente) => {
    console.log("Ruta: /iniciar-sesion");
    controladorAuth.inicioSesion(peticion, respuesta, siguiente);
});

module.exports = router;
