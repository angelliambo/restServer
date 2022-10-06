const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");
const {
  isValidRol,
  isValidEmail,
  userFoundById,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom((id) => userFoundById(id)),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("password", "password es obligatorio, minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Formato de correo inválido").isEmail(),
    check("correo").custom((correo) => isValidEmail(correo)),
    check("rol").custom((rol) => isValidRol(rol)),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);

module.exports = router;
