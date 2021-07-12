const { Schema, model } = require("mongoose");
// require("./CentroVacunacion");

const CiudadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  puntosVacunacion: {
    type: [Schema.Types.ObjectId],
    ref: "CentroVacunacion",
  },
});

const Ciudad = model("Ciudad", CiudadSchema, "ciudades");

module.exports = Ciudad;
