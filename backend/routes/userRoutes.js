// Requiring all the external packages and internal files
const express = require("express");
const userController = require("./../controller/userController");
const security = require("./../middleware/auth");

// Creating the router to handle routes
const router = express.Router();

// Route for,

// "/api/allusers"
router.get(
  "/allusers",
  security.isAuthenticated,
  security.isAdmin,
  userController.allUsers
);

// "/api/user/id"
router.get("/user/:id", security.isAuthenticated, userController.singleUsers);

// "/api/users/edit/id"
router.put(
  "/user/edit/:id",
  security.isAuthenticated,
  userController.editUsers
);

// "/api/admin/user/delete/id"
router.delete(
  "/admin/user/delete/:id",
  security.isAuthenticated,
  security.isAdmin,
  userController.deleteUsers
);

module.exports = router;
