const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const AppError = require("./utils/appError.js");
const dbConnection = require("./config/db.js");
const categoryRoute = require("./routes/categoryRoute.js");
const globalError = require("./middlewares/errorMiddleware.js");

// Connect with db
dbConnection();

// Express app
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node: ${process.env.NODE_ENV}`);
}
// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use((req, res, next) => {
  next(new AppError(`Can't find this route: ${req.originalUrl}`, 400));
});
// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down!");
    process.exit(1);
  });
});
