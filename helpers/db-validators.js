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

// Verificamos correo en uso
const userFoundById = async (id) => {
  const userExist = await Usuario.findById(id);
  if (!userExist) {
    throw new Error(`El usuario id: ${id}, no se encuentra en BBD`);
  }
};

module.exports = {
  isValidRol,
  isValidEmail,
  userFoundById,
};
