const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String },
    password: { type: String, }
})

userSchema.pre("save", async function () {
    const user = this;
    try {
        if (!user.isModified("password")) {
            return next()
        }

        const saltRound = await bcrypt.genSalt(5);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})


userSchema.methods.generateToken = function () {
    const user = this;
    try {
        token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email,
            },
            process.env.SECRET_KEY
        )

        return token;

    } catch (error) {
        next(error)
    }

}


userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(user.password, password)
}



const User = mongoose.model("User", userSchema)
module.exports = User