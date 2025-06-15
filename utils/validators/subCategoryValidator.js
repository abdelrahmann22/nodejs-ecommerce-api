const { check } = require("express-validator");

exports.getSubCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid subcategory id");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
];

exports.updateSubCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid category id");

exports.deleteSubCategoryValidator = check("id")
  .isMongoId()
  .withMessage("Invalid category id");
