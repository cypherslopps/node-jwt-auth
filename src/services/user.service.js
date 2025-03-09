const client = require("../database/connection.js");

async function createUser(email, password) {
    const response = await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, password]
    );
    
    return response.rows[0];
}

async function findUser(email) {
    const response = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return response.rows.length ? response.rows[0] : null;
}

module.exports = {
    createUser,
    findUser
};