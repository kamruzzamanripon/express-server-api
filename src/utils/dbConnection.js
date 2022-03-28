const mongoose = require('mongoose');


const dbConnection = async () =>  {
    const uri = process.env.MONGOOSE_DB_URI
    const options = {
        user:process.env.MONGOOSE_DB_USER,
        pass:process.env.MONGOOSE_DB_PASS,
        autoIndex:true
    };

    const connectionResult = await mongoose.connect(uri, options)

    console.log(
        `Connected to mongoDB on database:
        ${connectionResult.connections[0].name} at ${new Date().toDateString()}`
      );

   

}

module.exports = dbConnection;