const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { syncBD } = require("./config/syncDB");
const cors = require("cors");
const log = require("./logger/debug-logger");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const apiV1Router = require("./routes/api/v1/index");

// Init env variables
dotenv.config();

// Synchronize Sequelize DB Models
syncBD();

// Init Express
const app = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

//Test Error Handler
// app.use((req, res, next) => {
//   next({
//     status: 500,
//     message: "I don't know fam",
//     props: "Something went horribly wrong"
//   })
// })

// Routes
app.use("/", indexRouter);

// API V1
app.use("/api/v1", apiV1Router);

// Error Handlers
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  log({
    statusCode,
    ...err
  });

  if (process.env.NODE_ENV === "production") {
    if (statusCode === 500) {
      return res.status(statusCode).send({ message: "Internal Server Error" });
    }
  }

  return res
    .status(statusCode)
    .send({ statusCode, ...err });
});

module.exports = app;
