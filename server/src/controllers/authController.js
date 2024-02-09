// Local modules
const { db } = require('../config/db');
const ApiError = require('../utils/ApiError');
const { findUser, hashPassword, userDetailsToJSON, jwtSignUser, comparePassword } = require('../utils/authServices');

module.exports = {
  // [1] GET ALL Users
  async listUsers(req, res, next){
    // Store the document query in variable & call GET method
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    // [400 ERROR] Check for User Asking for Non-Existent Documents
    if (snapshot.empty) {
      return next(ApiError.badRequest('The users you were looking for do not exist'));

    // SUCCESS: Push object properties to array and send to client
    } else {
      let users = [];
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin
        });
      });
      res.send(users);
    }
  },

  async register(req, res, next){
    try {
      const { username, email, password } = req.body;

      // BLOCK MATCHING EMAILS IN DATABASE
      const userMatch = await findUser(email);
      if(userMatch.length === 1){
        return next(ApiError.badRequest('This email is already in use'));
      }

      // User data can be saved to the database
      const usersRef = db.collection('users');
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false
      });
      console.log(`Successful register - User: ${response.id}`)

      // Convert the user details to JSON (& remove the password)
      const userJSON = await userDetailsToJSON(response.id)

      // Return the user object + token
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch(err) {
      return next(ApiError.internal('Your profile could not be registered', err));
    }
  },

  async login(req, res, next){
    try {
      const { email, password } = req.body;

      // Looking for email match = existing user = good!
      const userMatch = await findUser(email);
      if(userMatch.length === 0){
        // REMOVE DEBUG STRINGS BEFORE PROD
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: email)'));
      }

      // Authenticate existing user with password check
      const passwordMatch = await comparePassword(userMatch, password);
      if(!passwordMatch){
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: pwd)'))
      }

      // User is authenticated! Issue user object & token to client
      console.log(`Success - User: ${userMatch[0].id} is logged in`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      // Return the user object + token
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch(err) {
      return next(ApiError.internal('Your profile cannot be logged into', err));
    }
  }
}