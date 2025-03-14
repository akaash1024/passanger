const Passanger = require("../models/passanger.model");
const uploadOnCloudinary = require("../utils/cloudinary");


const addPassanger = async (req, res, next) => {
    try {
        const { name, age, gender, contact, email } = req.body;

        // Extract files from req.files (since we're using upload.fields)
        const photoLocalPath = req.files?.photo?.[0]?.path;
        const idCardLocalPath = req.files?.id_card?.[0]?.path;

        console.log(photoLocalPath, idCardLocalPath);
        

        if (!photoLocalPath || !idCardLocalPath) {
            return res.status(400).json({ message: "Both photo and ID card files are required" });
        }

        // Upload files to Cloudinary
        const photo = await uploadOnCloudinary(photoLocalPath);
        const id_card = await uploadOnCloudinary(idCardLocalPath);

        if (!photo || !id_card) {
            return res.status(500).json({ message: "Failed to upload files" });
        }

        // Create and save passenger to MongoDB
        const newPassanger = await Passanger.create({
            name,
            age,
            gender,
            contact,
            email,
            photo,
            id_card,
        });

        return res.status(201).json({ message: "Passenger added successfully", passanger: newPassanger });
    } catch (error) {
        next(error);
    }
};




const getPassanger = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}


module.exports = { addPassanger, getPassanger }