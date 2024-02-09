const { db } = require('../config/db');
const ApiError = require('../utils/ApiError')
const { storageBucketUpload, deleteFileFromBucket, getFileFromUrl } = require('../utils/bucketServices');
const debugREAD = require('debug')('app:read')
const debugWRITE = require('debug')('app:write')

module.exports = {
    // --------- GET ALL ----------
    async getAllProducts(req, res, next){
        try {
            const productRef = db.collection('products')
            const snapshot = await productRef.orderBy("name", "asc").get();

            // 400 ERROR HANDLING - check if the document exists
            if (snapshot.empty){
                return next(ApiError.badRequest('The products you were looking for do not exist'))
            }

            // SUCCESS: push object properties to array and send to client
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    category: doc.data().category,
                    manufacturer: doc.data().manufacturer,
                    price: doc.data().price,
                    onSale: doc.data().onSale,
                    isAvailable: doc.data().isAvailable,
                    image: doc.data().image
                });
            })
            res.send(docs);
            
        } catch (error) {
            return next(ApiError.internal('The products could not be found, we lost our map', error))
        }
    },

    // GET SALE ITEMS
    async getSaleProducts(req, res, next){
        try {
            const productRef = db.collection('products')
            const snapshot = await productRef.where('onSale', "==", "true").orderBy("name", "asc").limit(5).get();

            // 400 ERROR HANDLING - check if the document exists
            if (snapshot.empty){
                return next(ApiError.badRequest('The Sale Products do not exist'))
            }

            // SUCCESS: push object properties to array and send to client
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    category: doc.data().category,
                    manufacturer: doc.data().manufacturer,
                    price: doc.data().price,
                    onSale: doc.data().onSale,
                    isAvailable: doc.data().isAvailable,
                    image: doc.data().image
                });
            })
            res.send(docs);
            
        } catch (error) {
            return next(ApiError.internal('The Sale products could not be found, we lost our map', error))
        }
    },

    async getMotherboards(req, res, next){
        try {
            const productRef = db.collection('products')
            const snapshot = await productRef.where('category', "==", "motherboard").orderBy("name", "asc").limit(4).get()

            // Check if they exist
            if(snapshot.empty){
                return next(ApiError.badRequest('No motherboards in stock'))
            }

            // if they're in stock
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    category: doc.data().category,
                    manufacturer: doc.data().manufacturer,
                    price: doc.data().price,
                    onSale: doc.data().onSale,
                    isAvailable: doc.data().isAvailable,
                    image: doc.data().image
                });
            })
            res.send(docs)
        } catch (error) {
            return next(ApiError.internal('The motherboards could not be found, we lost our map', error))
        }
    },

    async getPeripherals(req, res, next){
        try {
            const productRef = db.collection('products')
            const snapshot = await productRef.where('category', "==", "peripherals").orderBy('name', 'asc').limit(4).get()

            if(snapshot.empty){
                return next(ApiError.badRequest("No peripherals in stock"))
            }

            // if they're in stock
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    category: doc.data().category,
                    manufacturer: doc.data().manufacturer,
                    price: doc.data().price,
                    onSale: doc.data().onSale,
                    isAvailable: doc.data().isAvailable,
                    image: doc.data().image
                });
            })
            res.send(docs)
        } catch (error) {
            return next(ApiError.internal('The peripherals could not be found', error))
        }
    },

    // POST 
    async postProduct(req, res, next){
        debugWRITE(req.body);
        debugWRITE(req.files);
        debugWRITE(res.locals);

        // SAVE TO CLOUD STORAGE ( FILE)
        let downloadURL = null;
        try {
            const filename = res.locals.filename;
            downloadURL= await storageBucketUpload(filename);

        } catch (error) {
            return next(ApiError.internal("An error occured in uploading image", error))
        }


        // SAVE TO FIRESTORE
        try {
            const productRef = db.collection('products');
            const response = await productRef.add({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                manufacturer: req.body.manufacturer,
                price: Number(req.body.price),
                onSale: req.body.onSale,
                isAvailable: req.body.isAvailable,
                image: downloadURL
            })
            console.log(`Added Product ID: ${response.id}`)
            res.send(response.id)
            
        } catch (error) {
            return next(ApiError.internal("Your request could not be fulfilled", error))
        }

    },

    // GET BY ID
    async getProductById(req, res, next){
        debugREAD(req.params.id);
        try {
            // Get this doc within the products collection, store in productRef
            const productRef = db.collection('products').doc(req.params.id);
            const doc = await productRef.get();
            
            if(!doc.exists){
                return next(ApiError.badRequest('Product you are looking for does not exist'))
            } else {
                res.send(doc.data());
            }

        } catch (error) {
            return next(ApiError.internal("Your request couldn't be saved", error))
        }
    },


    async putProductById(req, res, next){
        debugWRITE(req.params.id)
        debugWRITE(req.body);
        debugWRITE(req.files);
        debugWRITE(res.locals);

        // SAVE TO CLOUD STORAGE BUCKET ( FILE)
        let downloadURL = null;
        try {
            if(req.files){
                // Storage Upload
                const filename = res.locals.filename;
                downloadURL= await storageBucketUpload(filename);

                // Delete the OLD image within Storage BUCKET
                if(req.body.uploadedFile){
                    debugWRITE(`Deleting olf image file from storage: ${req.body.uploadedFile}`);
                    const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile)
                }

                // IMAGE HASNT BEEN CHANGED
            } else {
                console.log('No changes to Image within database')
                downloadURL = req.body.image
            }



        } catch (error) {
            return next(ApiError.internal("An error occured in uploading image", error))
        }

        // SAVE TO FIRESTORE
        try {
            // Specify that you only want 1 document within this collection
            const productRef = db.collection('products').doc(req.params.id);
            const response = await productRef.update({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                manufacturer: req.body.manufacturer,
                price: Number(req.body.price),
                onSale: req.body.onSale,
                isAvailable: req.body.isAvailable,
                image: downloadURL
            })
            console.log(`Updated Product ID: ${response.id}`)
            res.send(response)
            
        } catch (error) {
            return next(ApiError.internal("Your request could not be fulfilled", error))
        }
    },


    async deleteProductById(req, res, next){
        try {
            // Check if doc we want exists
            const productRef = db.collection('products').doc(req.params.id);
            const doc = await productRef.get();

            if(!doc.exists){
                return next(ApiError.badRequest('The Product does not exist'))
            }
            // initiate deletion of the image first, MUST delete image before the document
            const downloadUrl = doc.data().image;
            const uploadedFIle = getFileFromUrl(downloadUrl);
            const bucketResponse = await deleteFileFromBucket(uploadedFIle)
            if (bucketResponse){
                // Successful deletion - IF THIS EXISTS
                const response = await productRef.delete({ exists: true })
                res.send(response)
            }

        } catch (error) {
            return next(ApiError.internal("Your request could not be fulfilled", error))
        }
    }




} 

