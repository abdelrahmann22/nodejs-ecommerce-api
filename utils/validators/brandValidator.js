const { check } = require("express-validator");

exports.getBrandValidator = check("id")
  .isMongoId()
  .withMessage("Invalid brand id");

exports.createBrandValidator = check("name")
  .notEmpty()
  .withMessage("Brand name required")
  .isLength({ min: 2 })
  .withMessage("Too short brand name")
  .isLength({ max: 32 })
  .withMessage("Too long brand name");

exports.updateBrandValidator = check("id")
  .isMongoId()
  .withMessage("Invalid brand id");

exports.deleteBrandValidator = check("id")
  .isMongoId()
  .withMessage("Invalid brand id");
