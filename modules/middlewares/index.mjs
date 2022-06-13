import {validationResult} from "express-validator";
import config from "../../config.mjs";
import Errors from "../errors/index.mjs";
import jwt from "jsonwebtoken";
import UserModel from "../../Services/Models/UserModel.mjs";

export const validate = (validations) => {
    return async (req, res, next) => {

        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const errorsArray = [];

        await errors.array().forEach(error => {
            if (!errorsArray.includes(error.param))
                errorsArray.push(error.param);
        });

        return res.status(400).json({
            error: {
                type: "validation",
                description: "validation",
                fields: errorsArray
            }
        });
    };
};

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.includes("Bearer"))
            Errors.notAuthenticated();

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            Errors.notAuthenticated()
        }

        try {
            res.locals = jwt.verify(token, config.jwt_secret);
        } catch (err) {
            Errors.notAuthenticated()
        }

        if (
            !await UserModel.checkToken({
                id: res.locals.user_id,
                token: token
            })
        )
            Errors.notAuthenticated()

        return next();
    } catch (e) {
        next(e)
    }
};