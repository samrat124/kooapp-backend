
const express=require("express");
const cors=require("cors");
const {userRouter} =require("./Routes/userRoute");
const { ConnectDataBase } = require("./Models/db");
const { postRouter } = require("./Routes/postRoutes");
const cookieParser = require("cookie-parser");

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api",userRouter);
app.use("/api",postRouter);


const PORT=3001;

ConnectDataBase().then(()=>{

    app.listen(PORT,()=>{

        console.log(`server is listening at ${PORT}`);
       
       })

})




