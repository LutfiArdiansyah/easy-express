var models = require("../models/index");
var BaseResponse = require("../entity/base-response");
var info = require("../public/jsonnate/info.json");
const Config = require("../entity/config");

class IndexController {
  index(req, res, next) {
    info.environment = new Config().env;
    res.json(new BaseResponse(info));
  }

  async testConnection(req, res, next) {
    try {
      await models.sequelize.authenticate();
      res.json(
        new BaseResponse(null, "Connection has been established successfully.")
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new IndexController();
