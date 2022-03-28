const { userCreate } = require("../repositories/UserRepositorie");


//User Registration
exports.createUser = async(req, res)=>{
   
    try {
        let payload = req.body;
        const item = await userCreate(payload);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'User Create Successfully',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}