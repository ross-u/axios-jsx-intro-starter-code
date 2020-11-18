require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const erv = require("express-react-views");
const authRouter = require("./routes/authRouter");
const siteRouter = require("./routes/siteRouter");

const app = express();

const DB_NAME = "your-database-name";

// DB CONNECTION
mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DB."))
  .catch((err) => console.log(err));

// VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/auth", authRouter);
app.use("/", siteRouter);

/* GET home page. */
app.get("/", (req, res, next) => {
  res.render("Home");
});

module.exports = app;
