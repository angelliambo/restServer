const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRETORPUBLICKEY;

const validateJWT = (req = request, res = response, next) => {
  const token = req.header("ATK");
  if (!token) {
    return res.status(401).json({
      msg: "token vacio",
    });
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "token inválido",
    });
  }
};

module.exports = {
  validateJWT,
};
