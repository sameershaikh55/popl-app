const multer = require("multer");
const ErrorHandler = require("./errorhandler");
const path = require("path");

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new ErrorHandler("Please upload a valid image file", 422));
        }
        cb(undefined, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "../../" + "public/virtualBackground"));
        },
        filename: (req, file, cb) => {
            req.body.picture =
                req.params.id + "-vb" + `.${file.mimetype.split("/").pop()}`;

            cb(null, req.body.picture);
        },
        onerror: (err, next) => {
            console.log(err);
            next();
        },
    }),
});

module.exports = upload;
