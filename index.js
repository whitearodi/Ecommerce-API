
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
.connect(
    process.env.MONGO_URL
).then (() => console.log(" My DB Connection Succcesful!!"))
 .catch(() =>{
    console.log(err);
 });


app.listen( 3000,()=>{
    console.log("Backend server is running!!");
});