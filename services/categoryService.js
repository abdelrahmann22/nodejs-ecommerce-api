const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const QueryBuilder = require("../utils/queryBuilder");

/**
 * @desc Get list of categories
 * @route GET /api/v1/categories
 * @access Public
 */
exports.getCategories = asyncHandler(async (req, res) => {
  // Build query
  const query = new QueryBuilder(Category.find(), req.query)
    .filter()
    .search(["name"]) // Search in category name
    .sort()
    .limitFields()
    .paginate();

  // Execute
  const categories = await query.mongooseQuery;

  res.status(200).json({
    results: categories.length,
    page: query.pagination.page,
    data: categories,
  });
});

/**
 * @desc Get Specific category by id
 * @route GET /api/v1/categories/:id
 * @access public
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new AppError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc Create Category
 * @route POST /api/v1/categories
 * @access  Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 * @desc Update Specific Category
 * @route PUT /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new AppError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc Delete Specific Category
 * @route DELETE /api/v1/categories/:id
 * @access Private
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new AppError(`No category for this id ${id}`, 404));
  }
  res.status(204).send();
});
