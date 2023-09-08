const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

//all router use here
const userRoute = require("./routes/userRoute");
const teamRoute = require("./routes/TeamRoute");
const taskRoute = require("./routes/taskRoute");
const error = require("./middleware/error");

app.use("/api/v1", userRoute);
app.use("/api/v1", teamRoute);
app.use("/api/v1", taskRoute);

//Error handling
app.use(error);

module.exports = app;
