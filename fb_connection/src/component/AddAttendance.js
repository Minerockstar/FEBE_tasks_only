import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Attendance.css"

const Addattendance = () => {
  const [ref, setRef] = useState(false);
  const [selStudent, setSelStudent] = useState('')
  const [status, setStatus] = useState('')
  const [inDate, setInDate] = useState('')
  const [inTime, setInTime] = useState('')
  const [outDate, setOutDate] = useState('')
  const [outTime, setOutTime] = useState('')
  const [comments, setComments] = useState('')
  const [data, setData] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:5001/api/getattend").then((res)=>{
     console.log(res.data);
    })
  }, [ref])

useEffect(()=>{
  axios.get("http://localhost:5001/api/get").then((res)=>{
    console.log(res.data);
    setData(res.data)
   })
},[])

const handleAttendance =(e)=>{
  e.preventDefault()
  axios.post("http://localhost:5001/api/postattend", {
    selStudent,
    status,
    inDate,
    inTime,
    outDate,
    outTime,
    comments
  })
  .then((res)=>console.log(res))
  .catch((err)=>{console.log(err);})
}

  return (
    <div id='addstd'>

      <div id='colorprs'>
      <div className='addhdiconatten'>
      <h2>ATTENDANCE FORM</h2>
      
     </div>
     <form className='forms' onSubmit={handleAttendance}>
     <div>
        <p><span className='inputhandle'>Selected Student:</span><select className='fstname'
        value={selStudent}
        onChange={(e) => {
          setSelStudent(e.target.value)
        }}
        
      >
        <option className='detailcus' value="">Select a Student</option>
        {data.map((v) => (
          <option key={v._id} value={v.firstname}>
                        {v.firstname}
          </option>
        ))}
      </select></p>
        <p><span className='inputhandle'>Status:</span><select className='fstname' value={status} 
        onChange={(e)=>{setStatus(e.target.value)}}
        > 
        <option className='option'>Select</option>
        <option className='option'>Present</option> 
        <option>Absent</option>
        <option>Given Permission</option>
        </select></p>
        <p><span className='inputhandle'>In Date: </span><input className='fstname' type='date' value={inDate}
        onChange={(e)=>{setInDate(e.target.value)}}/></p>
          <p><span className='inputhandle'>In Time: </span><input className='fstname' type='time' value={inTime}
          onChange={(e)=>{setInTime(e.target.value)}}/></p>
        <p><span className='inputhandle'>Out Date: </span><input className='fstname'  type='date' value={outDate} 
        onChange={(e)=>{setOutDate(e.target.value)}}/></p>
          <p><span className='inputhandle'>Out Time: </span><input className='fstname' type='time' value={outTime} 
          onChange={(e)=>{setOutTime(e.target.value)}}/></p>
        <p><span className='inputhandle'>Comments: </span><input className='form-control fstname' value={comments}
        onChange={(e)=>{setComments(e.target.value)}}/></p>
        <button className='btn'>ADD</button>
       </div>
       
       </form>
       </div>
      </div>
  )
}

export default Addattendance