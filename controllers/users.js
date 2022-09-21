const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "controlador Get",
    query,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "controlador Put",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "controlador Post",
    body,
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
