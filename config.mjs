import dotenv from "dotenv"

dotenv.config()

const config = {
    salt_rounds: Number(process.env.SALT_ROUNDS),
    port: Number(process.env.PORT),
    jwt_secret: process.env.JWT_SECRET,
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE
    },
    img_base_url: process.env.IMG_BASE_URL
}

export default config