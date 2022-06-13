import {Router} from "express";
import {validate} from "../modules/middlewares/index.mjs";
import {body} from "express-validator";
import UserController from "../Controllers/UserController.mjs";

const router = Router()

router
    .post("/login",
        validate([
            body("email").isEmail(),
            body("password").trim().isString().isLength({min: 8}),
        ]),
        UserController.login)

    .post("/register",
        validate([
            body("name").trim().isString().isLength({min: 1}),
            body("email").isEmail(),
            body("password").isString().trim().isLength({min: 8}),
            body("confirm_password").isString().trim().isLength({min: 8})
                .custom((value, {req: {body: {password}}}) => value === password),
        ]),
        UserController.createOne)

export default router