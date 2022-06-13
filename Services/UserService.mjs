import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "./Models/UserModel.mjs";
import config from "../config.mjs";
import Errors from "../modules/errors/index.mjs";

const UserService = {
    createOne: async ({name, email, password}) => {
        try {
            password = await bcrypt.hashSync(password, config.salt_rounds)

            await UserModel.createOne({name, email, password})

            return {
                message: "success"
            }
        } catch (e) {
            throw e;
        }
    },
    login: async ({email, password}) => {
        try {
            const user = await UserModel.getOneByEmail(email)

            if(!user) {
                Errors.notExists(["email"])
            } else if(! await bcrypt.compareSync(password, user.password)) {
                Errors.login()
            }

            const token = jwt.sign({
                user_id: user.id,
            }, config.jwt_secret)

            await UserModel.setToken({
                id: user.id,
                token: token
            })

            return {
                token: token,
                user_data: {
                    id: user.id,
                    sex: user.sex,
                    name: user.name,
                    surname: user.surname,
                    image: user.image
                },
            }
        } catch (e) {
            throw e;
        }
    }
}

export default UserService