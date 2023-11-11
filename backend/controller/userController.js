// Function for checking if the user is logged in or not
const User = require("./../models/userModel");
const ErrorResponse = require("./../utils/errorResponse");

// Function for getting all the users
exports.allUsers = async (req, res, next) => {
  // Implementing pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find().estimatedDocumentCount();

  try {
    // Getting all the users
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      totalPage: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Function for getting the single user
exports.singleUsers = async (req, res, next) => {
  try {
    // Finding user based on the id entered
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Function for updating the user
exports.editUsers = async (req, res, next) => {
  try {
    // Finding the user based on id and updating it
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Function for deleting the user
exports.deleteUsers = async (req, res, next) => {
  try {
    // Finding the user base and its id and deleting it.
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
    next();
  } catch (error) {
    return next(error);
  }
};
