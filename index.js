require("dotenv").config();
require("./servidor");

const debug = require("debug")("vacunasApp:principal");
const conectarBD = require("./db");
const iniciaPreguntas = require("./cli");
const { personasVacunadasPorCiudad } = require("./db/controladores/personas");

conectarBD(() => iniciaPreguntas());

(async () => {
  await personasVacunadasPorCiudad("60e82d4c17879a2694297011");
})();
