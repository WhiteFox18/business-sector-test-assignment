import {Router} from "express";
import profile from "./profile.mjs";
import user from "./user.mjs";
import {validate, verifyToken} from "../modules/middlewares/index.mjs";
import ProfileController from "../Controllers/ProfileController.mjs";
import {param, query} from "express-validator";
import ImageController from "../Controllers/ImageController.mjs";

const router = Router()

router.get("/images/:filename",
    validate([
        param("filename").trim().isString().isLength({min: 1}),
    ]),
    ImageController.getImage)

router.use("/user", user)

router.use(verifyToken)

router.use("/profile", profile)

router
    .get("/profiles",
        validate([
            query("page").isNumeric().custom(value => Number(value) >= 1)
        ]),
        ProfileController.listProfiles)

export default router