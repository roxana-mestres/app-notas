require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const conectarBD = require("./servidor/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const puerto = process.env.PORT || 5000;

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

// Conectar a base de datos

conectarBD();

// Motor de plantillas
app.use(layouts);
app.set("layout", "layouts/principal");
app.set("view engine", "ejs");

// Rutas específicas para archivos JavaScript y CSS
app.use("/scripts", express.static(path.join(__dirname, "publico", "scripts")));
app.use("/css", express.static(path.join(__dirname, "publico", "css")));

// Rutas generales
app.use("/", require("./servidor/rutas/auth"));
app.use("/", require("./servidor/rutas/index"));
app.use("/", require("./servidor/rutas/notas"));

// Ruta 404
app.use((peticion, respuesta) => {
  respuesta.status(404).render("pag-404");
});

app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto};`);
})