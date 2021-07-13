const express = require("express");

const router = express.Router();
const {
  personasVacunadasPorCiudad,
} = require("../../db/controladores/personas");
// Devuelve cuantas dosis de cada vacuna se han administrado en una ciudad
router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const persona = await personasVacunadasPorCiudad(idCiudad);
  res.json(persona);
});

module.exports = router;
