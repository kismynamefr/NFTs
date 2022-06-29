var createError = require('http-errors');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
var express = require("express");
const logger = require("morgan");
require('dotenv').config();

// var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

var collectionRouter = require("./routes/collection");
var collectionBSCRouter = require("./routes/collectionBSC");
var itemRouter = require("./routes/item");
var userRouter = require("./routes/user");

// catch 404 and forward to error handler
app.use("/collections", collectionRouter);
app.use("/collectionBSC", collectionBSCRouter);
app.use("/items", itemRouter);
app.use("/users", userRouter);

// error handler
const PORT = process.env.PORT || 9999;
mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

// module.exports = app;
