const express = require("express");
const { getCentrosVacunacion } = require("../../mongo/controladores/ciudad");

const router = express.Router();

// Devuelve un array con los centros de vacunacion de la ciudad
router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const puntosVacunacion = await getCentrosVacunacion(idCiudad);
  res.json(puntosVacunacion);
});

// Devuelve informacion sobre un centro de vacunacion
router.get("/ciudad/:idCentro", (req, res, next) => {
  const { idCentro } = req.params;
});

module.exports = router;
