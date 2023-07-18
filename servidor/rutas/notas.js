const express = require("express");
const router = express.Router();
const controladorNotas = require("../controladores/controladorNotas");
const {conectado} = require("../middleware/verificarAuth");

router.get("/notas", conectado, controladorNotas.notas);
module.exports = router;