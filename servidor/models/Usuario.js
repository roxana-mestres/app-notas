const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schemaUsuario = new Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

schemaUsuario.pre("save", function (next) {
  console.log("Guardando usuario:");
  console.log("googleId:", this.googleId);
  console.log("displayName:", this.displayName);
  console.log("firstName:", this.firstName);
  console.log("lastName:", this.lastName);
  console.log("profileImage:", this.profileImage);

  next();
});

module.exports = mongoose.model("Usuario", schemaUsuario);
