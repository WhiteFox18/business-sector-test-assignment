import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import {queryParser} from "express-query-parser";
import routes from "./routes/index.mjs";
import {createImagesFolder, errorHandling} from "./modules/helpers/index.mjs";

createImagesFolder();

const app = express()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
)

// Routes
app.use("/", routes)

// Error Handling
app.use(errorHandling)

export default app