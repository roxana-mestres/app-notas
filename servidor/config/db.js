const mongoose = require("mongoose");
const conectarBD = async () => {
    try {
        //Conexión a la BD utilizando la URL .env "MONGODB_URI".
        const conectar = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`La base de datos está conectada: ${conectar.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

// Exportar conectarBD para que pueda ser utilizada en otros módulos.
module.exports = conectarBD;