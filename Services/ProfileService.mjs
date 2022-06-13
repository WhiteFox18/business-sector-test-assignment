import ProfileModel from "./Models/ProfileModel.mjs";
import {paginate} from "../modules/helpers/index.mjs";
import UserModel from "./Models/UserModel.mjs";
import Errors from "../modules/errors/index.mjs";

const ProfileService = {
    listProfiles: async (offset) => {
        try {
            return paginate(
                await ProfileModel.listProfiles(offset)
            )
        } catch (e) {
            throw e;
        }
    },
    getOne: async (id) => {
        try {
            return await UserModel.getOneById(id)
        } catch (e) {
            throw e;
        }
    },
    updateOne: async ({id, name, surname, email, sex, image}) => {
        try {
            const user = await UserModel.getOneById(id)

            if(!user)
                Errors.notExists(["id"])

            const userByEmail = await UserModel.getOneByEmail(user.email)

            if(userByEmail.id !== user.id)
                Errors.alreadyExists(["email"])

            await UserModel.updateOne({id, name, surname, email, sex, image})

            return await UserModel.getOneById(id)
        } catch (e) {
            throw e;
        }
    }
}

export default ProfileService