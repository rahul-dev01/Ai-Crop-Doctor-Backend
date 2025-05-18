const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const register = async (req, res) => {
    try {
        let { first_name, last_name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log(`Attempted registration with existing email: ${email} and user id is : ${existingUser.id}`)
            return res.status(400).json({ error: "User already exits" })

        }
        

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ first_name, last_name, email, password: hashPassword })
        await newUser.save()

        res.status(201).json({ message: "User Resister successfully" })
        console.log(`New user register with id : ${newUser._id}` )

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid email and password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(200).json({
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }
        })

        console.log(`User is login wiht id : ${user.id}` )

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { register, login }