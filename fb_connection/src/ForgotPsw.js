import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineBackward } from "react-icons/ai";
import './Forgot.css'
import axios from 'axios'

const ForgotPsw = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [editedData, setEditedData] = useState({});
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('https://www.tutorix.com/images/login-punch.png');

    useEffect(() => {
        axios.get("http://localhost:5001/api/getlogin")
            .then((res) => {
                console.log("API response:", res.data);
                setData(res.data); // Set the retrieved data to the state
            })
            .catch(err => console.log(err));
    }, []);

    
    const handleForgotPsw = (e, v) => {
        e.preventDefault();
        const emailExists = data.some(item => item.email === email);
        if (!emailExists) {
            alert('Email not created. Please sign up.');
            return;
        }
        const user = data.find(item => item.email === email);
    if (user && user.name !== name) {
        alert('The provided name does not match the email. Please enter the correct name.');
        return;
    }
        axios.put(`${"http://localhost:5001/api/editlogin"}/${v._id}`, {
            password
        })
        .then((res)=>{
            setPassword('')
            console.log(res);
        })
        .catch((err)=>{console.log(err)})
    };

  return (
    
        <div id='forgotpg'>
        <img src={imageUrl} className='imgfpsw' alt="Description of the image"/>
        <div className=''>
        
        <div className='fulfor'>
        <h1 className='crt'>Create Password</h1>
            
        <form  onSubmit={handleForgotPsw} >
            <div className='paswrd' > 
                <p><input type="text" placeholder='Username' value={name}
                 onChange={(e)=>{setName(e.target.value)}}
                /><FaUser className='iconsfor'/></p>
                <p><input type="email"  required placeholder='Email'value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
                /><MdEmail className='iconsfor'/></p>
                <p><input type="text"  required placeholder='Password' value={password} 
                  onChange={(e)=>{setPassword(e.target.value)}}
                /><RiLockPasswordFill className='iconsfor'/></p>
            </div>
            
            <button className='submit' type='submit'>Submit</button>

        </form>
        {/* {
                data && data.map((v)=>(
                    <div key={v._id}>
                        <p>{v.name}</p>
                    </div>
                ))
            } */}
    <Link to="/" className='backlogin'><AiOutlineBackward className='backicon' />Back to login</Link>
        </div>
        </div>
    </div>
    
  )
}

export default ForgotPsw
