var express = require("express");
var router = express.Router();
var UserController = require("../controllers/user-controller");

/* GET users listing. */
router.get("/", UserController.get);

module.exports = router;
