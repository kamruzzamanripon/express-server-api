const User = require("../models/User");
const UserRepository = require("../repositories/UserRepository");
const { ErrorResponse } = require("../utils/apiResponseMessage");
const checkFields = require("../utils/checkFields");
const userAuthIdCheck = require("../utils/userAuthIdCheck");





module.exports = class UserController {


  //User Registration
  static createUser = async (req, res) => {
    let payload = req.body;
    const { password, phone, email } = payload;
   
    //Image check if have then include image into payload
    var imgUrl = '';
    if(req.file) var imgUrl = `storage/images/user/${req.file.filename}`;
    payload.photo = imgUrl;
    
    
   //return console.log(imgUrl)
    //Extra input field Check
    const errors = {
      name: "Name is required.",
      email: "Email is required.",
      phone: "phone is required.",
      password: "password is required.",
      confirmation_password: "confiramation password is required.",
    };
    const isError = checkFields(payload, errors, res);
    if (isError) return;

    try {
      //User Email and Phone check on Database. If had than show message
      const result = await Promise.all([
        User.findOne({ email }).lean().exec(),
        User.findOne({ phone }).lean().exec(),
      ]);
      if (result[0])
        return res
          .status(413)
          .send(new ErrorResponse(413, "This email is already used."));
      if (result[1])
        return res
          .status(413)
          .send(new ErrorResponse(413, "This phone is already used."));

      //all is ok, than data/payload pass on database
      
      const data = await UserRepository.userCreate(payload);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "User Create Successfully",
          data: data,
        });
      }
    } catch (error) {
      res.status(501).json({
        code: 501,
        message: error.message,
        error: true,
      });
    }
  };



  //User Login
  static loginUser = async (req, res) => {
    let payload = req.body;

    //Extra input field Check
    const errors = {
      email: "Email is required.",
      password: "Password is required.",
    };
    const isError = checkFields(payload, errors, res);
    if (isError) return;

    try {
      //all is ok, than data/payload pass on database
      const data = await UserRepository.userLogin(payload);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "User Login Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send(new ErrorResponse(401, error.message));
    }
  };



  //Single user information
  static getInfoUser = async (req, res) => {
    const id = req.params.id;

    try {
      //all is ok, than data/payload pass on database
      const data = await UserRepository.userInfoGet(id);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "User Login Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send(new ErrorResponse(401, error.message));
    }
  };



  //user update information by user Id
  static updateUserInfo = async (req, res) => {
    const id = req.params.id;
    let reqBody = req.body;

    //If File have then push file into reqBody then process update
    var imgUrl = ''
    if(req.file) var imgUrl = `storage/images/user/${req.file.filename}`;
    reqBody.photo = imgUrl
       
    const payload = {id, reqBody};

    try {
      //all is ok, than data/payload pass on database
      const data = await UserRepository.userInfoUpdate(payload);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "User Update Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send(new ErrorResponse(401, error.message));
    }
  };



  //user Delete
  static deleteUser = async (req, res) => {
    const id = req.params.id;

    //User Id check for extra production
    const authorized = userAuthIdCheck(id, req, res);
    if (authorized) return;

    try {
      const data = await UserRepository.userDelete(id);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "User Delete Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send(new ErrorResponse(401, error.message));
    }
  };

  // Forgot password to send email to user
  static forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    //user mail check
    if (!user) {
      return res
        .status(404)
        .send(new ErrorResponse(404, "User not found with this email"));
    }

    try {
      const data = await UserRepository.passwordForgot(user);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: `Email sent to: ${user.email}`,
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(new ErrorResponse(500, error.message));
    }
  };

  //Forgot password reset
  static forgotResetPassword = async (req, res) => {
    //get token from url
    const resetPasswordToken = req.params.token;
    //query on database token and expiray data
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    //user and password validation
    if (!user) {
      return res
        .status(404)
        .send(
          new ErrorResponse(
            400,
            "Password reset token is invalid or has been expired"
          )
        );
    }
    if (req.body.password !== req.body.confirmation_password) {
      return res
        .status(404)
        .send(new ErrorResponse(400, "Password does not match"));
    }

    try {
      const data = await UserRepository.resetForgotPassword(user, req);
      if (data) {
        return res.status(200).json({
          code: 200,
          message: "Password updated successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(new ErrorResponse(500, error.message));
    }
  };
};
