var express = require("express");
var router = express.Router();

const User = require("../models/User")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const isAuthenticated = require('../middleware/isAuthenticated')





router.post("/signup", (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "please fill out all fields" });
    }

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (foundUser) {
                return res.status(400).json({ message: "This email is already registerd" })
            } else {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPass = bcrypt.hashSync(req.body.password, salt);

                User.create({
                    password: hashedPass,
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                })
                .then((createdUser) => {
                    const payload = { _id: createdUser._id, email: createdUser.email, firstName: createdUser.firstName, lastName: createdUser.lastName };

                    const token = jwt.sign(payload, process.env.SECRET, {
                        algorithm: "HS256",
                        expiresIn: "24hr",
                    });

                    res.json({ token: token, _id: createdUser._id, message: `Welcome ${createdUser.firstName}` });
                })
                .catch((err) => {
                    res.status(400).json(err.message);
                })
            }
        })
})





router.post('/login', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(401).json({ message: "Email or Password are incorrect" })
            }

            const doesMatch = bcrypt.compareSync(
                req.body.password,
                foundUser.password
            );

            if (doesMatch) {
                const payload = {
                    _id: foundUser._id,
                    email: foundUser.email,
                    lastName: foundUser.lastName,
                    firstName: foundUser.firstName,
                    favoriteBooks: foundUser.favoriteBooks,
                    currentlyReading: foundUser.currentlyReading
                };

                const token = jwt.sign(payload, process.env.SECRET, {
                    algorithm: "HS256",
                    expiresIn: "24hr",
                });
                res.json({ _id: foundUser._id, token: token, message: `Welcome ${foundUser.firstName}` })
            } else {
                return res.status(402).json({ message: "Email or Password is incorrect" });
            }
        })
        .catch((err) => {
            console.log(err)
        })
})





router.get("/verify", isAuthenticated, (req, res) => {

    User.findOne({ _id: req.user._id })
        .populate('favoriteBooks')
        .populate('currentlyReading')
        .then((foundUser) => {
            const payload = { ...foundUser };
            delete payload._doc.password;

            res.status(200).json(payload._doc);
        })
        .catch((err) => {
            console.log(err)
        })
});





module.exports = router;