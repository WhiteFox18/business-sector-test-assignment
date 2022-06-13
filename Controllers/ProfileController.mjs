import ProfileService from "../Services/ProfileService.mjs";
import {getOffset} from "../modules/helpers/index.mjs";

const ProfileController = {
    listProfiles: async (req, res, next) => {
        try {
            res.json(
                await ProfileService.listProfiles(getOffset(req.query.page))
            )
        } catch (e) {
            next(e)
        }
    },
    getOne: async (req, res, next) => {
        try {
            res.json(
                await ProfileService.getOne(req.params.id)
            )
        } catch (e) {
            next(e)
        }
    },
    updateOne: async (req, res, next) => {
        try {
            res.json(
                await ProfileService.updateOne({
                    id: req.params.id,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    sex: req.body.sex,
                    image: req.file.filename
                })
            )
        } catch (e) {
            next(e)
        }
    },
}

export default ProfileController