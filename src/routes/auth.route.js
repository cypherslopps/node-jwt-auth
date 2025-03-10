const express = require("express");
const router = express.Router();

// Controllers
const { 
    register, 
    login,
    logout
} = require("../controllers/auth.controller");

// Middleware
const { verifyToken } = require("../middlewares/authMiddleware");

// Routes - Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", verifyToken, logout);

module.exports = router;