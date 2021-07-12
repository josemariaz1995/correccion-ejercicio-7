const CentroVacunacion = require("../modelos/CentroVacunacion");
const Ciudad = require("../modelos/Ciudad");

const listarCentros = async (nombreCiudad) => {
  const ciudad = await Ciudad.findOne({
    nombre: nombreCiudad,
  }).populate("puntosVacunacion");
  return ciudad.puntosVacunacion;
};

const crearCentros = async () => {
  CentroVacunacion.insertMany([
    {
      nombre: "Sant Isidor- Centre vacunal CAPSBE",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer del Comte Borrell, 305",
      },
      vacunas: [],
    },
    {
      nombre: "Fira de Barcelona",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Avinguda Rius i Taulet, 12",
      },
      vacunas: [],
    },
    {
      nombre: "Facultat de Geografia i Història UB",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer Montalegre, 6",
      },
      vacunas: [],
    },
    {
      nombre: "La Maquinista",
      localizacion: {
        coordenadas: [41, 2],
        direccion: "Carrer del Pont de Potosí, 2, Planta 0",
      },
      vacunas: [],
    },
  ]);
};

module.exports = {
  listarCentros,
  crearCentros,
};
