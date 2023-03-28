
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],

    },
    email:{

        type:String,
        required:[true,"please enter your email"],
        unique:[true,"Email id already Exist"]
        
    },
    password:{
        type:String,
        required:[true,"please enter your password"],

    },
    avatar:{
      public_id:String,
      url:String
    },
    posts:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Post"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]


})

const User=mongoose.model("User",userSchema);

module.exports={
    User
}