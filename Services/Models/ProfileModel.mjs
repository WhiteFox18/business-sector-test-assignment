import connection from "../../db/index.mjs";
import {getRowsFromDBQueryResult, paginate} from "../../modules/helpers/index.mjs";
import config from "../../config.mjs";

const ProfileModel = {
    listProfiles: async (offset) => {
        try {
            return getRowsFromDBQueryResult(
                await connection.promise().query(`
                    SELECT count(*) over ()                                          as count,
                           id,
                           name,
                           surname,
                           email,
                           sex,
                           CASE WHEN image IS NOT NULL THEN concat('${config.img_base_url}', image) END as image,
                           created_at
                    FROM user
                    ORDER BY created_at DESC
                    LIMIT 10 OFFSET ?
                `, [offset])
            )
        } catch (e) {
            throw e;
        }
    }
}

export default ProfileModel