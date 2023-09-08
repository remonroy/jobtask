const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./config/databaseConnection");
const cloudinary = require("cloudinary");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Unhandled Uncaught Exception");
  process.exit(1);
});

//config file add here
dotenv.config({ path: "./config/config.env" });

//Database connect here
databaseConnection();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//server is running here
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
//Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Unhandled Promise Rejections");

  server.close(() => {
    process.exit(1);
  });
});
