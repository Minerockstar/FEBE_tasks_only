import React, { useEffect, useState } from 'react'
import "./Addemplo.css"
import { PiUsersThreeFill } from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import { create_emp, get_emp, post_Empimg } from '../URL/url';

const Addemp = () => {
  const [empFirstname, setEmpfname] = useState('')
  const [empLastname, setEmplname] = useState('')
  const [empFatherName, setEmpfatherName] = useState('')
  const [empMotherName, setEmpmotherName] = useState('')
  const [emp_dob, setEmpdob] = useState('')
  const [emp_email, setEmpemail] = useState('')
  const [emp_contact, setEmpcontact] = useState('')
  const [emp_desg, setEmpdesti] = useState('')
  const [emp_salary, setEmpslaray] = useState('')
  const [emp_joindate, setEmpdoj] = useState('')
  const [emp_reldate, setEmpdor] = useState('')
  const [emp_exp, setEmpexp] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState(null)
  const [ref, setRef] = useState(false);


  useEffect(()=>{
    axios.get(get_emp).then((res)=>{
     console.log(res.data);
    })
  }, [])
  const oninputchange=(e)=>{
    setImg(e.target.files[0])
    console.log(e.target.files[0]);
    

  }
  // const handleSubmitemp=(e)=>{
  //   e.preventDefault()
  //   const formdata = new FormData()
  // formdata.append("imagesemp", img)
  // console.log(formdata);

  // axios.post(post_Empimg, formdata).then((res) => {
  //   console.log(res.data);
  //   setRef(!ref);
  // })

  //   axios.post(create_emp, {
  //     empFirstname,
  //     empLastname,
  //     empFatherName,
  //     empMotherName,
  //     emp_dob,
  //     emp_email,
  //     emp_contact,
  //     emp_desg,
  //     emp_salary,
  //     emp_joindate,
  //     emp_reldate,
  //     emp_exp,
      
  //   })
  //   .then((res)=>console.log(res))
  //   .catch((err)=>{console.log(err);})
  // }


  // const handleSubmitemp = (event) => {
  //   event.preventDefault();
    
  //   const formData = new FormData();
  //   formData.append("imagesemp", img);
  //   formData.append("empFirstname", empFirstname);
  //   formData.append("empLastname", empLastname);
  //   formData.append("empFatherName", empFatherName);
  //   formData.append("empMotherName", empMotherName); 
  //   formData.append("emp_dob", emp_dob);
  //   formData.append("emp_email", emp_email);
  //   formData.append("emp_contact", emp_contact);
  //   formData.append("emp_desg", emp_desg);
  //   formData.append("emp_salary", emp_salary);
  //   formData.append("emp_joindate", emp_joindate);
  //   formData.append("emp_reldate", emp_reldate);
  //   formData.append("emp_exp", emp_exp);
    
  //   axios.post("http://localhost:5001/api/createempimg", formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleSubmitemp = async (e) => {
    e.preventDefault();
  
    try {
      const resEmail = await axios.get(`http://localhost:5001/api/getempimg?emp_email=${emp_email}`);
      
      if (resEmail.data && resEmail.data.exists) {
        alert('Email Id already exists. Please use a different email.');
        console.log('Email Id already exists');
      } else {
        const formData = new FormData();
        formData.append("imagesemp", img);
        formData.append("empFirstname", empFirstname);
        formData.append("empLastname", empLastname);
        formData.append("empFatherName", empFatherName);
        formData.append("empMotherName", empMotherName);
        formData.append("emp_dob", emp_dob);
        formData.append("emp_email", emp_email);
        formData.append("emp_contact", emp_contact);
        formData.append("emp_desg", emp_desg);
        formData.append("emp_salary", emp_salary);
        formData.append("emp_joindate", emp_joindate);
        formData.append("emp_reldate", emp_reldate);
        formData.append("emp_exp", emp_exp);
  
        const res = await axios.post("http://localhost:5001/api/createempimg", formData);
        alert('Employee Added Successfully');
        console.log(res);
        setEmpfname('');
      setEmplname('');
      setEmpfatherName('');
      setEmpmotherName('');
      setEmpdob('');
      setEmpemail('');
      setEmpcontact('');
      setEmpdesti('');
      setEmpslaray('');
      setEmpdoj('');
      setEmpdor('');
      setEmpexp('');
      setImg(null);
      }
    } catch (error) {
      console.error('An error occurred while processing the request:', error);
      alert('Check email Id or An error occurred while processing the request. Please try again later.');
    }
  };

  const navigate = useNavigate()
  const clicksub=()=>{
    navigate ("/viewemployee")
  }
  const empview=()=>{
    navigate ("/viewemp")
  }
  
  return (
    <div className='addstdadd'>

  <div className='colorprsadd'>
      <div className='addhdicon'>
        <h2>EMPLOYEE ENTRY FORM</h2>
      <span className='haddStusentemp' ><Link to='haddStusent' className='cashs'><PiUsersThreeFill /></Link>
Add Employee </span>
     <span className='hviewstdemp' onClick={empview}><Link to='hviewstd' className='cashs'><PiUsersThreeFill /></Link>
     View Employee
     </span>
        </div>
        <form type='submit' onSubmit={handleSubmitemp} className='formsadd'>
           <div>
           <p><span className='inputhandle'>Employee Name: </span> <input type="text" required className='form-control fstname' value={empFirstname} onChange={(e)=>{
          setEmpfname(e.target.value)}}/></p>
          <p><span className='inputhandle'>Last Name: </span><input className='form-control fstname' required value={empLastname} onChange={(e)=>{
          setEmplname(e.target.value)}}/></p>
        <p><span className='inputhandle'>Father Name: </span><input className='form-control fstname' required value={empFatherName} onChange={(e)=>{
          setEmpfatherName(e.target.value)}}/></p>
          <p><span className='inputhandle'>Mother Name: </span><input className='form-control fstname' required value={empMotherName} onChange={(e)=>{
          setEmpmotherName(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Birth: </span><input className='form-control fstname' required type='date' value={emp_dob} onChange={(e)=>{
          setEmpdob(e.target.value)}}/></p>
          <p><span className='inputhandle'>Email: </span><input className='form-control fstname' name='emp_email'  type='email' required value={emp_email} onChange={(e)=>{
          setEmpemail(e.target.value)}}/></p>
      <p><span className='inputhandle'>Contact: </span><input className='form-control fstname'
         required type='number' value={emp_contact} onChange={(e)=>{
          setEmpcontact(e.target.value)}}
          onBlur={(e) => {
            const inputContact = e.target.value;
            if (inputContact !== '' && inputContact.length !== 10) {
              alert('Contact should be 10 digits.');
              // Reset the contact field
              setEmpcontact('');
            }
          }}/></p>
        <p><span className='inputhandle'>Designation: </span><input className='form-control fstname' required value={emp_desg} onChange={(e)=>{
          setEmpdesti(e.target.value)}}/></p>
        <p><span className='inputhandle'>Salary: </span><input className='form-control fstname' required value={emp_salary} onChange={(e)=>{
          setEmpslaray(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Joining: </span><input className='form-control fstname' required type='date' value={emp_joindate} onChange={(e)=>{
          setEmpdoj(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Relieving: </span><input className='form-control fstname' required type='date' value={emp_reldate} onChange={(e)=>{
          setEmpdor(e.target.value)}}/></p>
        <p><span className='inputhandle'>Experience: </span><input className='form-control fstname' required type='number' value={emp_exp} onChange={(e)=>{
          setEmpexp(e.target.value)}}
          onBlur={(e) => {
            const inputExp = e.target.value;
            if (inputExp !== '' && inputExp.length > 2) {
              alert('Experience should not exceed 2 digits.');
              // Reset the experience field
              setEmpexp('');
            }
          }}/></p>
          <p><span className='inputhandle'>Photo: </span><input  className='fstname' name="imagesemp" accept="image/*" type='file'  onChange={oninputchange}
          /></p>
        <button className='btn'>ADD</button>
        {/* <button className='btn' onClick={clicksub}>View</button> */}
           </div>
        </form>
      </div>
    </div>
  )
}

export default Addemp
