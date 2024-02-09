module.exports = {
    // PORT ENV
    port: process.env.PORT,
    // DATABASE ENV
    db: {
        serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        storageBucket: process.env.STORAGE_BUCKET_URL
    },
    // AUTH ENV
    authentication: {
        //Application secret for creating a secure web token
        jwtSecret: process.env.SECRET,
      },

    // CORS WHITELISTS
    corsAllowedOptions: [
        process.env.CORS_WHITELIST_1,
        process.env.CORS_WHITELIST_2
    ]
}