const mongoose = require('mongoose');

const stuReg = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    father:{
        type:String,
        required:true
    }, 
    college:{
        type:String,
        required:true
    }, 
    city:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
   
})

const Register = new mongoose.model("emps" , stuReg);
module.exports = Register;