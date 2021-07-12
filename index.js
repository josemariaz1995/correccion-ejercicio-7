require("dotenv").config();
const debug = require("debug")("vacunasApp:principal");
const conectarBD = require("./db");
const iniciaPreguntas = require("./cli");

conectarBD(() => iniciaPreguntas());
