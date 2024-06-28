const employee_Schema = require("./Emp_schema")
const mongoose = require("mongoose")

const get_emp = async(req, res)=>{
    const findData = await Employee.find({})
    res.json(findData)
}
const getEdit_emp = async(req, res)=>{
        const employee = await Employee.findById((req.params.id));
        res.json({ employee })
}

const post_emp = async (req, res) => {
    const { emp_email } = req.body;

    const existingEmployee = await Employee.findOne({ emp_email });

    if (existingEmployee) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const create_data = Employee({ ...req.body });

    try {
        const savedata = await create_data.save();
        res.json(savedata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




const update_emp = async(req, res)=>{
    const update_value = await Employee.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Updated Successfully",
        updates_value : update_value
    })
}

const delete_emp = async(req, res)=>{
    const delete_value = await Employee.findByIdAndDelete(req.params.id, {$set:req.body}, {new:true})
    res.json({
        msg:"Deleted Successfully",
        delete_values : delete_value
    })
}
const itemSchemaEmp = new mongoose.Schema({
      imageUrl: String,
      empFirstname: String,
      empLastname: String,
      empFatherName: String,
      empMotherName: String,
      emp_dob: String,
      emp_email: String,
      emp_contact: String,
      emp_desg: String,
      emp_salary: String,
      emp_joindate: String,
      emp_reldate: String,
      emp_exp: String

});


const Employee = mongoose.model("Employee", itemSchemaEmp);
const getEmp_img =  async(req, res)=>{

    try {
        const employees = await Employee.find()
        res.json(employees)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
const getid_img = async(req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        // Extracting all fields from the employee object
        const { _id, imageUrl, empFirstname, empLastname, empFatherName, empMotherName, emp_dob, emp_email, emp_contact, emp_desg, emp_salary, emp_joindate, emp_reldate, emp_exp } = employee;
        res.json({ _id, imageUrl, empFirstname, empLastname, empFatherName, empMotherName, emp_dob, emp_email, emp_contact, emp_desg, emp_salary, emp_joindate, emp_reldate, emp_exp });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
// const createEmp_img = async(req, res)=>{

//     try{
//         const imgUrl = req.file ? req.file.filename : null
//         const newItem = new Employee ({imgUrl})
//         await newItem.save()
//         res.status(201).json({newItem, msg:"Img Uploaded Successfully"})
//     }
//     catch(error){
//         res.status(500).json({error: error.message})
//     }
// }
const createEmp_img = async(req, res)=>{
    
    try {
        const imageUrl = req.file ? req.file.filename : null;
        const newItem = new Employee({ imageUrl, ...req.body });
        await newItem.save();
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const editEmp_img = async(req, res)=>{
    try{
        const imgUrl = req.file ? req.file.filename : null
        const updatedItem = await Employee.findByIdAndUpdate(
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
const deleteEmp_img = async(req, res)=>{
    try{
        const imgUrl = req.file ? req.file.filename : null
        const deletedItem = await Employee.findByIdAndDelete(req.params.id)
        if(!deletedItem){
            return res.status(404).json({message: "Item not found"})
        }
        res.json({message:"Item deleted successfully"})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports = {get_emp,getEdit_emp,getid_img, post_emp, update_emp, delete_emp, getEmp_img, editEmp_img, createEmp_img, deleteEmp_img}