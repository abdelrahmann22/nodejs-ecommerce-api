const express = require("express");
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const validatorMiddleware = require("../middlewares/validatorMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(createBrandValidator, validatorMiddleware, createBrand);

router
  .route("/:id")
  .get(getBrandValidator, validatorMiddleware, getBrand)
  .put(updateBrandValidator, validatorMiddleware, updateBrand)
  .delete(deleteBrandValidator, validatorMiddleware, deleteBrand);

module.exports = router;
