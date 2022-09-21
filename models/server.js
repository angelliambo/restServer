const express = require("express");
const cors = require("cors");
const usersRoute = require("../routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/usuarios";

    // middlewere
    this.middlewere();

    // Rutas
    this.routes();
  }

  middlewere() {
    // Cors
    this.app.use(cors());

    // lectura y parseo
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, usersRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
