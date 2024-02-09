const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const debugJwt = require('debug')('app:jwt');

const auth = (req, res, next) =>{
    // load bearer token from header
    let token = req.header("Authorization")
    debugJwt(token)
    
    if(!token){
        return next(ApiError.denyAccess("No token provided"))
    } else {
        // remove 7 digits from beginning (removes "Bearer ")
        token = token.substring(7, token.length);
        debugJwt(`DEBUG - Returned Token: ${token}`)
    }

    // check whether token is valid
    try {
        const decoded = jwt.verify(token, config.authentication.jwtSecret)
        // store userdata for us to access
        req.user = decoded;
        debugJwt(`User credentials verified: ${req.user.username}`)
        next()
        // [401] Error for invalid token
    } catch (exc) {
        debugJwt(exc)
        return next(ApiError.denyAccess(`Invalid Token`))
    }
}


const admin = (req, res, next) => {

}


const verifyAuth = {
    auth, 
    admin
}

module.exports = verifyAuth