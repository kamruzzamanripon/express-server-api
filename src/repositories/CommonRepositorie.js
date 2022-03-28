const mongoose = require("mongoose");


//Item all without pagination
const allItemWithOutPagination = async (modelName) => {

  const model = await mongoose.models[modelName].find().lean().exec();
  if (model == null) {
    throw new Error(`Data not found`);
  }
  return model;
};


//Item all with pagination
//Note: need extra packeg "mongoose-paginate-v2" and implement related model Schema
const allItemWithPagination = async (modelName) => {
  const options = {
    page: 1,
    limit: 5,
    
  };
 
  const model = await mongoose.models[modelName].paginate({}, options);
  if (model == null) {
    throw new Error(`Data not found`);
  }
  return model;
};


//this payload means all Data
const save = async (payload, modelName) => {
  
  const model = new mongoose.models[modelName](payload);
  const savedItem = await model.save();
 
  return savedItem;
};


//this payload means all Data include id
const update = async (payload, modelName) => {

  const {id, reqBody} = payload
  const updateItem = await mongoose.models[modelName].findOneAndUpdate(
    { _id: id },
    reqBody
  );
  
  return updateItem;
};


//this payload means id
const getById = async (payload, modelName) => {

  const model = await mongoose.models[modelName].findById(payload);
  if (model == null) {
    throw new Error(`Product not found by the id: ${payload}`);
  }
  return model;
};


//this payload means id
const deleteById = async (payload, modelName) => {

  const model = await mongoose.models[modelName].findById(payload);
  if (model) {
    const result = await mongoose.models[modelName].deleteOne({ _id: payload });
    
    return result;
  }
  throw new Error(`Product not found by the id: ${payload}`);
};


module.exports = { save, update, deleteById, getById, allItemWithOutPagination, allItemWithPagination };
