const multer = require("multer");
const path = require("path");
const { NewID } = require("./uuid");
const { generateDate } = require("./Date");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, process.env.MULTER_IMAGE_PATH)); // Specify the destination path
  },
  filename: function (req, file, cb) {
    // Generate the unique file name
    const getFileName = `${generateDate()}-${NewID()}.png`;

    cb(null, getFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
