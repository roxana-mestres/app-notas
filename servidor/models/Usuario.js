const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  },
  apellido:{
    type: String,
    required: false
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;