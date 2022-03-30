const Product = require('../models/Product');
const CommonRepositorie = require('./CommonRepositorie');
const { save, update, getById, deleteById, allItemWithOutPagination, allItemWithPagination } = require("./CommonRepositorie");




const modelName = "Product";
module.exports = class ProductRepositorie { 
    
    //product all without pagination
    static allProductWithOutPagination = async()=>{
        const result = await CommonRepositorie.allItemWithOutPagination(modelName);
        return result;
    }
    
    //product all with pagination
    static allProductWithPagination = async()=>{
        const result = await CommonRepositorie.allItemWithPagination(modelName);
        return result;
    }
    
    //product create
    static productCreate = async(payload)=>{
        const result = await CommonRepositorie.save(payload, modelName);
        return result;
    }
    
    //product update by product Id
    static productUpdate = async(payload)=>{
        const result = await CommonRepositorie.update(payload, modelName);
        return result;
    }
    
    //product update by product Id
    //this payload means id
    static productSingle = async(payload)=>{
        const result = await CommonRepositorie.getById(payload, modelName);
        return result;
    }
    
    //product Delete by product Id
    //this payload means id
    static productDelete = async(payload)=>{
        const result = await CommonRepositorie.deleteById(payload, modelName);
        return result;
    }
}
