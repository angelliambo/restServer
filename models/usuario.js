const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Error nombre es obligatorio"],
  },

  apellido: {
    type: String,
    required: [true, "Error apellido es obligatorio"],
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

  rol: {
    type: String,
    enum: ["ADMIN_ROL", "USER_ROL", "VENTAS_ROL"],
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

// Quitamos valores no deseados de la respuesta
UsuarioSchema.methods.toJSON = function () {
  const { password, __v, ...usuario } = this.toObject();
  return usuario;
};

const Usuario = model("Usuario", UsuarioSchema);

module.exports = Usuario;
