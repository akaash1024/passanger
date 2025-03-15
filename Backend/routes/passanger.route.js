const passangerController = require("../controllers/passanger.controller")
const upload = require("../middlewares/multer.middleware");

const passangerRouter = require("express").Router()




const passangerAttachment = upload.fields([
    { name: /passengers\[\d+\]\[photo\]/, maxCount: 20 },  // Allow up to 20 passenger photos
    { name: /passengers\[\d+\]\[id_card\]/, maxCount: 20 } // Allow up to 20 passenger ID cards
]);


const alternativePassangerAttachment = upload.any();

passangerRouter
    .route("/add")
    .post(alternativePassangerAttachment, passangerController.addPassanger);

passangerRouter.
    route("/").
    get(passangerController.getPassanger)



module.exports = passangerRouter