var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
var moment = require("moment");
var cors = require("cors");
var helmet = require("helmet");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const BaseResponse = require("./entity/base-response");
const Config = require("./entity/config");
const corsOptions = require("./public/jsonnate/cors.json");
const prefix = "/api/v1/";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(cors(corsOptions));
app.use(helmet());

app.use("/", indexRouter);
app.use(`${prefix}users`, usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(moment().format());
  console.error(`[${req.method}] ${req.originalUrl}`);
  console.error(req.headers);
  console.error(req.body);
  console.error(err);

  res
    .status(500)
    .send(
      new BaseResponse(
        new Config().env === "development" ? err : {},
        new Config().env === "development"
          ? err.message
          : "Something wrong, please try again later!",
        500,
        false
      )
    );
});

module.exports = app;
