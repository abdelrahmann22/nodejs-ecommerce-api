const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const QueryBuilder = require("../utils/queryBuilder");

const BrandModel = require("../models/brandModel");

/**
 * @desc Get list of brands
 * @route GET /api/v1/brands
 * @access Public
 */
exports.getBrands = asyncHandler(async (req, res) => {
  // Build query
  const query = new QueryBuilder(BrandModel.find(), req.query)
    .filter()
    .search(["name"]) // Search in brand name
    .sort()
    .limitFields()
    .paginate();

  // Execute
  const brands = await query.mongooseQuery;

  res.status(200).json({
    results: brands.length,
    page: query.pagination.page,
    data: brands,
  });
});

/**
 * @desc Create brand
 * @route POST /api/v1/brands
 * @access Private
 */
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 * @desc Get specific brand by id
 * @route GET /api/v1/brands/:id
 * @access Public
 */
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) return next(new AppError(`This brand id: ${id} not found`, 404));
  res.status(200).json({ data: brand });
});

/**
 * @desc Update specific brand
 * @route PUT /api/v1/brands/:id
 * @access Private
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) return next(new AppError(`This brand id: ${id} not found`, 404));
  res.status(200).json({ data: brand });
});

/**
 * @desc Delete specific brand
 * @route DELETE /api/v1/brands/:id
 * @access Private
 */
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) return next(new AppError(`This brand id: ${id} not found`, 404));
  res.status(204).send();
});
