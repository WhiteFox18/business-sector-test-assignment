import {Router} from "express";
import {validate} from "../modules/middlewares/index.mjs";
import {body, param} from "express-validator";
import uploadImage from "../modules/multer.mjs";
import ProfileController from "../Controllers/ProfileController.mjs";

const router = Router()

router
    .get("/:id",
        validate([
            param("id").isNumeric()
        ]),
        ProfileController.getOne)

    .put("/:id",
        uploadImage.single("image"),
        validate([
            param("id").isNumeric(),
            body("name").trim().isString().isLength({min: 1}),
            body("surname").trim().isString().isLength({min: 1}),
            body("sex").isNumeric().custom(value => value == 1 || value == 2),
            body("email").isEmail(),
        ]),
        ProfileController.updateOne)

export default router