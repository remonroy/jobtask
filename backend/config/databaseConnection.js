const mongoose = require("mongoose");
const databaseConnection = () => {
  mongoose.connect(process.env.DATABASE).then((data) => {
    console.log(`database connect is=${data.connection.host}`);
  });
};
module.exports = databaseConnection;
