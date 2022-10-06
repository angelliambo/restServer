const mongoose = require("mongoose");

const RolSchema = mongoose.Schema({
  rol: {
    type: String,
    required: [true, "Error rol es obligatorio"],
    enum: ["ADMIN_ROL", "USER_ROL", "VENTAS_ROL"],
  },
});
const Rol = mongoose.model("Rol", RolSchema);

module.exports = Rol;
