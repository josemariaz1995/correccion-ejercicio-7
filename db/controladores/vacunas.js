require("dotenv").config();
const debug = require("debug")("vacunasApp:db:controladores:vacunas");
const chalk = require("chalk");
const CentroVacunacion = require("../modelos/CentroVacunacion");
const Vacuna = require("../modelos/Vacuna");

const listarVacunas = async () => {
  const vacunas = await Vacuna.find();
  return vacunas;
};

const listarVacunasCentro = async (idCentro) => {
  const centro = await CentroVacunacion.findById(idCentro).populate("vacunas");
  return centro.vacunas;
};

const anyadirVacunaCentro = async (idVacuna, idCentro) => {
  try {
    const vacunaExiste = await Vacuna.findById(idVacuna);
    if (!vacunaExiste) {
      throw new Error("La vacuna no existe");
    }
    const vacunaExisteCentro = await CentroVacunacion.findOne({
      _id: idCentro,
      vacunas: {
        $eq: idVacuna,
      },
    });
    if (vacunaExisteCentro) {
      throw new Error("El centro ya tiene esta vacuna");
    }
    const centroActualizado = await CentroVacunacion.findByIdAndUpdate(
      idCentro,
      {
        $push: {
          vacunas: idVacuna,
        },
      }
    );
    return centroActualizado;
  } catch (err) {
    debug(chalk.red("No se ha podido añadir la vacuna"));
    debug(chalk.red(err.message));
  }
};

const getDosisVacuna = async (idVacuna) => {
  const vacuna = await Vacuna.findById(idVacuna);
  return vacuna.dosis;
};

module.exports = {
  listarVacunas,
  listarVacunasCentro,
  getDosisVacuna,
  anyadirVacunaCentro,
};
