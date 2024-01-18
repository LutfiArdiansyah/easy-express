var express = require("express");
const { query } = require("express-validator");
var router = express.Router();
var UserController = require("../controllers/user-controller");
const { validate, paramsUuid } = require("../utils/validator");
const { oauth2 } = require("../middleware/authentication");

/* GET users listing. */
router
  .get("/", validate([query("limit").isNumeric()]), oauth2, UserController.get)
  .get("/:id", paramsUuid, oauth2, UserController.getById)
  .post("/", oauth2, UserController.post)
  .delete("/:id", oauth2, UserController.delete);

module.exports = router;
