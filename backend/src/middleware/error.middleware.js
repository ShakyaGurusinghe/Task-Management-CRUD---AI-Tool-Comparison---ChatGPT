export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate key error",
      details: err.keyValue
    });
  }

  const payload = {
    success: false,
    message: err.message || "Server error"
  };

  if (err.details) payload.details = err.details;

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
}