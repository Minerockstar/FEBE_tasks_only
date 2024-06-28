import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiInfinityBold } from "react-icons/pi";
import "./Signup.css"
import axios from 'axios'

const Signup = () => {
  const [data, setData] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2q0ZTubJ6bR.jpg');
  const navigate = useNavigate()
  
//   useEffect(()=>{
//     axios.get("http://localhost:5001/api/getlogin")
//     .then((res)=>{console.log(res.data)
//     })
//     .catch(err=>(console.log(err)))
//     // setData(res.data)
// }, [])

// const handleSignup=(e)=>{
//   e.preventDefault()

//   axios.post("http://localhost:5001/api/createlogin", {
//     name,
//     email,
//     password
//   })
//   .then((res)=>{
//     alert('Account Created Successfully')
//     navigate("/")
//     console.log(res)
//   })
//   .catch((err)=>{console.log(err)})
// }

const handleSignup = (e) => {
  e.preventDefault();

  axios.get(`http://localhost:5001/api/checkemail?email=${email}`)
     .then((resEmail) => {
        const { exists: emailExists  } = resEmail.data;

        if (emailExists) {
           alert('Email Id already exists. Please use a different email.');
           console.log('Email Id already exists');
        } else {
           axios.get(`http://localhost:5001/api/checkusername?name=${name}`)
              .then((resUsername) => {
                 const { exists: usernameExists } = resUsername.data;

                 if (usernameExists) {
                    alert('Username already exists. Please choose a different username.');
                    console.log('Username already exists');
                 } else {
                    axios.post("http://localhost:5001/api/createlogin", {
                       name,
                       email,
                       password
                    })
                       .then((res) => {
                          alert('Account Created Successfully');
                          navigate("/");
                          console.log(res);
                       })
                       .catch((err) => {
                          console.log(err);
                       });
                 }
              })
              .catch((err) => {
                 console.log(err);
              });
        }
     })
     .catch((err) => {
        console.log(err);
     });
};


  return (
    <div id='signup'>
      <img src={imageUrl} className='imglogin' alt="Description of the image"/>
        <div className='sign'>
        {/* <PiInfinityBold className='pinfin'/> */}
        
        <div className='signupppp'>
            <h1>Welcome !</h1>
        <form onSubmit={handleSignup}>
            <div className='signinput'>
                <p><input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}
                 required placeholder='Username'/><FaUser className='reacticon'/></p>
                <p><input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
                 required placeholder='Email'/><MdEmail className='reacticon'/></p>
                <p><input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                required placeholder='Password'/><RiLockPasswordFill className='reacticon' /></p>
                
            </div>
        <button className='createbtn'>Create Account</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Signup
