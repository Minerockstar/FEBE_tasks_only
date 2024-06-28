import React, { useEffect, useState } from 'react'
import './Receipt.css'
import axios from 'axios'
import { get_data } from '../URL/url'

const Receipt = () => {
  const [data, setData] = useState('')
  useEffect(()=>{
       axios.get(get_data)
       .then((res)=>{
        console.log(res.data);
        setData(res.data)
       })
  },[])
  return (
    <div className='main'>
      <div>
        <h2>Payment Page</h2>

      </div>
      <div >
        <table className='table'>
          <tr>
            <th>Name</th>
            <th>Receipt Type</th>
            <th>Paying Amount</th>
            <th>Remaining Amount</th>
            <th>Payment</th>
          </tr>
          <tbody>
          {
            data && data.map((v)=>(
               <tr key="">
                <td>{v.firstname}</td>
                <td>Cards</td>
                <td>{v.paidAmount}</td>
                <td>{v.remainingAmount}</td>
                <td>{v.tAmount}</td>
               </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Receipt