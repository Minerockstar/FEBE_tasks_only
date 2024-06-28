const mongoose = require("mongoose")

const customer_Schema = new mongoose.Schema({
    customerName:{
           type:String,
           required:true
    },
    address:{
           type:String,
           required:true
},
    date:{
           type:String,
           required:true
    },
    state:{
        type:String,
        required:true
    },
    phoneNum:{
        type:Number,
        required:true
   },
   gstin:{
    type:String,
    required:true
}
})

module.exports = mongoose.model("createcustomers", customer_Schema)