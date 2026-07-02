class ApiError extends Error {
  constructor(statusCode = 500, message = "Internal Server Error") {
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;