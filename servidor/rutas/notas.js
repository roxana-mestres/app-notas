const express = require("express");
const router = express.Router();
const controladorNotas = require("../controladores/controladorNotas");

router.get("/notas", controladorNotas.notas);

module.exports = router;