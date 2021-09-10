const { validationResult } = require("express-validator");
const { validate } = require("uuid");

class Validator {
  async uuid(req, res, next) {
    if (!validate(req.params.id)) {
      next("Invalid UUID!");
    }
    next();
  }

  validate = (validations) => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      errors.message = "Validation fail!";
      next(errors);
    };
  };
}

module.exports = new Validator();
