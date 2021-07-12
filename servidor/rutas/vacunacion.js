const express = require("express");
const rutasCentro = require("./centro");
const rutasVacunado = require("./vacunado");
const rutasVacuna = require("./vacuna");

const router = express.Router();

router.use("/centros", rutasCentro);
router.use("/vacunados", rutasVacunado);
router.use("/vacuna", rutasVacuna);

module.exports = router;
