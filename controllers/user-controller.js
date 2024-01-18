var models = require("../models");
var BaseResponse = require("../class/base-response");
const BaseRequest = require("../class/base-request");
const bcrypt = require("bcrypt");
const moment = require("moment");

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

  async post(req, res, next) {
    try {
      const user = req.body;
      user.token = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, user.token);
      res.json(new BaseResponse(await models.user.create(req.body)));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const user = await models.user.findByPk(req.params.id);
      user.deleted = true;
      user.deletedDatetime = moment().format("YYYY-MM-DD hh:mm:ss.000 ZZ");
      res.status(204).json(new BaseResponse(await user.save(user)));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
