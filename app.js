require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const controladorNotas = require("./servidor/controladores/controladorNotas");
const controladorAuth = require("./servidor/rutas/auth");
const autenticar = require("./servidor/middleware/autenticar");

const app = express();
const puerto = process.env.PORT || 5000;

// Establecer conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    // Iniciar el servidor
    app.listen(puerto, () => {
      console.log(`El servidor está funcionando en el puerto ${puerto}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "publico")));

app.use(session({
  secret: "una cadena secreta cualquiera",
  resave: false,
  saveUninitialized: false
}));

// Motor de plantillas
app.use(layouts);
app.set("layout", "layouts/principal");
app.set("view engine", "ejs");

// Rutas de autenticación
app.use("/", controladorAuth);

// Rutas específicas para archivos JavaScript y CSS
app.use("/scripts", express.static(path.join(__dirname, "publico", "scripts")));
app.use("/css", express.static(path.join(__dirname, "publico", "css")));

// Rutas generales
app.use("/", require(path.join(__dirname, "servidor", "rutas", "index")));
app.use("/", require(path.join(__dirname, "servidor", "rutas", "notas")));

// Ruta 404
app.use((peticion, respuesta) => {
  respuesta.status(404).render("pag-404");
});
