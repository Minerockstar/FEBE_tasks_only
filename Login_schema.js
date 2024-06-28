const mongoose = require("mongoose")

const login_schema = new mongoose.Schema({
    name:{
           type:String
    },
    email:{
           type:String,
           required:true
   },
   password:{
           type:String,
           required:true
   }
})

module.exports = mongoose.model("logindetails", login_schema)