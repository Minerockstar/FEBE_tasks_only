const mongoose = require("mongoose")

const employee_Schema = new mongoose.Schema({
    empFirstname:{
           type:String,
           required:true
    },
    empLastname:{
           type:String,
           required:true
},
    empFatherName:{
           type:String,
           required:true
    },
    empMotherName:{
        type:String,
        required:true
    },
    emp_dob:{
        type:String,
        required:true
   },
   emp_email:{
    type:String,
    required:true
},
   emp_contact:{
    type:String,
    required:true
   },
   
    emp_desg:{
        type:String,
        required:true
    },
    emp_salary:{
        type:String,
        required:true
    },
    emp_joindate:{
        type:String,
        required:true
    },
    emp_reldate:{
        type:String,
        required:true
    },
    emp_exp:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("employee_paths", employee_Schema)