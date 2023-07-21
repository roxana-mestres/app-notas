/* Modelo de la nota. Esto permite que la BD sepa en qué consiste una nota */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaNotas = new Schema({
  usuario: {
    type: Schema.ObjectId,
    ref: "Usuario"
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
    default: Date.now
  }
});

module.exports = mongoose.model("Nota", schemaNotas);
