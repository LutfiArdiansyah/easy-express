var models = require("../models");
var BaseResponse = require("../entity/base-response");
const Config = require("../entity/config");
const BaseRequest = require("../entity/base-request");

class UserController {
  async get(req, res, next) {
    try {
      const baseRequest = new BaseRequest(req.query);

      const datas = await models.user.findAndCountAll({
        where: baseRequest.where,
        offset: baseRequest.offset,
        limit: baseRequest.limit,
        order: baseRequest.sorts,
      });

      res.json(
        new BaseResponse(
          datas.rows,
          "List users.",
          200,
          true,
          datas,
          baseRequest.pages
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      res.json(new BaseResponse(await models.user.findByPk(req.params.id)));
    } catch (error) {
      next(error);
    }
  }

  async post(req, res, next) {}
}

module.exports = new UserController();
