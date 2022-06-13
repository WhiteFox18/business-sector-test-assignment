import fs from "fs";
import path from "path";

const ImageController = {
    getImage: async (req, res, next) => {
        try {
            let pathToFile = path.join(path.resolve(), "..", "images", req.params.filename)

            if(fs.existsSync(pathToFile)) {
                return res.sendFile(pathToFile)
            } else {
                return res.status(404)
            }
        } catch (e) {
            next(e)
        }
    }
}

export default ImageController