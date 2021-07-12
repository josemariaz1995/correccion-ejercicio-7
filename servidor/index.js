const morganFreeman = require("morgan");
const { app, express } = require("./init");
const { errorGeneral, error404 } = require("./errores");
const rutasVacunacion = require("./rutas/vacunacion");

app.use(morganFreeman("dev"));
app.use(express.json());

app.use("/vacunacion", rutasVacunacion);

app.use(error404);
app.use((error, res, req, next) => errorGeneral);
