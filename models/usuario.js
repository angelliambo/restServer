const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Error nombre es obligatorio"],
  },

  apellido: {
    type: String,
    required: [true, "Error apellido es obligatorio"],
  },

  nickName: {
    type: String,
    unique: true,
  },

  correo: {
    type: String,
    required: [true, "Error correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Error password es obligatorio"],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  estado: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
