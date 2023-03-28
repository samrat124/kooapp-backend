const { Post } = require("../Models/Post");
const { User } = require("../Models/User");


const createPost = async (req, res, next) => {


    try {


        let newPostData = {

            caption: req.body.caption,

            image: {
                public_id: "req.body.public_id",
                url: "url"
            },

            owner:req.user._id

        }

        let newpost=await Post.create(newPostData);


        let user=await User.findById(req.user._id);

        user.posts.push(newpost._id);

        await user.save();


        return res.status(201).send({
            success:true,
            post:newpost
        })

    } catch (err) {
        return res.status(500).send({
            success:false,
            message: err.message

        });
    }



}

const like_and_unlike=async(req,res,next)=>{

    try{ 

        let post=await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).send({
             success:false,
             message:"Post Not Found"
            })
        }

        if(post.likes.includes(req.user._id))
        {

            let index=post.likes.indexOf(req.user._id);

            post.likes.splice(index,1); 

            await post.save();

            return res.status(201).send({
                success:true,
                message:"Post Unliked"
            })

        }
        else{
            post.likes.push(req.user._id);
    
            await post.save();
            return res.status(201).send({
                success:true,
                message:"Post Liked"
            })

        }

        
          
        
        
            

        
       

        

        

    }catch(err){
        res.status(500).send({
          success:false,
          message:err.message
        })
    }

}


const delete_post=async(req,res,next)=>{

    try{

        let post=await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).send({
                success:false,
                message:"Post not found"
            })
        }
    
        if(post.owner.toString()!==req.user._id.toString())
        {
            return res.status(401).send({
                success:false,
                message:"Unauthorized"
            })
        }
        else{

         await post.deleteOne()
    
         let user=await User.findById(req.user._id);
    
           let index=user.posts.indexOf(req.params.id);
    
           user.posts.splice(index,1);
    
           await user.save();
             
            
            
            return res.status(201).send({
                success:true,
                message:"Post deleted"
            })
    
        }

    }
    catch(err){
        return res.status(500).send({
            success:false,
            message:err.message
        })
    }


}

const follow_unfollow=async(req,res,next)=>{

    try{


    let followingto=await User.findById(req.params.id);

    if(!followingto)
    {
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
    }


    let followedby=await User.findById(req.user._id);



    if(followingto.followers.includes(followedby._id)){

        let index=followingto.followers.indexOf(followedby._id);
        followingto.followers.splice(index,1);
       await followingto.save();

        index=followedby.following.indexOf(followingto._id);
        followedby.following.splice(index,1);
       await  followedby.save();

       return res.status(201).send({
        success:true,
         message:"User Unfollowed"
       })

    }
    else{

        followedby.following.push(followingto._id);
        followingto.followers.push(followedby._id);
   
        await followingto.save();
        await followedby.save();

        return res.status(201).send({
            success:true,
             message:"User followed"
           })
        
    }


     

    }catch(err){
        return res.status(500).send({
            success:false,
            message:err.message
        })
    }


    

  

}

const add_comment=async(req,res,next)=>{

    try{

       let post =await Post.findById(req.params.id);

       if(!post)
       {
        return res.status(404).send({
            success:false,
            message:"Post Not Found"
        })

       }

       post.comments.push({
        owner:req.user._id,
        content:req.body.content

       })

       post.save();

       return res.status(201).send({
        success:true,
        message:"Comment added Successfully"
       })
       

    }catch(err){



    }

    




}

module.exports = {

    createPost,like_and_unlike,delete_post,follow_unfollow,add_comment

}