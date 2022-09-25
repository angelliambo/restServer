const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.js");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "controlador Get",
    query,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params.id;
  res.json({
    msg: "controlador Put",
    id: id,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, apellido, correo, password } = req.body;
  const usuario = new Usuario({
    nombre,
    apellido,
    correo,
    password,
  });

  // verif correo
  //encryp pass
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "controlador Post",
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "controlador Patch",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "controlador Delete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
