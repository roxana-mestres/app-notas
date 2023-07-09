require("dotenv").config();

const express = require("express");
const layouts = require("express-ejs-layouts");
const path = require("path");

const app = express();
const puerto = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "publico")));

// Motor de plantillas
app.use(layouts);
app.set("layout", "./layouts/principal");
app.set("view engine", "ejs");

// Rutas
app.use("/", require("./servidor/rutas/index"));

app.listen(puerto, () => {
    console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
