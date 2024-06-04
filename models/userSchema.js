const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:8
    },
    cpassword:{
        type:String,
        require:true,
        minlength:8
    },
    profileimg:{
        type:String,
        require:true,
    }
})

const usermodel = new mongoose.model("users",userSchema)
module.exports = usermodel;