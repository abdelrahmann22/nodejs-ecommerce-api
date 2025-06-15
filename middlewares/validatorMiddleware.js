// @desc Finds the validation errors in the request and wraps them in an object with handy function
const { validationResult } = require("express-validator");
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
