const { Router } = require("express");
const { check } = require("express-validator");
// middleware
const { validarCampos } = require("../middleware/validar-campos");
const { validateJWT } = require("../middleware/validar-jwt");
const { isAdminRol, allowedRol } = require("../middleware/validar-rol");
// controllers
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");
// helpers
const {
  isValidRol,
  isValidEmail,
  userFoundById,
  userIsActive,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom((id) => userFoundById(id)),
    check("id").custom((id) => userIsActive(id)),
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

router.delete(
  "/:id",
  [
    validateJWT,
    allowedRol("ADMIN_ROL", "VENTAS_ROL"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom((id) => userFoundById(id)),
    check("id").custom((id) => userIsActive(id)),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
