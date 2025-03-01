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
app.use(methodOverride("_method"));

// Conectar a la base de datos
conectarBD();

// 1) Montar la carpeta de estáticos en /app-notas
app.use("/app-notas", express.static(path.join(__dirname, "publico")));

// 2) Opcional: si quieres rutas separadas para /scripts o /css
//    y mantener "/app-notas/css/..." en tus plantillas, haz:
app.use("/app-notas/scripts", express.static(path.join(__dirname, "publico", "scripts")));
app.use("/app-notas/css", express.static(path.join(__dirname, "publico", "css")));

// Configurar vistas
app.set("views", path.join(__dirname, "views"));
app.use(layouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/principal");

// 3) Montar las rutas en /app-notas
app.use("/app-notas", require(path.join(__dirname, "servidor", "rutas", "auth")));
app.use("/app-notas", require(path.join(__dirname, "servidor", "rutas", "index")));

// 4) Ruta 404 (si ninguna anterior coincide)
app.use((req, res) => {
  res.status(404).render("pag-404");
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
