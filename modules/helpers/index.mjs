import CustomError from "../errors/CustomError.mjs";
import Errors from "../errors/index.mjs";
import fs from "fs";
import path from "path";
import {MulterError} from "multer";

// Error handling function for
export const errorHandling = async (err, req, res, next) => {
    try {
        if(err instanceof MulterError) {
            if(err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.status(400).json({
                    error: {
                        type: "imageType",
                        description: "only png and jpg allowed",
                        fields: []
                    }
                })
            } else if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    error: {
                        type: "imageSizeTooLarge",
                        description: "max image size is 10mb",
                        fields: []
                    }
                })
            }
        }

        if (!(err instanceof CustomError))
            Errors.unexpectedServerError()

        res.status(err.statusCode).json({
            error: {
                type: err.message,
                description: err.description,
                fields: err.fields
            }
        })
    } catch (error) {
        res.status(500).json({
            "error": {
                "type": "unexpectedServerError",
                "description": ["unexpected server error occurred"],
                "fields": []
            }
        });
    }
}

// To format array of items from database query result into object with count and items
export const paginate = (result) => {
    if (Array.isArray(result)) {
        let count = 0;
        result.forEach((item) => {
            if (item.count) {
                if (count === 0) count = item.count;
                delete item.count;
            }
        });
        return {
            count,
            items: result,
        };
    }
    return result;
};

// Check if database query result has data if no, fire 404 error
export const checkQueryResultNoData = (data) => {
    try {
        if (!data)
            if (!Array.isArray(data))
                Errors.notExists([])

        return data
    } catch (e) {
        throw e;
    }
}

export const createImagesFolder = () => {
    if (!fs.existsSync(path.join(path.resolve(), "..", "images"))) {
        fs.mkdirSync(path.join(path.resolve(), "..", "images"));
    }
};

export const getOffset = (page) => {
    return (Number(page) - 1) * 10;
};

export const getRowsFromDBQueryResult = (data) => {
    const [rows] = data

    return rows
}

export const getOneRowFromDBQueryResult = (data) => {
    const [rows] = data

    return rows[0]
}