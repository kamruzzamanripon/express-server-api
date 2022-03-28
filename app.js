const express = require('express');
const router = require('./src/routes/api');
const dbConnection = require('./src/utils/dbConnection');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const app = new express();

//mongoose DB connnection
dbConnection();



app.use('/api/v1', router);
module.exports = app;