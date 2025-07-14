const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const QueryBuilder = require("../utils/queryBuilder");
const Product = require("../models/productModel");

/**
 * @desc    Fetch all products from database with pagination support
 * @route   GET /api/v1/products
 * @access  Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
  // Build
  const query = new QueryBuilder(Product.find(), req.query)
    .filter()
    .search(["title", "description"])
    .sort()
    .limitFields()
    .paginate();

  // Execute
  const products = await query.mongooseQuery;

  res.status(200).json({
    result: products.length,
    page: query.pagination.page,
    data: products,
  });
});

/**
 * @desc    Fetch a specific product from database by its ID
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) return next(new AppError(`No product for this id: ${id}`));
  res.status(200).json({ data: product });
});

/**
 * @desc    Create a new product in the database
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

/**
 * @desc    Update a product in the database by ID
 * @route   PUT /api/v1/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) return next(new AppError(`No product for this id: ${id}`));
  res.status(201).json({ data: product });
});

/**
 * @desc    Delete a product from the database by ID
 * @route   DELETE /api/v1/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new AppError(`No product for this id: ${id}`));
  res.status(204).send();
});
