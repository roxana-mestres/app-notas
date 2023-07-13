const express = require("express");
const router = express.Router();
const controladorNotas = require("../controladores/controladorNotas");
const { ensureAuthenticated } = require("../middleware/verificarAuth");

router.get("/notas", ensureAuthenticated, controladorNotas.notas);

module.exports = router;
