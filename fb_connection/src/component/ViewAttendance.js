import React, { useEffect, useState } from 'react'
import './Attendance.css'
import axios from 'axios'

const Viewattendance = () => {
   const [data, setData] = useState([])
   
  useEffect(()=>{
      axios.get("http://localhost:5001/api/getattend")
      .then((res)=>{
        console.log(res.data);
        setData(res.data)
      })
  }, [])
  return (
    <div className='viewatt'>
      <div>
        <h2>View Attendance</h2>

      </div>
      <div >
        <table className='tablereci'>
          <tr>
            <th>Selected Student</th>
            <th>Status</th>
            <th>In Date</th>
            <th>In Time</th>
            <th>Out Date</th>
            <th>Out Time</th>
            <th>Comments</th>
          </tr>
          <tbody>
          {
            data && data.map((v)=>(
              <tr key={v._id}>
                <td>{v.selStudent}</td>
                <td>{v.status}</td>
                <td>{v.inDate}</td>
                <td>{v.inTime}</td>
                <td>{v.outDate}</td>
                <td>{v.outTime}</td>
                <td>{v.comments}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Viewattendance