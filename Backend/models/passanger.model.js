const mongoose = require("mongoose")

const passangerSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contact: { type: Number, },
    email: { type: String },


    // TODO ::need to check 

    photo: { type: String, required: true },
    id_card: { type: String, required: true },
})





const Passanger = mongoose.model("Passanger", passangerSchema)


module.exports = Passanger;