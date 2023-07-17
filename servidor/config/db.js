const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const conectarBD = async() => {
    try{
        const conectar = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`La base de datos está conectada: ${conectar.connection.host}`);
    }catch (error) {
        console.log(error);
    }
}

module.exports = conectarBD;