const express = require('express');
const router = express.Router();
const userRouterApi = require('./userRouterApi') 
const productRouterApi = require('./productRouterApi'); 
const multer = require("multer");


const route =(app)=>{

   

    //Static Image Url defined
    // sample Url: http://localhost:5000/user/photo_1648757395684.jpg
    app.use('/user', express.static('storage/images/user'))
    //Product image url Defined
    app.use('/products', express.static('storage/images/products'))

    app.use('/api/v1', userRouterApi);
    app.use('/api/v1', productRouterApi);


    //Multer Error File Handling
    app.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) { // Multer-specific errors
            return res.status(418).json({
                err_code: err.code,
                err_message: err.message,
            });
        } else { // Handling errors for any other cases from whole application
            return res.status(500).json({
                err_code: 409,
                err_message: "Something went wrong!"
            });
        }
    });
   
    app.use('*', (req, res)=> res.status(404).json({status:"fail", data:"Route does not exist"}));
}

module.exports = route;