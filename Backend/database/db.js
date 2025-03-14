const mongoose = require("mongoose");


const URI = process.env.MONGO_URL

const connectDB = async (req, res,) => {
    try {
        await mongoose.connect(URI);
        console.log(`Connected to database`);

    } catch (error) {
        console.log(`Failed to connect Database`);

    }
}


module.exports = connectDB;