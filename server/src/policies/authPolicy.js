const Joi = require('Joi');
const ApiError = require('../utils/ApiError');
const debugJoi = require('debug')('app:joi')

module.exports = {
    validateAuth(req, res, next){
        debugJoi(req.body);
        const schema = Joi.object({
          username: Joi.string().alphanum().min(3).max(30),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        // Call the JOI validate method
        const { error, value } = schema.validate(req.body)

        // In the event of ERROR, test the type of error
        if(error){
            debugJoi(error)
            switch(error.details[0].context.key){
                case 'username':
                    next(ApiError.badRequest('You must provide a valid username'))
                    break

                case 'email':
                    next(ApiError.badRequest('You must provide a valid email'))
                    break

                case 'password':
                    next(ApiError.badRequest('You must provide a valid password'))
                    break

                default:
                    next(ApiError.badRequest('Invalid form information'))
                    break
            }
        } else {
            next();
        }
    }
}