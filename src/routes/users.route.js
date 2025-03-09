const express = require("express");
const router = express.Router();

// Controllers
const { 
    getUser
} = require("../controllers/user.controller");

// Middleware
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/me", verifyToken, getUser);

module.exports = router;