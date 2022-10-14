const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const secret = process.env.SECRETORPUBLICKEY;

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("ATK");
  if (!token) {
    return res.status(401).json({
      msg: "token no válido",
    });
  }
  try {
    const { uid } = jwt.verify(token, secret);

    // leer usuario que corresponda al uid
    usuario = await Usuario.findById(uid);

    // no existe usuario
    if (!usuario) {
      return res.status(401).json({
        msg: "token no válido",
      });
    }

    // Verificar si el usuario esta activo
    if (usuario.estado === false) {
      return res.status(401).json({
        msg: "token no válido",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
