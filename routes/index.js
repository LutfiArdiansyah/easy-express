var express = require("express");
var router = express.Router();
var IndexController = require("../controllers/index-controller");

/* GET home page. */
router
  .get("/", IndexController.index)
  .get("/test_connection", IndexController.testConnection);

module.exports = router;
