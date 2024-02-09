const ApiError = require("../utils/ApiError");
const path = require('path');

// Check file exists
const filePayloadExists = (req, res, next) => {
    if(!req.files && !req.body.uploadedFile){
        return next(ApiError.badRequest('No file uploaded'))
    }
    next();
}
// Check file size
const fileSizeLimiter = (req, res, next) => {
    const MB = 5;
    const FILE_SIZE_LIMIT = MB * 1024 * 1024;

    if(req.files){
        const file = req.files.image;
        if(file.size > FILE_SIZE_LIMIT){
            return next(ApiError.tooLarge('File is over the size limit'))
        }
    }
    next();
}

// Check file extension
const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        if(req.files){
            const file = req.files.image;
            const fileExtension = path.extname(file.name)

            const allowed = allowedExtArray.includes(fileExtension);
            if(!allowed){

                return next(ApiError.cannotProcess('Extension type not permitted'))
            }
        }
        next();
    }
}

const filePolicy = {
    filePayloadExists,
    fileSizeLimiter,
    fileExtLimiter
}

module.exports = filePolicy