const User = require('../models/User');
const { hashMaker, matchData } = require('../utils/bcrypt');
const { createToken } = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');
const { save, getById, update, deleteById } = require("./CommonRepositorie");
const crypto = require('crypto')

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


//User Login
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


//Single User information
//this payload means id
exports.userInfoGet = async(payload)=>{

    const data = await getById(payload, modelName);
    const {name, email, phone, photo} = data
    const result = {
        name, email, phone, photo
    }
    
    return result;
}


//user information update/Edit
exports.userInfoUpdate = async(payload)=>{
    const result = await update(payload, modelName);
    return result;
}


//user Delete
//this payload means id
exports.userDelete = async(payload)=>{
   const result = await deleteById(payload, modelName);
    return result;
}


//Forgot password and send email for password change
exports.passwordForgot = async(user)=>{
    //create token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expdate =  Date.now() + 120 * 60 * 1000; //2hr
    //token and expirate Data save on database
    user.resetPasswordToken = resetToken
    user.resetPasswordExpire = expdate
    const result = await user.save();

    // FRONT END URL
    const frontEndUrl = process.env.FRONT_END_URL
    
    // Create reset password url
    const resetUrl = `${frontEndUrl}/password/forgot/reset/${resetToken}`
    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`

    //send email to user
    let emailResponse = await sendEmail(
        {
            email: user.email,
            subject: "Your Password Recovery ✔",
            message
        }
    )
    //return console.log(emailResponse)
    return result;
}

//Reset forget password, whose token get from user email
exports.resetForgotPassword = async(user, req)=>{
    
    // Setup the new password
    user.password = req.body.password
    user.resetPasswordToken = null
    user.resetPasswordExpire = null

    const result = await user.save();
    return result;
}