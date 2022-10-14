const jwt = require("jsonwebtoken");
const secret = process.env.SECRETORPUBLICKEY;

// generador tokes
const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "600",
      },
      (err, token) => {
        if (err) {
          console.log("JWT error", { err });
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
