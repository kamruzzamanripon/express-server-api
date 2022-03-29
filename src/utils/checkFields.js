module.exports = function checkFields(fields, errors, res) {
    for (let field of Object.keys(errors)) {
      if (!fields[field]) {
        res.status(422).json({
          code: 422,
          message: 'Invalid Data',
          errors: { [field]: errors[field] }
        })
        return true;
      }
    }
    return false;
  }