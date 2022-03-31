const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './storage/images/user',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileUpload = multer({
    storage: storage,
    limits: {
        fileSize:  2 * 1024 * 1024, //2mb,
        fileFilter:"jpg"
    }
})




const multerErrHandler = (err, req, res, next)=>{
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }

    next()
}

//fileUpload(multerErrHandler())

module.exports = {fileUpload, multerErrHandler};