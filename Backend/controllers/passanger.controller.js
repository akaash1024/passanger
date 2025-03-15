const Passanger = require("../models/passanger.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const addPassanger = async (req, res, next) => {
    try {
        // Check if we have passenger data
        if (!req.body) {
            return res.status(400).json({ message: "No passenger data provided" });
        }

        // Handle multiple passengers
        const passengersData = [];
        let passengerCount = 0;
        
        // Determine how many passengers are being submitted
        while (req.body[`passengers[${passengerCount}][name]`] !== undefined) {
            passengerCount++;
        }

        if (passengerCount === 0) {
            return res.status(400).json({ message: "No valid passenger data found" });
        }

        // Process each passenger
        for (let i = 0; i < passengerCount; i++) {
            // Extract passenger data
            const passenger = {
                name: req.body[`passengers[${i}][name]`],
                age: req.body[`passengers[${i}][age]`],
                gender: req.body[`passengers[${i}][gender]`],
                contact: req.body[`passengers[${i}][contact]`],
                email: req.body[`passengers[${i}][email]`]
            };

            // Check for required fields
            if (!passenger.name || !passenger.age || !passenger.gender || !passenger.contact || !passenger.email) {
                return res.status(400).json({ message: `Missing required fields for passenger ${i + 1}` });
            }

            // Get file paths
            const photoFile = req.files?.photo?.find(file => 
                file.fieldname === `passengers[${i}][photo]`
            );
            
            const idCardFile = req.files?.id_card?.find(file => 
                file.fieldname === `passengers[${i}][id_card]`
            );

            if (!photoFile || !idCardFile) {
                return res.status(400).json({ 
                    message: `Both photo and ID card files are required for passenger ${i + 1}` 
                });
            }

            // Upload files to cloudinary
            const photo = await uploadOnCloudinary(photoFile.path);
            const id_card = await uploadOnCloudinary(idCardFile.path);

            if (!photo || !id_card) {
                return res.status(500).json({ 
                    message: `Failed to upload files for passenger ${i + 1}` 
                });
            }

            // Add the file URLs to passenger data
            passenger.photo = photo;
            passenger.id_card = id_card;
            
            passengersData.push(passenger);
        }

        // Save all passengers to database
        const savedPassengers = await Passanger.insertMany(passengersData);

        return res.status(201).json({ 
            message: "Passengers added successfully", 
            passengers: savedPassengers 
        });
    } catch (error) {
        console.error("Error adding passengers:", error);
        next(error);
    }
};

const getPassanger = async (req, res, next) => {
    try {
        const passangerList = await Passanger.find({})
        res.status(200).json({ success: true, passangerList })
    } catch (error) {
        next(error)
    }
}

module.exports = { addPassanger, getPassanger }