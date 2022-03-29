const { decodeToken } = require("./jwt");

function userIdCheck(id,req, res){
    //Note: id means user Id.
    
    const token = req.headers.authorization.split(' ')[1];
    const {_id} = decodeToken(token);
    if(id !== _id){
        res.status(401).json({
            code: 401,
            message: 'You are not Authorized',
           })
          return true;   
    }

    return false;
}

module.exports = userIdCheck