const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario.js");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar email
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/password no existe -correo",
      });
    }

    // Verificar usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/password no existe -estado",
      });
    }

    // Verificar password correcto
    const passwordIsValid = bcryptjs.compareSync(password, usuario.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        msg: "Usuario/password no existe -password",
      });
    }
    // Generar JWT

    res.json({
      msg: "login OK",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error algo salio mal",
      error,
    });
  }
};

module.exports = { login };
