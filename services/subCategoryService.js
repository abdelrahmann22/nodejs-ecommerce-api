const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const SubCategory = require("../models/subCategoryModel");

// @desc Get list of categories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  let filter = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };

  const categories = await SubCategory.find(filter).skip(skip).limit(limit);

  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Create list of subcategories
// @route POST /api/v1/subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  if (!req.body.category && req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  const { name, category } = req.body;
  if (!category) {
    return next(new AppError(`This category not found id: ${id}`, 404));
  }
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
// @desc Get a subCategory
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await SubCategory.findById(id);
  if (!category) {
    return next(new AppError(`This category not found id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
// @desc Update subcategory
// @route PUT /api/v1/subcategories/:id
// @access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true },
  );

  if (!subCategory) {
    return next(new AppError(`This category not found id: ${id}`, 404));
  }
  res.status(201).json({ data: subCategory });
});
// @desc Delete subcategory
// @route DELETE /api/v1/subcategories/:id
// @access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new AppError(`This category not found id: ${id}`, 404));
  }
  res.status(201).send();
});
