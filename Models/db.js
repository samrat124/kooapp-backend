const mongoose=require("mongoose");
const env=require('dotenv').config()

const ConnectDataBase=async()=>{

    let result=await mongoose.connect(process.env.DB_CONNECTION_URL);

    return result;

} 

module.exports={
    ConnectDataBase
}

