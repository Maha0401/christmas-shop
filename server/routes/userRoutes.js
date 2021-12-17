const router = require('express').Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const knex = require('knex')(require('../knexfile').development);

let users = [];

knex('user')
.then((data) => { 
    users = data;
})
.catch((err) =>
    console.log(`Error retrieving users: ${err}`)
);

//http://localhost:8080/user/current
//Headers - Authorization: Bearer token
router.get('/current', authorize, (req, res) => {
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    // find the user from users using username from the token
    const foundUser = users.find(user => user.userName === usernameFromToken);
    
    if (!foundUser) {
        return res.status(400).json({
            message: "Unable to find user"
        })
    }

    // send back full user data 
    return res.status(200).json({
        username: foundUser.userName,
    })
});

//http://localhost:8080/user/login 
//req body - {"username": "jonaruser","password": "jonaruser"}
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({
            message: "Login requires username and password fields"
        })
    }

    // username and password are provided
    const foundUser = users.find(user => user.userName === username);

    if (!foundUser) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // we are guaranteed to have the user here
    // Validate password matches user's password
    if (foundUser.password !== password) {
        // invalid password, return response
        return res.status(400).json({
            message: "Invalid Credentials, password does not match"
        })
    }

    // it is a valid password at this point, 
    // create and return JWT
    const token = jwt.sign(
        // 1. payload
        { username: username },
        // 2. secret key
        process.env.JWT_SECRET_KEY,
    );

    res.json({ 
        message: "Successfully logged in",
        token: token 
    });
});

module.exports = router;