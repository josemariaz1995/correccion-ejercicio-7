const { Schema, model } = require("mongoose");

const CentroVacunacionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  localizacion: {
    coordenadas: {
      type: [Number],
      validate: [
        (coordenadas) => coordenadas.length === 2,
        "Deben introducirse dos coordenadas",
      ],
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  vacunas: {
    type: [Schema.Types.ObjectId],
    ref: "Vacuna",
  },
});

const CentroVacunacion = model(
  "CentroVacunacion",
  CentroVacunacionSchema,
  "centrosvacunacion"
);

module.exports = CentroVacunacion;
