const { save, update, getById, deleteById, allItemWithOutPagination, allItemWithPagination } = require("./CommonRepositorie");


const modelName = "Product";

//product all without pagination
exports.allProductWithOutPagination = async()=>{
    const result = await allItemWithOutPagination(modelName);
    return result;
}

//product all with pagination
exports.allProductWithPagination = async()=>{
    const result = await allItemWithPagination(modelName);
    return result;
}

//product create
exports.productCreate = async(payload)=>{
    const result = await save(payload, modelName);
    return result;
}

//product update by product Id
exports.productUpdate = async(payload)=>{
    const result = await update(payload, modelName);
    return result;
}

//product update by product Id
//this payload means id
exports.productSingle = async(payload)=>{
    const result = await getById(payload, modelName);
    return result;
}

//product Delete by product Id
//this payload means id
exports.productDelete = async(payload)=>{
    const result = await deleteById(payload, modelName);
    return result;
}