require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const express = require("express");
const authRouter = require("./routes/authRoute");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/globalErrorHandler");

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable your auth routes
app.use("/api/v1/auth", authRouter);

// AFTER all valid routes, add the 404 handler
app.use(
  catchAsync(async (req, res, next) => {
    throw new AppError(`can't find  ${req.originalUrl} on the server`, 404);
    // const error = new Error(`Route ${req.originalUrl} not found`);
    // error.statusCode = 404;
    // throw error;
  })
);

// Error handling middleware - must come last
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
