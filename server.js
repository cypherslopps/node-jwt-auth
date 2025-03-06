const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const psql = require("./database/connection");

// Generate JWT
app.post("/user/generateToken", asyncHandler(async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        time: Date.now(),
        userId: 12
    };
    const { data: response } = await axios("https://jsonplaceholder.typicode.com/todos/1");

    const token = jwt.sign(data, jwtSecretKey);
    res.status(200).json({
        token
    });
}));

app.get("/user/validateToken", (req, res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        
        if (verified) {
            res.status(200).send("Successfully Verified"); 
        } else {
            res.status(401).send("An error occured");
        }
    } catch(err) {
        res.status(401).send(err);
    }
});

// PSQL Configuration
psql
    .connect()
    .then(() => {
        console.log("Connected to PostgresSQL database");
    })
    .catch(err => {
        console.error("Error connectiong to PostgresSQL database", err);
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
