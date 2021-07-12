const inquirer = require("inquirer");
const { DateTime } = require("luxon");
const { listarCentros } = require("../db/controladores/centros");
const { crearPersonaVacunada } = require("../db/controladores/personas");
const {
  listarVacunas,
  anyadirVacunaCentro,
  listarVacunasCentro,
  getDosisVacuna,
} = require("../db/controladores/vacunas");

const preguntaInicial = async () => {
  console.log("\n");
  const respuestas = await inquirer.prompt([
    {
      name: "accion",
      type: "list",
      message: "¿Qué quieres hacer?",
      choices: [
        {
          name: "Introducir vacunas",
          value: "vacunas",
        },
        {
          name: "Introducir personas vacunadas",
          value: "personas",
        },
        {
          name: "Salir de la aplicación",
          value: "salir",
        },
      ],
    },
  ]);
  return respuestas;
};

const preguntasVacunas = async () => {
  const { respuestasCentro, respuestasVacuna } =
    await preguntasInicialesVacunas();
  const vacunaAnyadida = await anyadirVacunaCentro(
    respuestasVacuna.vacuna,
    respuestasCentro.centro
  );
  const nueva = await preguntaNuevaVacuna();
  if (nueva) {
    await preguntasVacunas();
  }
};

const preguntasInicialesVacunas = async () => {
  const centros = await listarCentros(process.env.CIUDAD);
  const choicesCentros = centros.map((centro) => ({
    name: centro.nombre,
    value: centro._id,
  }));
  const respuestasCentro = await inquirer.prompt([
    {
      name: "centro",
      message: "Centro de vacunación",
      type: "list",
      choices: choicesCentros,
    },
  ]);
  const vacunas = await listarVacunas();
  const choicesVacunas = vacunas.map((vacuna) => ({
    name: vacuna.nombre,
    value: vacuna._id,
  }));
  const respuestasVacuna = await inquirer.prompt([
    {
      name: "vacuna",
      message: "Vacuna",
      type: "list",
      choices: choicesVacunas,
    },
  ]);
  return { respuestasCentro, respuestasVacuna };
};

const preguntaNuevaVacuna = async () =>
  inquirer.prompt([
    {
      name: "otra",
      message: "¿Añadir otra vacuna?",
      type: "confirm",
    },
  ]);

const preguntasPersonas = async () => {
  await preguntasInicialesPersonas();
  const nueva = await preguntaNuevaPersona();
  if (nueva) {
    await preguntasPersonas();
  }
};

const preguntasInicialesPersonas = async () => {
  const centros = await listarCentros(process.env.CIUDAD);
  const choicesCentros = centros.map((centro) => ({
    name: centro.nombre,
    value: centro._id,
  }));
  const { dni } = await inquirer.prompt([
    {
      name: "dni",
      type: "input",
      message: "DNI",
    },
  ]);
  const respuestasCentro = await inquirer.prompt([
    {
      name: "centro",
      type: "list",
      message: "Centro de vacunación",
      choices: choicesCentros,
    },
  ]);
  const vacunasCentro = await listarVacunasCentro(respuestasCentro.centro);
  const choicesVacunas = vacunasCentro.map((vacuna) => ({
    name: vacuna.nombre,
    value: vacuna._id,
  }));
  const respuestasVacuna = await inquirer.prompt([
    {
      name: "vacuna",
      type: "list",
      message: "Vacuna",
      choices: choicesVacunas,
    },
  ]);
  const dosisVacuna = await getDosisVacuna(respuestasVacuna.vacuna);
  const respuestasDosis = await inquirer.prompt([
    {
      name: "primeraDosis",
      type: "input",
      message: "Fecha de la primera dosis (dd-mm-YYYY)",
    },
    {
      name: "segundaDosis",
      type: "input",
      message: "Fecha de la segunda dosis (dd-mm-YYYY)",
      when: () => dosisVacuna > 1,
    },
  ]);
  const primeraDosisDefinitiva = DateTime.fromFormat(
    respuestasDosis.primeraDosis,
    "dd-MM-yyyy",
    {
      locale: "es-ES",
    }
  );
  let segundaDosisDefinitiva;
  if (respuestasDosis.segundaDosis) {
    segundaDosisDefinitiva = DateTime.fromFormat(
      respuestasDosis.segundaDosis,
      "dd-MM-yyyy",
      {
        locale: "es-ES",
      }
    );
  }
  await crearPersonaVacunada(
    dni,
    respuestasCentro.centro,
    respuestasVacuna.vacuna,
    primeraDosisDefinitiva,
    segundaDosisDefinitiva
  );
  const nueva = await preguntaNuevaPersona();
  if (nueva) {
    await preguntasPersonas();
  }
};

const preguntaNuevaPersona = async () => {};

module.exports = {
  preguntaInicial,
  preguntasVacunas,
  preguntasPersonas,
};
