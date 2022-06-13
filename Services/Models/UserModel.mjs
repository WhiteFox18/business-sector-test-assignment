import {
    checkQueryResultNoData,
    getOneRowFromDBQueryResult,
} from "../../modules/helpers/index.mjs";
import connection from "../../db/index.mjs";
import config from "../../config.mjs";

const UserModel = {
    createOne: async ({name, email, password}) => {
        try {
            return await connection.promise().query(`
                INSERT INTO user(name, email, password)
                VALUES(?, ?, ?)
            `, [name, email, password])
        } catch (e) {
            throw e;
        }
    },
    getOneByEmail: async (email) => {
        try {
            return getOneRowFromDBQueryResult(
                await connection.promise().query(`
                    SELECT id,
                           name,
                           surname,
                           email,
                           password,
                           jwt_token,
                           sex,
                           created_at,
                           CASE WHEN image IS NOT NULL THEN concat('${config.img_base_url}', image) END as image
                    FROM user
                    WHERE email = ?
                `, [email])
            )
        } catch (e) {
            throw e;
        }
    },
    getOneById: async (id) => {
        try {
            return checkQueryResultNoData(
                getOneRowFromDBQueryResult(
                    await connection.promise().query(`
                        SELECT id,
                               name,
                               surname,
                               email,
                               sex,
                               created_at,
                               CASE WHEN image IS NOT NULL THEN concat('${config.img_base_url}', image) END as image
                        FROM user
                        WHERE id = ?
                    `, [id])
                )
            )
        } catch (e) {
            throw e;
        }
    },
    setToken: async ({id, token}) => {
        try {
            return await connection.promise().query(`
                UPDATE user
                SET jwt_token = ?
                WHERE id = ?
            `, [token, id])
        } catch (e) {
            throw e;
        }
    },
    checkToken: async ({id, token}) => {
        try {
            return getOneRowFromDBQueryResult(
                await connection.promise().query(`
                    SELECT id
                    FROM user
                    WHERE id = ? AND jwt_token = ?
                `, [id, token])
            )
        } catch (e) {
            throw e;
        }
    },
    updateOne: async ({id, name, surname, email, sex, image}) => {
        try {
            return await connection.promise().query(`
                UPDATE user
                SET name    = ?,
                    surname = ?,
                    email   = ?,
                    sex     = ?,
                    image   = ?
                WHERE id = ?
            `, [name, surname, email, sex, image, id])
        } catch (e) {
            throw e;
        }
    }
}

export default UserModel