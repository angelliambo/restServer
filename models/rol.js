const mongoose = require("mongoose");

const RolSchema = mongoose.Schema({
  rol: {
    type: String,
    required: [true, "Error rol es obligatorio"],
  },
});
const Rol = mongoose.model("Rol", RolSchema);

module.exports = Rol;
