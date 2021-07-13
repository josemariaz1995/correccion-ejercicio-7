const Ciudad = require("../modelos/Ciudad");
const Persona = require("../modelos/Persona");

const listarPersonaPorDni = async (dni) => {
  const persona = await Persona.find().where("dni").eq(dni.toUpperCase());
  return persona;
};
const modificarPersonaVacunada = async (id, modificaciones) => {
  try {
    const modificarPersona = await Persona.findByIdAndUpdate(
      id,
      modificaciones
    );
    const personaModificada = await Persona.findById(id);
    return personaModificada;
  } catch (error) {
    console.log(`Error al modificar persona: ${error.message}`);
  }
};
const eliminarRegistroPersona = async (id) => {
  try {
    const peronsalEliminada = await Persona.findByIdAndDelete(id);
    return peronsalEliminada;
  } catch (error) {
    console.log(`Error al eliminar registro ${error.message}`);
  }
};
const crearPersonaVacunada = async (
  dni,
  idCentro,
  idVacuna,
  primeraDosis,
  segundaDosis
) => {
  const persona = await Persona.create({
    dni,
    centroVacunacion: idCentro,
    vacuna: idVacuna,
  });
  if (primeraDosis) {
    persona.dosis.push(primeraDosis);
  }
  if (segundaDosis) {
    persona.dosis.push(segundaDosis);
  }
  await persona.save();
  return persona;
};
const personasVacunadasPorCiudad = async (id) => {
  const ciudad = await Ciudad.findById(id).populate({
    path: "puntosVacunacion",
    model: "CentroVacunacion",
    select: "nombre -_id",
  });
  const personas = await Persona.find().populate({
    path: "centroVacunacion",
    model: "CentroVacunacion",
    select: "nombre -_id",
  });
  const nombreCentro = await ciudad.puntosVacunacion.map(
    (centro) => centro.nombre
  );
  const contador = personas.reduce((contador, persona) => {
    debugger;
    if (nombreCentro.includes(persona.centroVacunacion.nombre)) {
      return contador + persona.dosis.length;
    } else {
      return contador;
    }
  }, 0);
  return contador;
};

module.exports = {
  personasVacunadasPorCiudad,
  crearPersonaVacunada,
  eliminarRegistroPersona,
  modificarPersonaVacunada,
  listarPersonaPorDni,
};
