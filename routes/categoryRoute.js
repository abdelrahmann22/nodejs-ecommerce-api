const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");
const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, validatorMiddleware, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, validatorMiddleware, getCategory)
  .put(updateCategoryValidator, validatorMiddleware, updateCategory)
  .delete(deleteCategoryValidator, validatorMiddleware, deleteCategory);
module.exports = router;
