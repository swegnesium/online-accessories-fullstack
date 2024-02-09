// DATABASE CONFIGURATION
// Imports of db admin modules (imports the admin libraries)

var admin = require("firebase-admin");
const config = require('./config')

// Import debug logs
const dbStartup = require('debug')('app:db')
const debugError500 = require('debug')('app:error500')

try {
    dbStartup("Attempting database connection...")
    var serviceAccount = require(config.db.serviceAccountKey);

      // Configure database with our credentials + storage bucket details (for file/image storing)
    admin.initializeApp({
          // Set Application Default Credentials (ADC implicitly determines credentials from GOOGLE_APPLICATION_CREDENTIALS ENV)
      credential: admin.credential.cert(serviceAccount),
      storageBucket: config.db.storageBucket
    });


      // Store core database functions in variable objects (these each represent its OWN API, as part of the wider admin SDK!)
    const db = admin.firestore()
    const bucket = admin.storage().bucket()

    // Test DB connection - only works if you have 1 or more collections
    const dbPing = db.listCollections()
    .then(collections => {
      dbStartup("Connected to Cloud Firestore");
      for (let collection of collections) {
        dbStartup(`Found db collection: ${collection.id}`)
      }
    });

    module.exports = { db, bucket, dbPing }

} catch(error){
    debugError500(error)
}