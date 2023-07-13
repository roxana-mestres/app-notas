const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schemaUsuario = new Schema({
    googleId: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Usuario", schemaUsuario);