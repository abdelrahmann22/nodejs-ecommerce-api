const { check } = require("express-validator");

exports.getCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid category id");

exports.createCategoryValidator = check("name")
  .notEmpty()
  .withMessage("Category required")
  .isLength({ min: 3 })
  .withMessage("Too short category name")
  .isLength({ max: 32 })
  .withMessage("Too long category name");

exports.updateCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid category id");

exports.deleteCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid category id");
