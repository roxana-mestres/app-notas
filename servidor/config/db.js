const mongoose = require("mongoose");

const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("La base de datos está conectada:", mongoose.connection.host);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
};

module.exports = conectarBD;
