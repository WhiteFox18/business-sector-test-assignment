import mysql  from "mysql2"
import config from "../config.mjs";

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
})

export default connection