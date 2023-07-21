const mongoose = require("mongoose");

const conectarBD = async () => {
  try {
    // Conexión a la BD utilizando la URL .env "MONGODB_URI" y las opciones useNewUrlParser y useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("La base de datos está conectada:", mongoose.connection.host);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
};

// Exportar conectarBD para que pueda ser utilizada en otros módulos.
module.exports = conectarBD;
