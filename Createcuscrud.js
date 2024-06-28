const customer_Schema = require("./Ccustomer_schema")

const get_customer = async(req, res)=>{
    const find = await customer_Schema.find({})
    res.json(find)
}
const post_customer= async(req, res)=>{
    const create_data = customer_Schema({
        ...req.body
    })
    const savedata = await create_data.save()
    res.json(savedata)
}

const update_customer = async(req, res)=>{
    const update_value = await customer_Schema.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Updated Successfully",
        updates_value : update_value
    })
}

const delete_customer = async(req, res)=>{
    const delete_value = await customer_Schema.findByIdAndDelete(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Deleted Successfully",
        delete_values : delete_value
    })
}

module.exports = {get_customer, post_customer, update_customer, delete_customer}