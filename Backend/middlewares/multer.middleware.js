const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
        // Create a unique filename to prevent overwrites
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Update the multer middleware to handle dynamic field names
const upload = multer({ 
    storage,
    fileFilter: function(req, file, cb) {
        // Accept any field that contains [photo] or [id_card]
        if (file.fieldname.includes('[photo]') || file.fieldname.includes('[id_card]')) {
            cb(null, true);
        } else {
            cb(new Error('Unexpected field'), false);
        }
    }
});

module.exports = upload;