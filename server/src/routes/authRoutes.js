const express = require('express');
const router = express.Router()
 
const authPolicy = require('../policies/authPolicy')
const authController = require('../controllers/authController')


module.exports = () => {
    // ENDPOINTS: GET = /api/auth/users
    router.get('/users', authController.listUsers );

    // AUTH REGISTER
    router.post('/register', authPolicy.validateAuth, authController.register );

    // AUTH LOGIN /api/auth/login
    router.post('/login', authPolicy.validateAuth, authController.login )


    return router
}