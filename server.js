const express=require('express');
const path=require('path');
const jwt= require('jsonwebtoken');


const app=express();
const userRouter = require('./Database_connection/router');
 
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", userRouter);

app.listen(3000,function(err){
    if(err)
    {
        console.log('Error',err);
    }

    console.log("server is up and running on port: ",3000);
})