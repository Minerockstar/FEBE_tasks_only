const mongoose = require("mongoose")
const login_schema = require("./Login_schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const secKey = "mona"
const get_login = async(req, res)=>{
    try {
        const token = req.headers["authorization"];
        jwt.verify(token, secKey, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            } else {
                const find = await login_schema.find().select(["-password"]);
                // res.send(find)
                res.json(`Welcome ${req.user.email}`);
            }
        });
    } catch (error) {
        console.error('Error retrieving login data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const get_username = async(req, res)=>{
    try{
    const find = await login_schema.findOne({name: req.query.name })
    res.json({ exists: !!find });
    }catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const get_email = async(req, res)=>{
    try{
    const find = await login_schema.findOne({email: req.query.email })
    res.json({ exists: !!find });
    }catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// const post_login = async(req, res)=>{
//     const hashpassword = await bcrypt.hash(req.body.password, 7)
//     const data = login_schema({
//         name:req.body.name,
//         email:req.body.email,
//         password:hashpassword
//     })
//     const savedata = await data.save()
//     res.json(savedata)
// }


const post_login = async (req, res) => {
    try {
        const existingEmail = await login_schema.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const existingName = await login_schema.findOne({ name: req.body.name });
        if (existingName) {
            return res.status(400).json({ error: 'UserName already exists' });
        }
        const hashpassword = await bcrypt.hash(req.body.password, 7)
            const data = login_schema({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword
            })
            const savedata = await data.save()
            res.json(savedata)
    //         const token = jwt.sign({email:email}, process.env.TOKEN)
    // res.headers("auth", token).json(token)
//     const userEmail = req.body.email
//     const token = jwt.sign({email:userEmail.email}, secKey)
// res.send({token})
    } 
   
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// const update_login = async (req, res)=>{
//     const update_data = await login_schema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
//     res.json({
//         msg:"Updated Successfully",
//         update_data_1: update_data
//     })
// }

const update_login = async (req, res) => {
    try {
        const { password } = req.body;

        // Hash the new password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        } else {
            return res.status(400).json({ error: 'Password is required for update' });
        }

        // Update the password field only
        const updatedUser = await login_schema.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            msg: 'Password updated successfully',
            updatedUser: updatedUser
        });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// const update_login = async (req, res) => {
//     try {
//         const { password, ...updateFields } = req.body; // Extract password and other fields

//         // Check if the request body includes the password field
//         if (!password) {
//             return res.status(400).json({ error: 'Password is required' });
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update only the password field with the hashed password
//         const update_data = await login_schema.findByIdAndUpdate(req.params.id, { $set: { password: hashedPassword }, $unset: { email: 1 } }, { new: true });

//         if (!update_data) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({
//             msg: "Password updated successfully",
//             update_data_1: update_data
//         });
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };




// const validUser = (req, res, next)=>{
//     const token = req.header("auth")
//     if (!token) {
//         return res.status(401).json({ error: 'Token is missing' });
//     }
//     res.token = token
//     next()
// }
const validUser = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }
    jwt.verify(token, secKey, (err, verified) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        // Add decoded token data to request for further processing
        req.user = verified;
        next();
    });
};

const delete_login = async (req, res)=>{
    const delete_data = await login_schema.findByIdAndDelete(req.params.id,{$set:req.body},{new:true})
    res.json({
        msg:"deleted Successfully",
        delete_data_1: delete_data
    })
}
const userDetail = async(req, res)=>{
    try{
    const userName = await login_schema.findOne({name:req.body.name})
    if(!userName) return res.json("Invalid Username")

    const userEmail = await login_schema.findOne({email:req.body.email})
    
    if(!userEmail) return res.json("Invalid email id")
   
    const userPassword = await bcrypt.compare(
        req.body.password, 
        userEmail.password
        )
    if(!userPassword) return res.json("Invaid password")
        
const token = jwt.sign({email:userEmail.email}, secKey)
res.json({token})
    //      const token = jwt.sign({email:userEmail}, process.env.TOKEN)
    // res.headers("auth", token).json(token)

}
catch(err){
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
}
}



module.exports = {get_login,get_username,get_email,validUser, post_login, update_login, delete_login, userDetail}