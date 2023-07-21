require("dotenv").config(); // Carga las variables de entorno definidas en el archivo .env

const express = require("express"); // Importa el módulo Express.
const path = require("path"); // Proporciona funciones para trabajar con rutas de archivos y directorios
const methodOverride = require("method-override"); // Permite el uso de métodos HTTP PUT y DELETE en formularios, en vez de solo GET y POST
const mongoose = require("mongoose"); // Librería para interactuar con MongoDB y realizar operaciones en la base de datos. Permite usar MongoDB de forma similar a como se usa una librería tradicional de bases de datos SQL, proporcionando un esquema flexible
const layouts = require("express-ejs-layouts"); // Middleware para el motor de plantillas EJS y el uso de layouts
const conectarBD = require("./servidor/config/db"); // Función para establecer la conexión con MongoDB
const session = require("express-session"); // Middleware para gestionar sesiones en Express
const passport = require("passport"); // Librería para la autenticación de usuarios
const MongoStore = require("connect-mongo"); // Proporciona almacenamiento de sesiones basado en MongoDB

const app = express(); // Crea una instancia de la aplicación Express
const puerto = process.env.PORT; // Configura el puerto del servidor, utilizando el valor del archivo .env o el puerto 5000 por defecto.

// Configuración de sesiones y middleware de Passport
app.use(session({
  secret: 'unastringcualquiera', // Secreto utilizado para firmar la cookie de la sesión
  resave: false, // No se guardará la sesión en cada solicitud si no hay cambios
  saveUninitialized: true, // Guarda una sesión vacía en el almacenamiento
  store: MongoStore.create({ // Almacenamiento de sesiones basado en MongoDB (connect-mongo)
    mongoUrl: process.env.MONGODB_URI // URL de conexión a MongoDB obtenida del archivo .env
  })
}));

app.use(passport.initialize()); // Inicializa Passport y lo agrega como middleware en la aplicación
app.use(passport.session()); // Establece la persistencia de la autenticación en la sesión

app.use(express.urlencoded({ extended: true })); // Analiza los datos de formulario y los almacena en peticion.body
app.use(express.json()); // Analiza los datos en formato JSON y los almacena en peticion.body

app.use(express.static(path.join(__dirname, "publico"))); // Sirve archivos estáticos desde la carpeta "publico". path.join permite concatenar segmentos de rutas o directorios y crear una ruta completa.
app.use(methodOverride("_method")); // Habilita el uso de métodos HTTP PUT y DELETE en formularios

// Conectar a la base de datos
conectarBD(); // Establece la conexión con MongoDB

// Establece el directorio de vistas y configuración del motor de plantillas EJS
app.set("views", path.join(__dirname, "views")); // Establece la carpeta "views" como directorio de vistas
app.use(layouts); // Habilita el uso de layouts con el motor de plantillas EJS
app.set("view engine", "ejs"); // Configura el motor de plantillas EJS para procesar las vistas
app.set("layout", "layouts/principal"); // Establece el layout "principal" como el diseño predeterminado

// Rutas específicas para archivos JavaScript y CSS
app.use("/scripts", express.static(path.join(__dirname, "publico", "scripts"))); // Sirve archivos JavaScript desde la carpeta "publico/scripts"
app.use("/css", express.static(path.join(__dirname, "publico", "css"))); // Sirve archivos CSS desde la carpeta "publico/css"

// Rutas generales para autenticación y la página principal
app.use("/", require(path.join(__dirname, "servidor", "rutas", "auth"))); // Agrega las rutas de autenticación
app.use("/", require(path.join(__dirname, "servidor", "rutas", "index"))); // Agrega las rutas de la página principal

// Ruta 404 - Página no encontrada
app.use((peticion, respuesta) => {
  respuesta.status(404).render("pag-404"); // Renderiza la página de error 404 cuando no se encuentra una ruta válida
});

app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
