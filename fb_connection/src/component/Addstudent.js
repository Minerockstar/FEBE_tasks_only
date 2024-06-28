import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PiUsersThreeFill } from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom"
import { get_data, post_data, std_img } from '../URL/url';
import './studentsinfo.css';

function Studentinfo() {
  const [data, setData] = useState([])
     const [firstname, setfirstname] = useState('')
     const [lastname, setlastname] = useState('')
     const [fatherName, setfathername] = useState('')
     const [motherName, setmothername] = useState('')
     const [address, setaddress] = useState('')
     const [dob, setdob] = useState('')
     const [contact, setcontact] = useState('')
     const [fatherNumber, setfathernumber] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    // const [no, setNo] = useState(true)
     const [gender, setgender] = useState('')
     const [qualification, setqualification] = useState('')
     const [CgpaPercentage, setcgpapercentage] = useState('')
     const [passedOutyear, setpassedoutyear] = useState('')
     const fixedAmount = 30000;
     const [tAmount, settamount] = useState(fixedAmount)
     const [paidAmount, setpaidamount] = useState('')
     const [remainingAmount, setremainingamount] = useState('')
     const [img, setImg] = useState(null)
     const [All, setAllimg] = useState([])
     const [ref, setRef] = useState(false);
     const [isChecked, setIsChecked] = useState(false);
     const [isCheckedSec, setIsCheckedSec] = useState(false);
     const [hscMarks, setHscMarks] = useState('')
     const [hscSclName, sethScSclName] = useState('')
     const [hscPoy, setHscPoy] = useState('')
     const [hscPercentage, setHscPercentage] = useState('')
     const [dipMarks, setDipMarks] = useState('')
     const [dipClgName, setDipClgName] = useState('')
     const [dipPoy, setDipPoy] = useState('')
     const [dipSpctn, setDipSpctn] = useState('')
     const [dipPercentage, setDipPercentage] = useState('')
     const [dipClass, setDipClass] = useState('')
     const [expanded, setExpanded] = useState(false);
     const [photoURL, setPhotoURL] = useState(null)

     const toggleMenu = () => {
      setExpanded(!expanded);
    };

    //  const navigate = useNavigate()

   useEffect(()=>{
    
     axios.get(get_data).then((res)=>{
          setData(res.data)
      console.log(res.data);
     })
      
   }, [])

  //  const handleYes=(data)=>{
  //       // console.log(data);
  //       if(data=="maritalStatus")
  //       {
  //         if(data==true){
  //           console.log(data);
  //         }
  //         setMaritalStatus(!maritalStatus)
  //       }
  //       if(data=="no")
  //       {
  //         if(data==true){
  //           console.log(data);
  //         }
  //         setNo(!no)
  //       }
  //  }

const oninputchange=(e)=>{
  setImg(e.target.files[0])
  console.log(e.target.files[0]);
}
// console.log(All);

// let handleSubmit=(event)=>{
//   event.preventDefault()
//   const formdata = new FormData()
//   formdata.append("images", img)
//   console.log(formdata);
 
//   axios.post(std_img, formdata).then((res) => {
//     setPhotoURL(res.data.url);
//    console.log(res.data);
//    setRef(!ref);
//  })
//    axios.post(post_data, {
//     firstname,
//     lastname,
//     fatherName,
//     motherName,
//     address,
//     dob,
//     contact,
//     fatherNumber,
//     maritalStatus,
//     gender,
//     qualification,
//     CgpaPercentage,
//     passedOutyear,
//     tAmount,
//     paidAmount,
//     remainingAmount,
//     hscMarks: isChecked ? hscMarks: '',
//     hscSclName: isChecked ? hscSclName: '',
//     hscPoy: isChecked ? hscPoy: '',
//     hscPercentage: isChecked ? hscPercentage: '',
//     dipMarks: isCheckedSec ? dipMarks: '',
//     dipClgName: isCheckedSec ? dipClgName: '',
//     dipPoy: isCheckedSec ? dipPoy: '',
//     dipSpctn: isCheckedSec ? dipSpctn: '',
//     dipPercentage: isCheckedSec ? dipPercentage: '',
//     dipClass: isCheckedSec ? dipClass: '',
    
//    })
//    .then((res)=> console.log(res))
//    .catch((err)=>{console.log(err);})
// }

const handleSubmit = (event) => {
  event.preventDefault();
  
  // Create a new FormData object
  const formData = new FormData();
  formData.append("images", img);
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("fatherName", fatherName);
  formData.append("motherName", motherName); 
  formData.append("address", address);
  formData.append("dob", dob);
  formData.append("contact", contact);
  formData.append("fatherNumber", fatherNumber);
  formData.append("maritalStatus", maritalStatus);
  formData.append("gender", gender);
  formData.append("qualification", qualification);
  formData.append("CgpaPercentage", CgpaPercentage);
  formData.append("passedOutyear", passedOutyear);
  formData.append("tAmount", tAmount);
  formData.append("paidAmount", paidAmount);
  formData.append("remainingAmount", remainingAmount);
  
  //  HSC qualification
  if (isChecked) {
    formData.append("hscMarks", hscMarks);
    formData.append("hscSclName", hscSclName);
    formData.append("hscPoy", hscPoy);
    formData.append("hscPercentage", hscPercentage);
  }

  // Diploma 
  if (isCheckedSec) {
    formData.append("dipMarks", dipMarks);
    formData.append("dipClgName", dipClgName);
    formData.append("dipPoy", dipPoy);
    formData.append("dipSpctn", dipSpctn);
    formData.append("dipPercentage", dipPercentage);
    formData.append("dipClass", dipClass);
  }

  // Make the POST request with axios
  axios.post("http://localhost:5001/api/createimg", formData)
    .then((res) => {
      console.log(res);
      alert("Student addedd successfully")
      setfirstname('');
     setlastname('');
     setfathername('');
     setmothername('');
     setaddress('');
     setdob('');
     setcontact('');
     setfathernumber('');
     setMaritalStatus('');
     setgender('');
     setqualification('');
     setcgpapercentage('');
     setpassedoutyear('');
     settamount(fixedAmount);
     setpaidamount('');
     setremainingamount('');
     setHscMarks('');
     sethScSclName('');
     setHscPoy('');
     setHscPercentage('');
     setDipMarks('');
     setDipClgName('');
     setDipPoy('');
     setDipSpctn('');
     setDipPercentage('');
     setDipClass('');
     setImg(null);
    })
    .catch((err) => {
      console.log(err);
    });
};


const navigate = useNavigate()
const clicksub=()=>{
  navigate("/viewstudent")
}
const stdclick=()=>{
  navigate("/addstudent")
}
const stdview=()=>{
  navigate("/viewstd")
  
}
const handleYes = () => {
  setMaritalStatus('yes');
};

const handleNo = () => {
  setMaritalStatus('no');
};
const handleGenderFemale = () => {
  setgender('female');
};

const handleGenderNo = () => {
  setgender('male');
};
const handleHSC = () => {
  setIsChecked(!isChecked);
  setqualification('hsc');
};

const handleDlmo = () => {
  setIsCheckedSec(!isCheckedSec);
  setqualification('diploma');
};
const handleTotalAmountChange = (e) => {
  const totalAmount = parseFloat(e.target.value);
  settamount(totalAmount);
  calculateRemainingAmount(totalAmount, paidAmount);
};

const handlePaidAmountChange = (e) => {
  const amountPaid = parseFloat(e.target.value);
  setpaidamount(amountPaid);
  calculateRemainingAmount(tAmount, amountPaid);
};

const calculateRemainingAmount = (totalAmount, amountPaid) => {
  const remaining = totalAmount - amountPaid;
  setremainingamount(remaining);
};
  return (
    <div className="addingstd">
      
      <div className='colorprsadding'>
      <div  className='addhdicon'>
      <h2 id='addhdicon'>STUDENT ENTRY FORM</h2>
      <span className='haddStusentoh' onClick={stdclick}><Link to='haddStusent'  className='cashs'><PiUsersThreeFill /></Link>
Add students </span>
    <span className='hviewstdoh'  onClick={stdview}><PiUsersThreeFill />
    View students
     </span> 
     </div>
     <div className='subform'>
     <form className='formsadding' type='submit' onSubmit={handleSubmit} >
     <div>
        <p><span className='inputhandle'>First Name: </span> <input type="text" required className='form-control fstname' value={firstname} onChange={(e)=>{
          setfirstname(e.target.value)}}/></p>
        <p><span className='inputhandle'>Last Name: </span> <input type="text" required className='form-control fstname' value={lastname} onChange={(e)=>{
          setlastname(e.target.value)}}/></p>
        <p><span className='inputhandle'>Father Name: </span><input type="text" required className='form-control fstname' value={fatherName} onChange={(e)=>{
          setfathername(e.target.value)}}/></p>
          <p><span className='inputhandle'>Mother Name: </span><input type="text" required className='form-control fstname' value={motherName} onChange={(e)=>{
          setmothername(e.target.value)}}/></p>
        <p><span className='inputhandle'>Address: </span><input type="text" required className='form-control fstname' value={address} onChange={(e)=>{
          setaddress(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Birth: </span><input type="date" required className='form-control fstname'  value={dob} onChange={(e)=>{
          setdob(e.target.value)}}/></p>
        <p><span className='inputhandle'>Contact: </span><input 
        type="number" required className='form-control fstname' value={contact} onChange={(e) => setcontact(e.target.value)}
        onBlur={(e) => {
          const inputContact = e.target.value;
          if (inputContact !== '' && inputContact.length !== 10) {
            alert('Contact should be 10 digits.');
            // Reset the contact field
            setcontact('');
          }
        }}/></p>
        <p><span className='inputhandle'>Father Number: </span><input type="number"
         required className='form-control fstname' value={fatherNumber} 
          onChange={(e) => setfathernumber(e.target.value)}
    onBlur={(e) => {
      const inputContactfather = e.target.value;
      if (inputContactfather !== '' && inputContactfather.length !== 10) {
        alert('Contact should be 10 digits.');
        // Reset the contact field
        setfathernumber('');
      }
    }}
          /></p>

        <p className='mari'>Marital Status:
        <span ><span className='checktec'><input  type='checkbox' checked={maritalStatus === 'yes'} onChange={
          handleYes}/>Yes</span></span>
          <span className='checksss'><span className='check'><input checked={maritalStatus === 'no'} type='checkbox'  onChange={
          handleNo}/>No</span></span></p>

        {/* <p>Marital Status: <input type="text" required className='fstname' value={maritalStatus} onChange={(e)=>{
          setmaritalstatus(e.target.value)}}/></p> */}
{/*           
        <p>Gender: <input type="text" required className='fstname' value={gender} onChange={(e)=>{
          setgender(e.target.value)}}/></p> */}

<p className='mari'>Gender:<sapn > <span className='check1'><input checked={gender === 'female'}
        onChange={handleGenderFemale}
        type="checkbox"  />Female</span></sapn>
         <span className='check11'> <span className='checkbox'><input checked ={gender === 'male'}  type="checkbox"  
         onChange={handleGenderNo}
         />Male</span></span>
          </p>
{/* 
        <p>Qualification: <input type="text" required  className='fstname' value={qualification} onChange={(e)=>{
          setqualification(e.target.value)}}/></p> */}

          <p className='mari'>Qualification: <sapn className=""> <span className='checks'><input checked={qualification === 'hsc'}
        onChange={handleHSC}
        type="checkbox"  />HSC</span></sapn>
         <span className='checkdip'> <span className='checkbox1'><input checked ={qualification === 'diploma'}  type="checkbox"  
         onChange={handleDlmo}
         />Diploma</span></span></p>
             
          {
            isChecked && (
              <p><span className='inputhandle'>HSC Marks: </span><input type="number" 
              required className='form-control fstname' value={hscMarks} onChange={(e)=>{
                setHscMarks(e.target.value)}}
                onBlur={(e) => {
                  const inputContact = e.target.value;
                  if (inputContact !== '' && inputContact.length !== 3) {
                    alert('Marks should be 3 digits.');
                    // Reset the contact field
                    setHscMarks('');
                  }
                }}/></p>
            )
          }
         {
                isChecked && (
                  <p><span className='inputhandle'>HSC School Name: </span><input type="text" required className='form-control fstname' value={hscSclName} onChange={(e)=>{
                      sethScSclName(e.target.value)}}/></p>
                )
               }
                {
                isChecked && (
                  <p><span id='inputids' className='inputhandle'>HSC PassedOut Year: </span><input type="number"
                   required className='form-control fstname' value={hscPoy} onChange={(e)=>{
                    setHscPoy(e.target.value)}}
                    onBlur={(e) => {
                      const inputContact = e.target.value;
                      if (inputContact !== '' && inputContact.length !== 4) {
                        alert('Year should be 4 digits.');
                        // Reset the contact field
                        setHscPoy('');
                      }
                    }}
                    /></p>
                )
               }
                {
                isChecked && (
                  <p><span className='inputhandle'>HSC Percentage: </span><input 
                  type="text" required className='form-control fstname' value={hscPercentage}
                   onChange={(e)=>{
                          setHscPercentage(e.target.value)}}
                          onBlur={(e) => {
                            const inputContact = e.target.value;
                            if (inputContact !== '' && inputContact.length !== 2) {
                              alert('Percentage should be 2 digits.');
                              // Reset the contact field
                              setHscPercentage('');
                            }
                          }}
                          />
                          </p>
                )
               }
               {
                isCheckedSec && (
                  <p><span className='inputhandle'>Diploma Marks: </span><input type="text"
                   required className='form-control fstname' value={dipMarks} onChange={(e)=>{
                    setDipMarks(e.target.value)}}
                    onBlur={(e) => {
                      const inputContact = e.target.value;
                      if (inputContact !== '' && inputContact.length !== 3) {
                        alert('Marks should be 3 digits.');
                        // Reset the contact field
                        setDipMarks('');
                      }
                    }}
                    /></p>
                )
               }
               {
          isCheckedSec && (
            <p><span className='inputhandle'>Diploma ClgName: </span><input type="text" required className='form-control fstname' value={dipClgName} onChange={(e)=>{
              setDipClgName(e.target.value)}}/></p>
          )
         }
          {
          isCheckedSec && (
            <p><span className='inputhandle'>Diploma POY: </span><input type="text"
             required className='form-control fstname' value={dipPoy} onChange={(e)=>{
              setDipPoy(e.target.value)}}
              onBlur={(e) => {
                const inputContact = e.target.value;
                if (inputContact !== '' && inputContact.length !== 4) {
                  alert('Year should be 4 digits.');
                  // Reset the contact field
                  setDipPoy('');
                }
              }}
              /></p>
          )
         }
          {
          isCheckedSec && (
            <p><span className='inputhandle'>Diploma Core: </span><input type="text" required className='form-control fstname' value={dipSpctn} onChange={(e)=>{
              setDipSpctn(e.target.value)}}/></p>
          )
         }
          {
          isCheckedSec && (
            <p><span className='inputhandle'>Diploma Percentage: </span><input type="text"
             required className='form-control fstname' value={dipPercentage} onChange={(e)=>{
              setDipPercentage(e.target.value)}}
              onBlur={(e) => {
                const inputContact = e.target.value;
                if (inputContact !== '' && inputContact.length !== 2) {
                  alert('Percentage should be 2 digits.');
                  // Reset the contact field
                  setDipPercentage('');
                }
              }}/></p>
          )
         }
          {
          isCheckedSec && (
            <p><span className='inputhandle'>Diploma Class: </span><select type="text" required className='form-control fstname' value={dipClass} onChange={(e)=>{
              setDipClass(e.target.value)}}>
                <option value="">Select an Class</option>
          <option value="A Class">A Class</option>
          <option value="B Class">B Class</option>
          <option value="C Class">C Class</option></select></p>
          )
         }
        <p><span className='inputhandle'>CGPA (Percentage): </span><input type="number" 
        required className='form-control fstname' value={CgpaPercentage} onChange={(e)=>{
          setcgpapercentage(e.target.value)}}
          onBlur={(e) => {
            const inputContact = e.target.value;
            if (inputContact !== '' && inputContact.length !== 2) {
              alert('Percentage should be 2 digits.');
              // Reset the contact field
              setcgpapercentage('');
            }
          }}/></p>
        <p><span className='inputhandle'>Passedout Year: </span><input type="number"
         required className='form-control fstname' value={passedOutyear} onChange={(e)=>{
          setpassedoutyear(e.target.value)}}
          onBlur={(e) => {
            const inputContact = e.target.value;
            if (inputContact !== '' && inputContact.length !== 4) {
              alert('Year should be 4 digits.');
              // Reset the contact field
              setpassedoutyear('');
            }
          }}/></p>
        <p><span className='inputhandle'>Total Amount: </span><input type="number" required className='form-control fstname' value={tAmount} onChange={handleTotalAmountChange}/></p>
        <p><span className='inputhandle'>Paid Amount: </span><input type="number" required className='form-control fstname' value={paidAmount} onChange={handlePaidAmountChange}/></p>
        <p><span className='inputhandle'>Remaining Amount: </span><input type="number" required className='form-control fstname' value={remainingAmount} onChange={(e)=>{
          setremainingamount(e.target.value)}}/></p>
        <p><span className='inputhandle'>Photo: </span><input  className='fstname' name="images" accept="image/*" type='file'  onChange={oninputchange}
          /></p>
        <button  className='btn' >ADD</button>
        {/*<button onClick={clicksub}  className='btn'>View</button>*/}
        {/* <button className='btn' onClick={()=>{handleSubmit()}} >submit</button> */}
       </div>
       </form>
       {/* {
        data.map((v)=>(
           <div>
           <p>{v.firstname}</p>
           <img src={require(`./images/${v.imageUrl}`)}/>
           </div>
        ))
       } */}
       </div>
       {/* onChange={(e)=>setphoto(e.target.files[0])} */}
       </div>
              
          
    </div>
  );
}

export default Studentinfo;
