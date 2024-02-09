// ROLE: Upload the requst file to /uploads folder
const ApiError = require('../utils/ApiError')
const debugWRITE = require('debug')('app:write')
const path = require('path')

const fileServerUpload = (req, res, next) => {
    // CHECK IF A FILE HAS BEEN UPLOADED
    if(req.files){
      // 1. STORE THE FILE IN LOCAL VARIABLE
      const file = req.files.image
      debugWRITE(`Image for server processing: ${file.name}`);
  
      // 2. APPEND UNIQUE FILE ID
      const filename = Date.now() + '_' + file.name;
      debugWRITE(`Unique Filename: ${filename}`);
  
      // 3. DECLARE SERVER STORAGE DIRECTORY PATH
      const uploadPath = path.join(
        __dirname,
        '../../public/uploads/',
        filename
      );
  
      // 4. MOVE THE FILE TO DIRECTORY
      file
      .mv(uploadPath)
      .then(() => {
        console.log(`Server Upload Successful: ${uploadPath}`);
        res.locals.filename = filename;
        next();
      })
      .catch(err => {
        if(err) return next(ApiError.internal('Your file request could not be processed at this time', err));
      })
    } else {
      next();
    }
  }
  
  module.exports = fileServerUpload;