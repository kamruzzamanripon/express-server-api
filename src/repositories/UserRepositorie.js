const User = require('../models/User');
const { hashMaker } = require('../utils/bcrypt');
const sendEmail = require('../utils/sendEmail');
const { save } = require("./CommonRepositorie");

const modelName = "User";

//User Registration
exports.userCreate = async(payload)=>{
    //const result = await save(payload, modelName);
    const {name, email, phone, password, active, photo } = payload;
    //return console.log(payload)
    const result = await new User({ name, email, phone, active, password: hashMaker(password), photo }).save();

    
            let emailResponse = await sendEmail(
                {
                    email: email,
                    subject: "Your account is ready ✔",
                    message: `Password is ${password}`
                }
            )
   
    return result;
}