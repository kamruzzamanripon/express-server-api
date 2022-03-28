const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});


app.listen(process.env.RUNNING_PORT,function () {
    console.log("This Server is running from "+ process.env.RUNNING_PORT + " port")
});