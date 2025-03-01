require("dotenv").config();

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose"); 
const layouts = require("express-ejs-layouts");
const conectarBD = require("./servidor/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const puerto = process.env.PORT || 3003;

// Configuración de sesiones y middleware de Passport
app.use(session({
  secret: 'unastringcualquiera',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "publico")));
app.use(methodOverride("_method"));

// Conectar a la base de datos
conectarBD();

app.set("views", path.join(__dirname, "views"));
app.use(layouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/principal");

// Rutas específicas para archivos JavaScript y CSS
app.use("/scripts", express.static(path.join(__dirname, "publico", "scripts"))); 
app.use("/css", express.static(path.join(__dirname, "publico", "css")));

// Rutas generales para autenticación y la página principal
app.use("/", require(path.join(__dirname, "servidor", "rutas", "auth"))); 
app.use("/", require(path.join(__dirname, "servidor", "rutas", "index")));

// Ruta 404 - Página no encontrada
app.use((peticion, respuesta) => {
  respuesta.status(404).render("pag-404");
});

app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
