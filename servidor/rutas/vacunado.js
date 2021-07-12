const express = require("express");
const { getCentrosVacunacion } = require("../../db/controladores/centros");
const {
  anyadirVacunaApersona,
  eliminarRegistroPersona,
  modificarPersonaVacunada,
  crearRegistroPersona,
  listarPersonaPorDni,
  listarPersonasVacunadasCiudad,
  crearPersonaVacunada,
} = require("../../db/controladores/personas");

const router = express.Router();

// Devuelve un array con las personas que se han vacunado en la ciudad
router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const personasVacunadas = await listarPersonasVacunadasCiudad(idCiudad);
  res.json(personasVacunadas);
});

// Devuelve un array con las personas que se han vacunado en un centro
router.get("/ciudad/centro/:idCentro", (req, res, next) => {});

// Devuelve la informacion de una persona vacunada a partir de un DNI
router.get("/ciudad/persona/:dni", async (req, res, next) => {
  const { dni } = req.params;
  const persona = await listarPersonaPorDni(dni.toUpperCase());
  if (!persona) return res.status(404).json({});
  res.json(persona);
});

// Para crear una persona vacunada
router.post("/persona", async (req, res, next) => {
  const {dni, idCentro, idVacuna, primeraDosis, segundaDosis}= req.body;
  const creacionRegistro = await crearPersonaVacunada(dni, idCentro, idVacuna, primeraDosis, segundaDosis);
  res.status(204).json(creacionRegistro);
});

// Para modificar una persona vacunada
router.put("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const personaModificada = await modificarPersonaVacunada(idPersona, req.body);
  if (!personaModificada) return res.status(404).json({});
  res.status(204).json(personaModificada);
});

// Para borrar una persona vacunada
router.delete("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const personaBorrada = await eliminarRegistroPersona(idPersona);
  if (!personaBorrada) return res.status(404).json({});
  res.json(personaBorrada);
});

module.exports = router;
