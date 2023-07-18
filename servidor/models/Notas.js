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
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Nota", schemaNotas);
