const express = require("express");
const router = express.Router();

// Controllers
const { 
    register, 
    login 
} = require("../controllers/auth.controller");

// Routes
router.post("/register", register);

router.post("/login", login);

module.exports = router;