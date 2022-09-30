const Rol = require("../models/rol");

const isValidRol = async (rol) => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol:${rol} no existe`);
  }
};

module.exports = {
  isValidRol,
};
