
const express=require("express");
const { Register, login, logged_out, update_password, update_profile } = require("../Controller/userController");
const { Auth } = require("../middlewares/auth");
 

const userRouter=express.Router();


userRouter.post("/register",Register);
userRouter.post("/login",login);
userRouter.get("/logout",logged_out);
userRouter.put("/updatepassword",Auth,update_password);
userRouter.put("/updateprofile",Auth,update_profile);

module.exports={
    userRouter
}

