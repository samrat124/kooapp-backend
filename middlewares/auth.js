const jwt=require("jsonwebtoken");
const { User } = require("../Models/User");

const Auth=async(req,res,next)=>{

try{

    const {token}=req.cookies;

    if(!token)  
    {
        return res.status(401).send({
            message:"Please Login First"
        })
    }

    const decoded=await jwt.verify(token,"pranav122");

    req.user=await User.findById(decoded._id);

    next();
}catch(err){
    return res.status(500).send({
        message:err.message
    })
}



}

module.exports={
    
    Auth

};