const Rol = require("../models/rol");
const Usuario = require("../models/usuario.js");

// Verificamos rol válido
const isValidRol = async (rol) => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol: ${rol} no existe`);
  }
};

// Verificamos correo en uso
const isValidEmail = async (correo) => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo: ${correo}, se encuentra en uso`);
  }
};

module.exports = {
  isValidRol,
  isValidEmail,
};
