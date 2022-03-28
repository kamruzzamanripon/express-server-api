const UserModel = require('../models/UserModel');
const { save } = require("./CommonRepositorie");

const modelName = "User";

//User Registration
exports.userCreate = async(payload)=>{
    const result = await save(payload, modelName);
    return result;
}