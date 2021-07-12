const chalk = require("chalk");
const debug = require("debug")("vacunasApp:servidor:errores");

const errorServidor = (error, puerto) => {
  debug(chalk.redBright.bold("El servidor no se a podido levantar "));
  if (error.code === "EADDRINUSE") {
    return debug(chalk.redBright.bold(`El puerto ${puerto} está ocupado.`));
  }
};

const error404 = (req, res, next) => {
  debug(chalk.redBright.bold("No se ha encontrado el recurso"));
  res.status(404).json({ error: true, mensaje: "Recurso no encontrado" });
};

const errorGeneral = (error, req, res, next) => {
  const codigo = error.codigo || 500;
  const mensaje = error.codigo ? error.message : "Ha habido un error general";
  res.status(codigo).json({ error: true, mensaje });
};

module.exports = {
  errorServidor,
  error404,
  errorGeneral,
  chalk,
};
