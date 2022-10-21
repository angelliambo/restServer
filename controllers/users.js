const { response, request, query } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.js");
const { Error } = require("mongoose");
const { isValidRol } = require("../helpers/db-validators.js");

const usuariosGet = async (req = request, res = response) => {
  const { limit } = req.query;
  const onlyActiveUsers = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(onlyActiveUsers),
    Usuario.find(onlyActiveUsers).limit(Number(limit)),
  ]).catch((error) => console.log(error.msg));

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  // validad contra BBD
  if (password) {
    //encryp pass
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
  isValidRol(resto.rol);
  res.json({
    id: req.params.id,
    usuario: usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, apellido, correo, password, rol } = req.body;

  const usuario = new Usuario({
    nombre,
    apellido,
    correo,
    password,
    rol,
  });

  //encryp pass
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  try {
    await usuario.save();
    res.json({
      usuario,
    });
  } catch (error) {
    throw new Error(`Error en controlador Post Usuarios: ${error}`);
  }
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "controlador Patch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;
  const { password, google, ...resto } = req.body;
  const queryParam = { estado: false };
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, queryParam, {
    new: true,
  });

  res.json({
    msg: "Usuario eliminado con exito",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
