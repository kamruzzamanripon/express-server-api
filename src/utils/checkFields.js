module.exports = function checkFields(fields, errors, res) {
  //return console.log(fields.name)
    for (let field of Object.keys(errors)) {
      if (!fields[field]) {
        res.status(422).json({
          code: 422,
          message: 'Invalid Data',
          errors: { [field]: errors[field] }
        })
        return true;
      }
      if(fields.confirmation_password && fields.password !==fields.confirmation_password){
        res.status(422).json({
          code: 422,
          message: 'password do not match'
        })
        return true;
      }
    }

    return false;
  }