const User = require('../models/User');
const { hashMaker, matchData } = require('../utils/bcrypt');
const { createToken } = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');
const { save } = require("./CommonRepositorie");

const modelName = "User";

//User Registration
exports.userCreate = async(payload)=>{
    //const result = await save(payload, modelName);
    const {name, email, phone, password, active, photo } = payload;
    //return console.log(payload)
    const result = await new User({ name, email, phone, active, password: hashMaker(password), photo }).save();

    //send email confirmation to user
    let emailResponse = await sendEmail(
        {
            email: email,
            subject: "Your account is ready ✔",
            message: `Password is ${password}`
        }
    )
   
    return result;
}

exports.userLogin = async(payload)=>{
        
        const { email, password } = payload;
        
        const user = await User.findOne({ email }).exec();
        //return console.log("password", user);

        if (!user) return res.status(401).send(new ErrorResponse(401, 'Email isn\'t registered.'));
        else if (!matchData(password, user.password)) res.status(401).send(new ErrorResponse(401, 'Password doesn\'t matched.'));
        else if (!user.active) res.status(401).send(new ErrorResponse(401, 'Your account is deactivated.'));
        else {
            const { name, _id, email, phone } = user;
            const data = {
                name, _id, email, phone, jwt_token: "Bearer " + createToken({ _id, name, email, phone })
            }
            return data;
        }
}