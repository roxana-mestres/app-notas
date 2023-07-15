require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const layouts = require("express-ejs-layouts");

const app = express();
const puerto = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "publico")));

app.use(session({
  secret: "una cadena secreta cualquiera",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Motor de plantillas
app.use(layouts);
app.set("layout", "layouts/principal");
app.set("view engine", "ejs");

// Rutas generales
app.use("/", require(path.join(__dirname, "servidor", "rutas", "index")));
app.use("/", require(path.join(__dirname, "servidor", "rutas", "notas")));

// Ruta 404
app.get("*", (peticion, respuesta) => {
  respuesta.status(404).render("pag-404");
});

app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
