const User = require("../models/User");
const { userCreate } = require("../repositories/UserRepositorie");
const { ErrorResponse } = require("../utils/apiResponseMessage");
const checkFields = require("../utils/checkFields");


//User Registration
exports.createUser = async(req, res)=>{
    let payload = req.body;
    const {password, phone, email} = payload
    
    //Extra input field Check
    const errors = {
      name: 'Name is required.',
      email: 'Email is required.',
      phone: 'phone is required.',
      password: 'password is required.',
    }
    const isError = checkFields(payload, errors, res);
    if (isError) return;
    //return console.log(password)
    
    
    try {
      
      //User Email and Phone check on Database. If had than show message
      const result = await Promise.all([
        User.findOne({ email }).lean().exec(),
        User.findOne({ phone }).lean().exec(),
      ]);
      if (result[0]) return res.status(413).send(new ErrorResponse(413, 'This email is already used.'));
      if (result[1]) return res.status(413).send(new ErrorResponse(413, 'This phone is already used.'));
       
      
      //return console.log(phone)
        const item = await userCreate(payload);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'User Create Successfully',
            data:item
            });
        }
       
      } catch (error) {
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true
        });
      }
}