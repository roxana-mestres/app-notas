require("dotenv").config();

const express = require("express");
const layouts = require("express-ejs-layouts");

const app = express();
const puerto = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static("publico"));

// Motor de plantillas
app.use(layouts);
app.set("layout", "./layouts/principal");
app.set("view engine", "ejs");

app.get("/", (peticion, respuesta) => {
    respuesta.render("index");
});

app.listen(puerto, () => {
    console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
