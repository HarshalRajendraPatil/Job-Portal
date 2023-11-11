// Requiring all the external packages and internal files
const express = require("express");
const authController = require("./../controller/authcontroller");
const security = require("./../middleware/auth");

// Creating the router to handle routes
const router = express.Router();

// Route for,
// "/api/signup"
router.post("/signup", authController.signup);

// "/api/signin"
router.post("/signin", authController.signin);

// "/api/logout"
router.get("/logout", authController.logout);

// "/api/me"
router.get("/me", security.isAuthenticated, authController.profile);

module.exports = router;
