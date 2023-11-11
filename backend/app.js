// Requiring all the external packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Requiring all the internal files
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Creating the instance of express
const app = express();

// Connecting to the database
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection successfull");
  });

// Setup for external middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// App routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// Setup for internal middleware
app.use(errorHandler);

// Getting the port number
const port = process.env.PORT || 8080;

// Starting the port
app.listen(port, () => {
  console.log("Server running on port " + port);
});
