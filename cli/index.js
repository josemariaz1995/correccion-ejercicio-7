const { anyadirVacunaCentro } = require("../db/controladores/vacunas");
const {
  preguntaInicial,
  preguntasVacunas,
  preguntaNuevaVacuna,
  preguntasPersonas,
} = require("./controladores");

const iniciaPreguntas = () => {
  preguntaInicial().then(async ({ accion }) => {
    switch (accion) {
      case "vacunas": {
        await preguntasVacunas();
        // preguntaInicial();
        break;
      }
      case "personas":
        console.log("Introducir personas vacunadas");
        await preguntasPersonas();
        // preguntaInicial();
        break;
      case "salir":
        console.log("Ciao!");
        process.exit(0);
        break;
      default:
        console.log("Acción incorrecta");
        preguntaInicial();
    }
  });
};

module.exports = iniciaPreguntas;
