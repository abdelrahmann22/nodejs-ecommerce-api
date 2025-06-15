const express = require("express");
const categoryRouter = require("./categoryRoute");
const subCategoryRouter = require("./subCategoryRoute");
const brandRouter = require("./brandRoute");

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/subcategories", subCategoryRouter);
router.use("/brands", brandRouter);

module.exports = router;
