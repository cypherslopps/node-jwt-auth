const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUser
} = require("../services/user.service");

/**
 * @dev Registers new user
 * @param { payload } email  
 * @param { payload } password
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(301).send("Email and password must be provided.");
        }

        const doesUserExist = await findUser(email);
        
        if (doesUserExist) {
            res.status(400).json({
                message: "User already exists"
            });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await createUser(email, hashedPassword);

        res.status(200).json({
            user: user.email,
            message: "Successful"
        });
    } catch (err) {
        console.error(err);
    }
};

/**
 * @dev Login user if user exists
 * @param { payload } email  
 * @param { payload } password
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(301).send("Email and password must be provided.");
        }

        const user = await findUser(email);
        
        if (!user) {
            res.status(400).json({
                message: "Invalid credentials"
            });
        } 

        const isPasswordEquallyMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordEquallyMatched) {
            res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = await jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_ACCESS_TOKEN, 
            { expiresIn: "1h" }
        );
        const refreshToken = await jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_ACCESS_TOKEN
        );
        
        res.json({ token, refreshToken });
    } catch (err) {
        res.status(500).send("Server Error");
    }
} 

module.exports = {
    register,
    login,
}