const slugify = require("slugify");
const Category = require("../models/categoryModel");

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
};

// @desc Get Specific category by id
// @route GET /api/v1/categories/:id
// @access public

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
};

// @desc Create Category
// @route POST /api/v1/categories
// @access  Private
exports.createCategory = async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
};

// @desc Update Specific Category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
};

// @desc Delete Specific Category
// @route DELETE /api/v1/categories/:id

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.status(204).send();
};
