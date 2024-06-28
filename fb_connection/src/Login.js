import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiInfinityBold } from "react-icons/pi";

import axios from 'axios'


const LoginPage = () => {
    const [item, setItem] = useState('')
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState('https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?w=740');


    useEffect(()=>{
        axios.get("http://localhost:5001/api/getlogin")
        .then((res)=>{console.log(res.data)
        })
        .catch(err=>(console.log(err)))
        // setData(res.data)
    }, [])

    const handlelogin =(e)=>{
        e.preventDefault()
        
        axios.post("http://localhost:5001/api/userdetails", {
         email,
         password
        })
        .then((res)=>{
            const responseData = res.data;
            console.log('API Response:', responseData);
            if(responseData.token){
                console.log('Login successfully')
                localStorage.setItem('token', responseData.token);
                alert('Login successfully!');
                navigate("/dashborad")
            }else{
                alert('Incorrect credentials')
                console.log('Incorrect login credentials');
            }
            console.log(res)
        }
    )
        .catch((err)=>{console.log(err)})
      }
     
  return (
    <div id='login'>
         <img src={imageUrl} className='imglogins' alt="Description of the image"/>
        <div className='log'>
        {/* <PiInfinityBold className='fainfi'/> */}
        
        <div className='logins'>
        
            <h1>Login</h1>
        <form onSubmit={handlelogin}>
            <div className='inputlogin'>
                {/* <p><input type="text" value={name} required placeholder='Username'
                onChange={(e)=>{setName(e.target.value)}}
                /><FaUser className='icon'/></p> */}
                <p><input type="email" value={email} required placeholder='Email'
                onChange={(e)=>{setEmail(e.target.value)}}
                /><MdEmail className='icon'/></p>
                <p><input type="text" value={password} required placeholder='Password' 
                onChange={(e)=>{setPassword(e.target.value)}}
                /><RiLockPasswordFill className='icon' /></p>
            </div>
         <button className='loginbtn' >Login</button>
        </form>
        <Link to="/forgot" className='forgotbtn'>Forgot Password?</Link>
        <p className='dont'>Don't have an account? <button><Link to="/signup" id='dont'> Sign Up</Link></button></p>
        </div>
        </div>
    </div>
  )
}

export default LoginPage
