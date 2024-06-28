const mongoose = require("mongoose")

const Attendns_schema = mongoose.Schema({
       selStudent :{
           type:String,
           required:true
    },
    status :{
           type:String,
           required:true
    },
    inDate :{
           type:String,
           required:true
    },
    inTime :{
        type:String,
        required:true
    },
    outDate :{
        type:String,
        required:true
    },
    outTime :{
        type:String,
        required:true
   },
   comments :{
    type:String,
    required:true
   }
})

module.exports = mongoose.model("attendance", Attendns_schema)