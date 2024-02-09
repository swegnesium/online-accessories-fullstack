// CUSTOM ERROR UTILITY CLASS

// Import development debug tool
const debugError500 = require('debug')('app:error500');

class ApiError {
  // CLASS PROPERTIES: Properties to be passed in as paramenters/arguments
  constructor(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
  }

  // [400] Bad Request
  // PARAMETERS: We just pass in our custom message & status code is set as part of the function
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }

  // [401] Unauthorized
  static denyAccess(msg){
    return new ApiError(401, `Access Denied: ${msg}`)
  }

  // [403] Forbidden
  static forbidden(msg){
    return new ApiError(403, `Access Denied: ${msg}`)
  }

  // [404] Not Found
  // PARAMETERS: Takes no arguments as it's a static error (only ever going to give one message!)
  static notFound() {
    return new ApiError(404, 'Resource Not Found');
  }

  // [413] ENTITY TOO LATE
  static tooLarge(msg){
    return new ApiError(413, `Upload failed: ${msg}`);
  }
  // [422] ENTITY TOO LATE
  static cannotProcess(msg){
    return new ApiError(422, `Upload failed: ${msg}`);
  }

  // [500] Internal Server Error
  // PARAMETERS: This takes two arguments - our custom message to the client + the error stack passed from the server/DB.  We will need this for debugging, so we console.log this out!
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

module.exports = ApiError;