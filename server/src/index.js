const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config();

const { dbPing } = require('./config/db')
const config = require('./config/config')
const corsOptions = require('./config/corsOptions')
const routes = require('./routes/routes')
const ApiError = require('./utils/ApiError')
const apiErrorHandler = require('./middleware/apiErrorHandler')


const debugStartup = require('debug')('app:startup')

const app = express();

// HTTP Header Setter Security
app.use(cors({ origin: '*' }))
app.use(helmet())
// app.use(cors(corsOptions)) // Whitelisted

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// File pasing middleware
app.use(fileUpload({ createParentPath: true }))


debugStartup("parsing middleware on all routes")

// Routes
app.use('/api', routes())

// Error Path 1: Not Found Route
app.use((req, res, next) => {
    next(ApiError.notFound());
})

// Error Path 2: User/Server Error
app.use(apiErrorHandler);


dbPing.then(() => {
    const PORT = config.port;
    app.listen(
        PORT, () => console.log(`Server is running on port: ${PORT}`)
    );
})