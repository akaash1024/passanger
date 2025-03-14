const User = require("../models/user.models")

const register = async (req, res, next) => {
    const { email, password, name } = req.body
    try {


        const isUserExit = await User.findOne({ email })
        if (isUserExit) {
            return res.status(400).json({
                success: false,
                message: "User is already registered with us."
            })
        }

        const newUser = await User.create({ email, password, name })

        const userDetails = {
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
        }


        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            userDetails
        })


    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    const { email, password } = req.body
    try {

        const isUserExit = await User.findOne({ email })

        console.log("User AKash", isUserExit);
        
        if (!isUserExit) {
            return res.status(400).json({
                success: false,
                message: "Not registered with us yet.. ."
            })
        }


        const isValidPassword = isUserExit.comparePassword(password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const userDetails = {
            token: await isUserExit.generateToken(),
            userId: isUserExit._id.toString(),
        }

        return res.status(201).json({
            success: true,
            message: "Login Successful",
            userDetails
        })


    } catch (error) {
        next(error)
    }
}





module.exports = { register, login }