const express = require('express');
const router = express.Router();

const fileServerUpload = require('../middleware/fileServerUpload')
const ProductPolicy = require('../policies/productPolicy')
const FilePolicy = require('../policies/filePolicy')
const VerifyAuth = require('../middleware/verifyAuth')
const ProductController = require('../controllers/productController')


module.exports = () => {
    // GET ALL PRODUCTS
    router.get('/', ProductController.getAllProducts);

    // GET onSale PRODUCTS
    router.get('/onsale', ProductController.getSaleProducts)

    // GET Motherboards
    router.get('/motherboards', ProductController.getMotherboards)

    // GET Peripherals / accessories
    router.get('/peripherals', ProductController.getPeripherals)

    // ADD/POST PRODUCTS
    router.post('/', 
    [
    ProductPolicy.validateProduct, 
    FilePolicy.filePayloadExists, 
    FilePolicy.fileSizeLimiter, 
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']), 
    fileServerUpload], 
    ProductController.postProduct)

    // GET BY ID PRODUCT
    router.get('/:id', ProductController.getProductById);

    // UPDATE BY ID PRODUCT
    router.put('/:id', 
    [VerifyAuth.auth,
    ProductPolicy.validateProduct, 
    FilePolicy.filePayloadExists, 
    FilePolicy.fileSizeLimiter, 
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']), 
    fileServerUpload
    ], 
    ProductController.putProductById)


    // DELETE BY ID PRODUCT
    router.delete('/:id', VerifyAuth.auth, ProductController.deleteProductById);

    return router
}