require("dotenv").config();
require("./servidor");

const debug = require("debug")("vacunasApp:principal");
const conectarBD = require("./db");
const iniciaPreguntas = require("./cli");

conectarBD(() => iniciaPreguntas());
