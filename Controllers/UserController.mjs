import UserService from "../Services/UserService.mjs";

const UserController = {
    createOne: async (req, res, next) => {
        try {
            res.json(
                await UserService.createOne({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
            )
        } catch (e) {
            next(e)
        }
    },
    login: async (req, res, next) => {
        try {
            res.json(
                await UserService.login({
                    email: req.body.email,
                    password: req.body.password
                })
            )
        } catch (e) {
            next(e)
        }
    },
}

export default UserController