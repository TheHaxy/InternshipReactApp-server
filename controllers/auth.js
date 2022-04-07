const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const keys = require("../config/keys")
const errorHandler = require("../utils/errorHandler")

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Password entered incorrectly"
            })
        }
    } else {
        res.status(404).json({
            message: "No such user exists"
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            message: "This email has already been taken."
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            description: "",
            image: req.body.image
        })

        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}