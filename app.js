require("dotenv").config();

const express = require("express");
const layouts = require("express-ejs-layouts");
const path = require("path");
const conectarBD = require("./servidor/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const puerto = process.env.PORT || 5000;

app.use(session({
    secret:"keyboard cat",
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

//Conectarse a base de datos
conectarBD();

// Archivos estáticos
app.use(express.static(path.join(__dirname, "publico")));

// Motor de plantillas
app.use(layouts);
app.set("layout", "./layouts/principal");
app.set("view engine", "ejs");

// Rutas
app.use("/", require("./servidor/rutas/auth"));
app.use("/", require("./servidor/rutas/index"));
app.use("/", require("./servidor/rutas/notas"));

//Ruta 404
app.get("*", (peticion, respuesta) => {
    respuesta.status(404).render("pag-404.ejs")
});

app.listen(puerto, () => {
    console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
