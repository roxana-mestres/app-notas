const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo 'nombre' es obligatorio."],
  },
  apellido: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "El campo 'email' es obligatorio."],
    unique: true,
    trim: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(email);
      },
      message: "El correo no es válido. Debe tener un punto y dos o tres dígitos al final.",
    },
  },
  password: {
    type: String,
    required: [true, "El campo 'password' es obligatorio."],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
    trim: true,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
