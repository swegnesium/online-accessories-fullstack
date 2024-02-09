const express = require('express')
const router = express.Router();

const authRoutes = require('./authRoutes')
const productRoutes = require('../routes/productRoutes')

module.exports = () => {
    router.get('/', (req, res, next) => {
        res.send('Welcome to the Online Accessories API')
    })

    // SUB ROUTES
    // AUTH ROUTES /api/auth
    router.use('/auth', authRoutes());

    // PRODUCTS ROUTE
    router.use('/products', productRoutes());

    return router;
}
