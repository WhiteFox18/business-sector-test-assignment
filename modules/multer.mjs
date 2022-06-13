import multer, {MulterError} from "multer";
import path from "path";

const filename = (req, file, cb) => {
  cb(null, Date.now() + "_" + file.originalname);
};

const storage = multer.diskStorage({
  destination(req, file, cb)  {
    cb(null, "../images");
  },
  filename
});

const filterImage = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if(ext !== ".png" && ext !== ".jpg") {
    return cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
  }
  cb(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter: filterImage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default uploadImage;