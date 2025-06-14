const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const router = express.Router();

router
  .route("/")
  .get(asyncHandler(getCategories))
  .post(asyncHandler(createCategory));
router
  .route("/:id")
  .get(asyncHandler(getCategory))
  .put(asyncHandler(updateCategory))
  .delete(asyncHandler(deleteCategory));
module.exports = router;
