const Attendn_schemas = require("./Attendn_schema")
const mongoose = require("mongoose")

const get_attend = async(req, res)=>{
    const find = await Attendn_schemas.find({})
    res.json(find)
}

const post_attend = async(req, res)=>{
    const create_data = Attendn_schemas({
        ...req.body
    })
    const savedata = await create_data.save()
    res.json(savedata)
}

const update_attend = async(req, res)=>{
    const update_value = await Attendn_schemas.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Updated Successfully",
        updates_value : update_value
    })
}

const delete_attend = async(req, res)=>{
    const delete_value = await Attendn_schemas.findByIdAndDelete(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Deleted Successfully",
        delete_values : delete_value
    })
}

module.exports = {get_attend, post_attend, update_attend, delete_attend}