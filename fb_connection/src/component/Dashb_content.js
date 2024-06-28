import React, { useState } from 'react'
import './Main.css'
import data from './Data.json'
import datalist from './Data_list.json'
import datastr from './Data_stf.json'
import dataotr from './Data_otr.json'

const Dashboards = () => {
  const [search, setSearch] = useState('')
  return (
    <div className='main'>
      <div className='search'>
        <input placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className='filter'>
      
        {
            data && data.filter((getvalue)=>{
              if(search === ''){
                return getvalue
              }
              else if(getvalue.desc.toLowerCase().includes(search.toLowerCase())){
                return getvalue
              }
            })
           .map((v,i)=>(
            <div className='fil' key={i}>
              <h3>{v.title}</h3>
              <h1>{v.desc}</h1>
            </div>
          ))
        }
      </div>
      <div className='datalist'>
      
        {
            datalist && datalist.filter((getvalue)=>{
              if(search === ''){
                return getvalue
              }
              else if(getvalue.desc.toLowerCase().includes(search.toLowerCase())){
                return getvalue
              }
            })
           .map((v,i)=>(
            <div className='fil' key={i}>
              <h3>{v.title}</h3>
              <h1>{v.desc}</h1>
            </div>
          ))
        }
      </div>
      <div className='datastr'>
        
      {
            datastr && datastr.filter((getvalue)=>{
              if(search === ''){
                return getvalue
              }
              else if(getvalue.desc.toLowerCase().includes(search.toLowerCase())){
                return getvalue
              }
            })
           .map((v,i)=>(
            <div className='fil' key={i}>
              <h3>{v.title}</h3>
              <h1>{v.desc}</h1>
            </div>
          ))
        }  
      </div>
      <div className='dataotr'>
      
      {
            dataotr && dataotr.filter((getvalue)=>{
              if(search === ''){
                return getvalue
              }
              else if(getvalue.desc.toLowerCase().includes(search.toLowerCase())){
                return getvalue
              }
            })
           .map((v,i)=>(
            <div className='fil' key={i}>
              <h3>{v.title}</h3>
              <h1>{v.desc}</h1>
            </div>
          ))
        }  
      </div>
      
    </div>
  )
}

export default Dashboards