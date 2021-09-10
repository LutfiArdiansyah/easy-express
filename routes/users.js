var express = require("express");
const { query } = require("express-validator");
var router = express.Router();
var UserController = require("../controllers/user-controller");
const Validator = require("../utils/validator");

/* GET users listing. */
router
  .get(
    "/",
    Validator.validate([query("limit").isNumeric()]),
    UserController.get
  )
  .get("/:id", Validator.uuid, UserController.getById);

module.exports = router;
