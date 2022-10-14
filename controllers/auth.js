const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario.js");
const { generateJWT } = require("../helpers/generate-jwt.js");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar email
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/password no existe",
      });
    }

    // Verificar usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/password no existe",
      });
    }

    // Verificar password correcto
    const passwordIsValid = bcryptjs.compareSync(password, usuario.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        msg: "Usuario/password no existe",
      });
    }

    // Generar JWT
    const userToken = await generateJWT(usuario.id);

    res.json({
      usuario,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error algo salio mal",
      error,
    });
  }
};

module.exports = { login };
