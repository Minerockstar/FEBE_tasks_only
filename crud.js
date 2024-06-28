const data_Schema = require("./Data_schemas")
const mongoose = require("mongoose")

const get_data = async(req, res)=>{
    const find = await Item.find({})
    res.json(find)
}

const post_data = async(req, res)=>{
    const create_data = Item({
        ...req.body
    })
    const savedata = await create_data.save()
    res.json(savedata)
}

const update_data = async(req, res)=>{
    const update_value = await Item.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Updated Successfully",
        updates_value : update_value
    })
}

const delete_data = async(req, res)=>{
    const delete_value = await Item.findByIdAndDelete(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Deleted Successfully",
        delete_values : delete_value
    })
}
const itemSchema = new mongoose.Schema({
        imageUrl: String,
        firstname:String,
        lastname:String,
        fatherName:String,
        motherName:String,
        address:String,
        dob:String,
        contact:String,
        fatherNumber:String,
        maritalStatus:String,
        gender:String,
        qualification:String,
        CgpaPercentage:String,
        passedOutyear:String,
        tAmount:String,
        paidAmount:String,
        remainingAmount:String,
        hscMarks:String,
        hscSclName:String,
        hscPoy:String,
        hscPercentage:String,
        dipMarks:String,
        dipClgName:String,
        dipPoy:String,
        dipSpctn:String,
        dipPercentage:String,
        dipClass:String
    });
    
    
    const Item = mongoose.model("Item", itemSchema);
    const get_img =  async(req, res)=>{
    
        try {
            const items = await Item.find()
            res.json(items)
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    }
    const create_img = async(req, res)=>{
    
        try {
            const imageUrl = req.file ? req.file.filename : null;
            const newItem = new Item({ imageUrl, ...req.body });
            await newItem.save();
            res.status(201).json(newItem);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    const edit_img = async(req, res)=>{
        try{
            const imgUrl = req.file ? req.file.filename : null
            const updatedItem = await Item.findByIdAndUpdate(
                req.params.id,
                {imgUrl},
                {new:true}
            )
            if(!updatedItem){
                return res.status(404).json({message: "Item not found"})
            }
            res.json(updatedItem)
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    }
    const delete_img = async(req, res)=>{
        try{
            const imgUrl = req.file ? req.file.filename : null
            const deletedItem = await Item.findByIdAndDelete(req.params.id)
            if(!deletedItem){
                return res.status(404).json({message: "Item not found"})
            }
            res.json({message:"Item deleted successfully"})
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    }
module.exports = {get_data, post_data, update_data, delete_data, get_img, create_img, edit_img, delete_img}