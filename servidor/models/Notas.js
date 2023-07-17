const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaNotas = new Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: "usuario"
    },
    titulo: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },
    creado: {
        type: Date,
        required: Date.now()
    }
});

module.exports = mongoose.model("Nota", schemaNotas);