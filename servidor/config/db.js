const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const conectarBD = async() => {
    try{
        const coneccion = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Base de datos conectada: ${coneccion.connection.host}`);
    }catch(error) {
        console.log(error);
    }
};

module.exports = conectarBD;