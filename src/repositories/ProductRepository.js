const Product = require('../models/Product');
const CommonRepository = require('./CommonRepository');
const fs = require('fs')
const DIR = './';




const modelName = "Product";
module.exports = class ProductRepository { 
    
    //product all without pagination
    static allProductWithOutPagination = async()=>{
        const result = await CommonRepository.allItemWithOutPagination(modelName);
        return result;
    }
    
    //product all with pagination
    static allProductWithPagination = async()=>{
        const result = await CommonRepository.allItemWithPagination(modelName);
        return result;
    }
    
    //product create
    static productCreate = async(payload)=>{
        const result = await CommonRepository.save(payload, modelName);
        return result;
    }
    
    //product update by product Id
    static productUpdate = async(payload)=>{

        //Check user have photo/image. if had then first delete local file then database
         const userInfo = await CommonRepository.getById(payload.id, modelName);
         const productImageInfo = userInfo.images;
         if(productImageInfo){
             for( var i=0; productImageInfo.length > i; i++){
                 fs.unlinkSync(DIR + productImageInfo[i]);
             }
           }

        const result = await CommonRepository.update(payload, modelName);
        return result;
    }
    
    //product update by product Id
    //this payload means id
    static productSingle = async(payload)=>{
        const result = await CommonRepository.getById(payload, modelName);
        return result;
    }
    
    //product Delete by product Id
    //this payload means id
    static productDelete = async(payload)=>{

        //Check user have photo/image. if had then first delete local file then database
        const userInfo = await CommonRepository.getById(payload, modelName);
        const productImageInfo = userInfo.images;
        if(productImageInfo){
            for( var i=0; productImageInfo.length > i; i++){
                fs.unlinkSync(DIR + productImageInfo[i]);
            }
          }
        //return console.log(productImageInfo)
    
        const result = await CommonRepository.deleteById(payload, modelName);
        return result;
    }
}
