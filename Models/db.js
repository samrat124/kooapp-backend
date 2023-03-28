const mongoose=require("mongoose");

const ConnectDataBase=async()=>{

    let result=await mongoose.connect("mongodb://127.0.0.1:27017/Practice");

    return result;

} 

module.exports={
    ConnectDataBase
}

