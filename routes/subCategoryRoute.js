const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, validatorMiddleware, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, validatorMiddleware, getSubCategory)
  .put(updateSubCategoryValidator, validatorMiddleware, updateSubCategory)
  .delete(deleteSubCategoryValidator, validatorMiddleware, deleteSubCategory);
module.exports = router;
