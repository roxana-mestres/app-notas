const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/verificarAuth");
const controladorNotas = require("../controladores/controladorNotas");

router.get("/notas", isLoggedIn, controladorNotas.notas);

module.exports = router;
