const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODBCNN || "mongodb://localhost/curso-node",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error conectando a BDD");
  }
};

module.exports = {
  dbConnection,
};
