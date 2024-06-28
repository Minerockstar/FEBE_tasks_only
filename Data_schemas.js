const mongoose = require("mongoose")

const data_Schema = mongoose.Schema({
    firstname :{
           type:String,
           required:true
    },
    lastname :{
           type:String,
           required:true
    },
    fatherName :{
           type:String,
           required:true
    },
    motherName :{
        type:String,
        required:true
    },
    address :{
        type:String,
        required:true
    },
    dob :{
        type:String,
        required:true
   },
   contact :{
    type:Number,
    required:true
   },
   fatherNumber :{
    type:Number,
    required:true
    },
    maritalStatus :{
        type:String,
        required:false
    },
    gender :{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    hscMarks:{
        type:String,
    },
    hscSclName:{
        type:String,
    },
    hscPoy:{
        type:String,
    },
    hscPercentage:{
        type:String,
    },
    dipMarks:{
        type:String,
    },
    dipClgName:{
        type:String,
    },
    dipPoy:{
        type:String,
    },
    dipSpctn:{
        type:String,
    },
    dipPercentage:{
        type:String,
    },
    dipClass:{
        type:String,
    },
    CgpaPercentage :{
        type:String,
        required:true
    },
    passedOutyear :{
        type:String,
        required:true
    },
    tAmount :{  
        type:Number,
        required:true
    },
    paidAmount :{
        type:Number,
        required:true
    },
    remainingAmount :{
        type:Number,
        required:true
    }
    // image: String
})

module.exports = mongoose.model("both_task", data_Schema)