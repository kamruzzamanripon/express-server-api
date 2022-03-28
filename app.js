const express = require('express');
const router = require('./src/routes/api');
const dbConnection = require('./src/utils/dbConnection');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const app = new express();

//Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


//Body Parser Implement
app.use(bodyParser.json())

//Request Rate Limit
const limiter = rateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 1000 //limit each IP to 1000 requests per windowMs
});
app.use(limiter);

//mongoose DB connnection
dbConnection();


//common Route url http://localhost:5000/api/v1 
app.use('/api/v1', router);
module.exports = app;