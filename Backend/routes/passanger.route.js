const passangerController = require("../controllers/passanger.controller")
const upload = require("../middlewares/multer.middleware");

const passangerRouter = require("express").Router()




const passangerAttachment = upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "id_card", maxCount: 1 }
])
passangerRouter.
    route("/add").
    post(passangerAttachment, passangerController.addPassanger)

passangerRouter.
    route("/").
    get(passangerController.getPassanger)



module.exports = passangerRouter