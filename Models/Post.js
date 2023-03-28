const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({

    caption:{
        type:String
    },
    image:{

        public_id:{
            type:String
        },
        url:{
            type:String
        }

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    ,
    likes:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User" 
        }
    ],
    comments:[
        { 
          owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"

          },
          content:{
            type:String,
            required:true
          }
          

        }
    ]


})




const Post=mongoose.model("Post",postSchema);

module.exports={
    Post
}

