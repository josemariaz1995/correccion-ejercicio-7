const express = require("express");

const router = express.Router();

// Devuelve cuantas dosis de cada vacuna se han administrado en una ciudad
router.get("/ciudad/:idCiudad", (req, res, next) => {});

module.exports = router;
