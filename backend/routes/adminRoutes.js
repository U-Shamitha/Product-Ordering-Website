const express = require("express");
const router = express.Router();
const { adminSingup, getAllUsersByAdmin, deleteUserByAdmin, modifyUserDetailsByAdmin, adminLogin, getOwnDetailsByAdmin, modifyOwnDetailsByAdmin, deleteOwnAccountByAdmin } = require("../controllers/adminController");
const { loginValidation, signupValidation, modifyUserDetailsValidation, validateUserId } = require("../middlewares/validationMiddleware");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

// Route for creating admin accounts
router.post("/signup", signupValidation, adminSingup);

// Route for admin Login
router.post("/login", loginValidation, adminLogin);

// Route for admins to view all user details
router.get("/users", authenticateToken, isAdmin, getAllUsersByAdmin);

// Route for admins to modify any user details
router.patch("/user/:userId", authenticateToken, isAdmin, validateUserId, modifyUserDetailsValidation, modifyUserDetailsByAdmin);

// Route for admins to delete any user account
router.delete("/user/:userId", authenticateToken, isAdmin, validateUserId, deleteUserByAdmin);

//Route for admin to view thier own details
router.get("/", authenticateToken, isAdmin, getOwnDetailsByAdmin);

//Route for admin to modify thier own details
router.patch("/", authenticateToken, isAdmin, modifyUserDetailsValidation, modifyOwnDetailsByAdmin);

//Route for admin to delete thier account
router.delete("/", authenticateToken, isAdmin, deleteOwnAccountByAdmin);


module.exports = router;
