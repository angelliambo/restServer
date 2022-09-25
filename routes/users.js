const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("password", "password es obligatorio, minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Formato de correo inválido").isEmail(),
    check("role", "No es un Role válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);

module.exports = router;
