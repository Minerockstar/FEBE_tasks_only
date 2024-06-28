import React, {  useEffect, useState } from 'react'
import './Billing.css'
import { MdDelete } from "react-icons/md";
import { customer_create, customer_get } from '../URL/url';
import axios from 'axios';

const  Customer = () => {
  const [tableData, setTableData] = useState([]);
  const [ref, setRef] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [state, setState] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [gstin, setGstin] = useState('')

  useEffect(()=>{
    axios.get(customer_get).then((res)=>{
     console.log(res.data);
     setTableData(res.data)
    })
  }, [ref])

 const handleCustomerCrt=(e)=>{
  e.preventDefault()
      axios.post(customer_create, {
        customerName,
        address,
        date,
        state,
        phoneNum,
        gstin
      })
      .then((res)=>console.log(res))
      .catch((err)=>{console.log(err)})
      setRef(!ref)
 }  
const handleDeleteRow=(index)=>{
  axios.delete(`${"http://localhost:5001/api/delcustomer"}/${index._id}`).then((res)=>console.log(res))
  setRef(!ref)
  console.log(index);
}
const generateUniqueGSTIN = () => {
  // Generate a random number between 10000000 and 99999999
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  const uniqueGSTIN = `GSTIN${randomNumber}`; // Prefix with your organization's identifier
  setGstin(uniqueGSTIN);
};

useEffect(() => {
  generateUniqueGSTIN(); // Generate a unique GSTIN when the component mounts
}, []);

  return (
    
    <div id='addstd'>
      <div className='colorprs'>
      <div className='addhdicon'>
      <h2>CREATE CUSTOMER</h2>
      
     </div>
     <form className='formscustomer' onSubmit={handleCustomerCrt}>
     <div>
     <p><span className='inputhandle'>Customer Name: </span><input 
     className='form-control fstname'  
     type="text" 
     required
     value={customerName} onChange={(e)=>{
      setCustomerName(e.target.value)}}
     /></p>
     <p><span className='inputhandle'>Address: </span><input 
     className='form-control fstname'  
     type="text"
     required
     value={address} onChange={(e)=>{
      setAddress(e.target.value)}}
     /></p>
     <p><span className='inputhandle'>Date: </span><input 
     className='fstname'  
     type="date"
     required
     value={date} onChange={(e)=>{
      setDate(e.target.value)}}
     /></p>
     <p><span className='inputhandle'>State: </span><select
     className='fstname'  
     type="text"
     required
          value={state}
          onChange={(e)=>{
            setState(e.target.value)}}
     >
     <option value="">Select a State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          </select>
     </p>
     <p><span className='inputhandle'>Phone No: </span><input 
     className='form-control fstname'  
     type="text"
     required
          value={phoneNum}
          onChange={(e)=>{
            setPhoneNum(e.target.value)}}
     /></p>
     <p><span className='inputhandle'>GSTIN: </span><input 
     className='form-control fstname'  
     type="text"
          value={gstin}
          onChange={(e)=>{
            setGstin(e.target.value)}}
            readOnly
     /></p>
     <button className='btn' >Create</button>

       </div>
       
       </form>
       
       </div>
       <div className='listc'>
        <h3>Customer List</h3>
       <table className='listtab'>
          <tr>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>State</th>
            <th>Phone No</th>
            <th>GSTIN</th>
            <th>Action</th>
          </tr>
          <tbody>
          {tableData.map((index) => (
            <tr key={index._id}>
              <td>{index.customerName}</td>
              <td>{index.address}</td>
              <td>{index.date}</td>
              <td>{index.state}</td>
              <td>{index.phoneNum}</td>  
              <td>{index.gstin}</td>
              <td>
                 <MdDelete className='deliconsdel' id='cash' onClick={() => handleDeleteRow(index)} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
       </div>
      </div>
  )
}

export default  Customer