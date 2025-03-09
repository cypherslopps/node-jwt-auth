const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes Imports
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");

// Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const psql = require("./database/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// PSQL Configuration
psql
    .connect()
    .then(() => {
        console.log("Connected to PostgresSQL database");
    })
    .catch((err) => {
        console.error("Error connectiong to PostgresSQL database", err);
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
