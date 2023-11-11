// Requiring all the external packages and internal files
const User = require("./../models/userModel");
const ErrorResponse = require("./../utils/errorResponse");
const jwt = require("jsonwebtoken");

// Function for checking if the user is logged in or not
exports.isAuthenticated = async (req, res, next) => {
  // Getting the token from the request body
  const token = req.cookies.token;

  // Handling error when token is not found
  if (!token)
    return next(new ErrorResponse("NOT Authorized to access this route", 401));

  try {
    // Verifying if the token is valid or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // finding the user base on the token
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("NOT Authorized to access this route", 401));
  }
};

// Function for checking if the user is admin in or not
exports.isAdmin = async (req, res, next) => {
  // Handling the error when the user is not defined
  if (!req.user?.role === undefined)
    return next(new ErrorResponse("User does not exists", 400));

  // Getting the status of the user
  if (req.user?.role === 0) {
    return next(
      new ErrorResponse(
        "Access denied. You must me and admin to access this route",
        401
      )
    );
  }
  next();
};
