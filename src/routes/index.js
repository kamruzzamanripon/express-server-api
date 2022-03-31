const express = require('express');
const router = express.Router();
const userRouterApi = require('./userRouterApi') 
const productRouterApi = require('./productRouterApi'); 


const route =(app)=>{

    //Static Image Url defined
    // sample Url: http://localhost:5000/user/photo_1648757395684.jpg
    app.use('/user', express.static('storage/images/user'))

    app.use('/api/v1', userRouterApi);
    app.use('/api/v1', productRouterApi);
   
    app.use('*', (req, res)=> res.status(404).json({status:"fail", data:"Route does not exist"}));
}

module.exports = route;