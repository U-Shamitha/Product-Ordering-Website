const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  deleteOwnAccountByUser,
  modifyOwnDetailsByUser,
  getOwnDetailsByUser,
} = require("../controllers/userController");
const {
  signupValidation,
  loginValidation,
  modifyUserDetailsValidation
} = require("../middlewares/validationMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Uesr Signup
router.post("/signup", signupValidation, userSignup);

// User Login
router.post("/login", loginValidation, userLogin);

// Route for users to view their own details
router.get("/", authenticateToken, getOwnDetailsByUser);

// Route for users to modify their own details
router.patch("/", authenticateToken, modifyUserDetailsValidation, modifyOwnDetailsByUser);

// Route for users to delete their account
router.delete("/", authenticateToken, deleteOwnAccountByUser);

module.exports = router;
