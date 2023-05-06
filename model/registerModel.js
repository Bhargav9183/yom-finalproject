const mongoose = require('mongoose');

const Registerschema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const RegisterModel = mongoose.model('registerData',Registerschema);

module.exports = RegisterModel;