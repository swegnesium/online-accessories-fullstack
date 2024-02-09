const { bucket } = require('../config/db')
const debugBucket = require('debug')('app:bucket')
const uuid = require('uuid')
const fs = require('fs')
const config = require('../config/config')

module.exports = {
    async storageBucketUpload(filename){
        // GEN RANDOM UUID STORAGE TOKEN
        debugBucket(`Firestore Filename: ${filename}`)
        const storageToken = uuid.v4();

        // DECLARE FILEPATH & OPTIONS PARAMS FOR BUCKET UPLOAD
        const serverFilePath = `./public/uploads/${filename}`;
        const options = {
            destination: filename,
            resumeable: true,
            validation: 'crc32c',
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: storageToken
                },
            }
        }

        // CLOUD FIRESTORE UPLOAD CALL
        const result = await bucket.upload(serverFilePath, options)
        const bucketName = result[0].metadata.bucket;
        debugBucket(`Bucket Name: ${bucketName}`);

        // CONSTRUCT DL URL
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
        console.log(`File succesffuly uploaded: ${downloadURL}`)

        // DELETE TEMP FILE (can cause issues)
        fs.unlink(serverFilePath, error => {
            if(error){
                debugBucket(error);
                return({
                    message: 'Error occured in removing file from temporary local storage'
                })
            } else {
                debugBucket('File in temporary local storage: DELETED')
            }
        })

        return downloadURL;
    },

    // DELETE FROM STORAGE
    async deleteFileFromBucket(uploadedFile){
        const file = bucket.file(uploadedFile);
        const fileChecker = await file.exists()

        // 400 error
        if(fileChecker[0] === false){
            // ignoreNotFound = true means - ignore missing files ( false is default )
            const options = {
                ignoreNotFound: true,
            };

            const data = await file.delete(options)
            debugBucket(`The file ${uploadedFile} is not in storage, check server for data handling`)
            return data[0];

            // File does exists
        } else {
            const data = await file.delete();
            debugBucket(`File successfully delete from Storage: ${uploadedFile}`);
            return data[0];
        }
    },


    getFileFromUrl(downloadUrl){
        // remove front of the url string
        const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
        let fileGlob = downloadUrl.replace(baseURL, "")
    
        // remove end of url string
        const indexOfEndPath = fileGlob.indexOf("?");
        fileGlob = fileGlob.substring(0, indexOfEndPath);
    
        // retufn existing file glob
        debugBucket(`File is ready to be deleted: ${fileGlob}`)
        return fileGlob;
    }
}