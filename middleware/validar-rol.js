const { response } = require("express");

const isAdminRol = (req, res = response, next) => {
  const { rol, correo } = req.usuario;

  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se intenta validar ROL antes que el token",
    });
  }

  if (rol !== "ADMIN_ROL") {
    return res.status(401).json({
      msg: `usuario ${correo}, sin permisos suficientes`,
    });
  }

  next();
};

const allowedRol = (...rols) => {
  return (req, res = response, next) => {
    const { rol, correo } = req.usuario;

    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se intenta validar ROL antes que el token",
      });
    }

    if (!rols.includes(rol)) {
      return res.status(401).json({
        msg: `usuario ${correo} rol:${rol}, sin permisos, permitidos: ${rols}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRol,
  allowedRol,
};
