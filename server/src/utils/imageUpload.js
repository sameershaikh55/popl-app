const multer = require("multer");
const { ObjectId } = require("mongodb");
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
      cb(null, path.resolve(__dirname, "../../" + "public/images"));
    },
    filename: (req, file, cb) => {
      if (req.params.id) {
        req.body.cardDP =
          req.params.id + "-dp" + `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.cardDP);
      } else {
        req.body._id = new ObjectId();
        req.body.cardDP =
          req.body._id.toString() +
          "-dp" +
          `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.cardDP);
      }
    },
    onerror: (err, next) => {
      console.log(err);
      next();
    },
  }),
});

module.exports = upload;
