// Function for checking if the user is logged in or not
const User = require("./../models/userModel");
const ErrorResponse = require("./../utils/errorResponse");

// Function for Registering the user
exports.signup = async (req, res, next) => {
  // Checking if the email and password is entered
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new ErrorResponse("Please enter you email and password correctly", 400)
    );

  // Checking if the email entered is already registered
  const userExits = await User.findOne({ email });
  if (userExits)
    return next(new ErrorResponse("Email already registered", 400));

  try {
    // Creating the user based on the data entered
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Function for logging the user
exports.signin = async (req, res, next) => {
  // Checking if the email and password is entered
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return next(
        new ErrorResponse("Please enter you email and password", 403)
      );

    // Handling the error if the credentails entered are incorrect
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorResponse("Invalid Credentials", 400));
    const isMatched = await user.comparePassword(password);
    if (!isMatched) return next(new ErrorResponse("Invalid Credentials", 400));

    // Signing the token and confirming that the user is logged in
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Function for getting the jwt token and sending the response
const sendTokenResponse = async (user, codeStatus, res) => {
  // Getting the token from the creted document
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      token,
      user,
    });
};

// Function for logging out the user
exports.logout = (req, res, next) => {
  // Clearing the cookie and sending back the response to the user
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Successfully logged out",
  });
};

// Function for getting the profile of the user
exports.profile = async (req, res, next) => {
  // Finding the user by its id and deselecting the password field
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
