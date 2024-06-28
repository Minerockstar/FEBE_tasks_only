import React, { useEffect, useState } from 'react'
import { Route, Switch, useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import { BiLogoJquery } from "react-icons/bi";
import { CgProfile, CgMenuGridR } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { RiProfileLine , RiLogoutCircleLine} from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { FaAngleDown, FaCircle } from "react-icons/fa";
import './Apps.css'
import Studentinfo from './Addstudent';
import Dashboards from './Dashb_content';
import AddAttendance from './AddAttendance';
import CashIn from './CashIn';
import GSTbilling from './GSTbilling';
import Master from './Master';
import ViewEmp from './ViewEmp';
import Addemp from './Addemp';
import Customer from './Customer';
import Viewstudent from './Viewstudent.js';
import ViewAttendance from './ViewAttendance';
import GST from './GST.js';
import Nongst from './Nongst.js';
import "./studentsinfo.css"
import axios from 'axios'
import { MdDelete, MdEdit, MdOutlineFileDownloadDone} from "react-icons/md";
import { GrView } from "react-icons/gr";
import { PiUsersThreeFill } from "react-icons/pi";
import Modal from 'react-modal';
Modal.setAppElement('#root');


const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentContent, setCurrentContent] = useState('viewemp');
    const [openSection, setOpenSection] = useState(null);
    const Navigate = useNavigate()
    const [viewEmpDetails, setViewEmpDetails] = useState(false); // State to manage details visibility

    useEffect(() => {
      // Check if token is available (e.g., in local storage)
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login page if token is not available
        Navigate('/');
      }
    }, []);
    
    
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
    const handleStudentInfoClick = () => {
      setCurrentContent('studentinfo');
    };
    const handleDashboardClick = () => {
      setCurrentContent('dashboards');
    };

    const handleAttendanceClick = () => {
      setCurrentContent('attendance');
    };
    const handleReceiptClick = () => {
      setCurrentContent('cashin');
    };
  
    const handleGSTbillingClick = () => {
      setCurrentContent('customer');
    };
  
    const handleMasterClick = () => {
      setCurrentContent('master');
    };
    const handleEmpinfo = () => {
      setCurrentContent('empinfo');
    };
    const handleViewstudent = () => {
      setCurrentContent('viewstudent');
    };
    const handleViewEmp = () => {
      setCurrentContent('viewemp');
    };
    const handleViewAttendance = () => {
      setCurrentContent('viewAttendance');
    };
    const handleGST = () => {
      setCurrentContent('gst');
    };
    const handleNongst = () => {
      setCurrentContent('nongst');
    };
    const handleViewEmpDetails = () => {
      setCurrentContent('viewemp');
      setViewEmpDetails(true); // Show details when "View Employee" is clicked
    };
  
    return (
      <div className={`wrapper ${showSidebar ? 'sidebar-collapse' : ''}`}>
        
      <Sidebar handleStudentInfoClick={handleStudentInfoClick} handleDashboardClick={handleDashboardClick}
      handleAttendanceClick={handleAttendanceClick}
      handleReceiptClick={handleReceiptClick}
      handleGSTbillingClick={handleGSTbillingClick}
      handleMasterClick={handleMasterClick}
      toggleSidebar={toggleSidebar}
      handleEmpinfo={handleEmpinfo}       
      handleViewstudent={handleViewstudent}
      handleViewEmp={handleViewEmp}
      handleViewAttendance={handleViewAttendance}
      handleGST={handleGST}
      handleNongst={handleNongst}
      openSection={openSection}
        setOpenSection={setOpenSection}
        showSidebar={showSidebar}
        handleViewEmpDetails={handleViewEmpDetails}

      />
    
      
      <div className="content-wrapper">
        {currentContent === 'dashboards' ? <Dashboards /> :
          currentContent === 'studentinfo' ? <Studentinfo /> :
          currentContent === 'viewstudent' ? <Viewstudent /> :
        //   currentContent === 'viewemp' ? <ViewEmp /> :
          currentContent === 'empinfo' ? <Addemp /> :
            currentContent === 'attendance' ? <AddAttendance /> :
            currentContent === 'viewAttendance' ? <ViewAttendance /> :
            currentContent === 'viewemp' ? <ViewEmpDetails/>:
              currentContent === 'cashin' ? <CashIn /> :
              currentContent === 'gst' ? <GST /> :
              currentContent === 'nongst' ? <Nongst /> :
                currentContent === 'customer' ? <Customer /> :
                  <Master />
        }
      </div>
    </div>
    );
  }
  
  function Sidebar({toggleSidebar,handleEmpinfo, openSection,
    setOpenSection,showSidebar,handleViewstudent,handleViewEmp,handleViewAttendance,
     handleDashboardClick,handleStudentInfoClick,handleGST,handleNongst,
    handleAttendanceClick,handleReceiptClick,handleGSTbillingClick,handleMasterClick,handleViewEmpDetails
  }) 
    
    
  {
    const handleLogout = () => {
      localStorage.removeItem('token');
      Navigate("/")
      // Add any other logout logic (e.g., redirect to login page)
    };
    const setDarkmode=()=>{
      document.querySelector("body").setAttribute('data-theme', 'dark')
    }
    const setLightmode=()=>{
      document.querySelector("body").setAttribute('data-theme', 'light')
    }
    const toggleSection = (section) => {
      setOpenSection(openSection === section ? null : section);
    }
  const toggleTheme=(e)=>{
    if(e.target.checked) setDarkmode()
    else setLightmode()
  }
    const Navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    return (
      
      <div className={`main-sidebar ${showSidebar && 'active'}`}
      >
        
        <div className={`menu ${showSidebar && "active"}`}>
          <IoMenu id='logomenu' className="nav-link" onClick={toggleSidebar}/>
          <div id='logodiv'  className='logos'>  <p >
        <BiLogoJquery id='logo' /><sup className='mpc'>MPC</sup>
        </p>
        
        {/* <button>Logout</button> */}
        </div>
        <div className='adminlogowitstatus'>
        <p className='adminstatus'><CgProfile className='adminicon'/><span className='adminsmal'>Admin</span>  
        <br/><span><FaCircle className='circle'/> </span><span className='chief'> Chief Executive Officer</span> </p>
        </div>
      <div className="sidebar">
        <nav >
          <ul>
            
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleDashboardClick}>
              <CgMenuGridR id='icons' /> <span className='dashb'>Dashboard</span>
                
              </a>
            </li>
            <li className="nav-item">
            <CgProfile className='icons'/> <span >Student Info{''} <FaAngleDown
                className={`togglebtn ${openSection === 'student' ? 'rotate' : ''}`}
                onClick={() => toggleSection('student')}
                /></span>
                </li>
                {openSection === 'student' && (
                <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleStudentInfoClick}>
        Add Student
        </div>
        <div className='sidebar-content' onClick={handleViewstudent}>
          View Student
          </div>
        </div>
       
        </>
                )}
            <li className="nav-item">
            <ImProfile className='icons' /> <span >Employee Info <FaAngleDown
                 className={`togglebtn ${openSection === 'employee' ? 'rotate' : ''}`}
                onClick={() => toggleSection('employee')}
                /></span>
                </li>
                {openSection === 'employee' && (
                <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleEmpinfo}>
        Add Employee
        </div>
        <div className='sidebar-content' onClick={handleViewEmp}>
          View Employee
          </div>
        </div>
        </>
                )}
            <li className="nav-item">
            <BsGraphUpArrow className='icons'/> <span >Attendance <FaAngleDown
                 className={`togglebtn ${openSection === 'attendance' ? 'rotate' : ''}`}
                 onClick={() => toggleSection('attendance')}
                /></span>
                </li>
                {openSection === 'attendance' && (
                <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleAttendanceClick}>
        Add Attendance
        </div>
        <div className='sidebar-content' onClick={handleViewAttendance}>
          View Attendance
          </div>
        </div>
        </>
                )}
            <li className="nav-item">
            <FaRegMessage className='icons'/> <span >Receipt <FaAngleDown
                 className={`togglebtn ${openSection === 'receipt' ? 'rotate' : ''}`}
                 onClick={() => toggleSection('receipt')}
                /></span>
                </li>
                {openSection === 'receipt' && (
                <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleReceiptClick}>
        Cash In
        </div>
        </div>
        </>
                )}
            <li className="nav-item">
            <FaLock className='icons'/> <span >GST Billing <FaAngleDown
                className={`togglebtn ${openSection === 'gst' ? 'rotate' : ''}`}
                onClick={() => toggleSection('gst')}
                /></span>
                </li>
                {openSection === 'gst' && (
                  <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleGSTbillingClick}>
        Customer
        </div>
        <div className='sidebar-content' onClick={handleGST}>
          GST
          </div>
          <div className='sidebar-content' onClick={handleNongst}>
          Non-GST
          </div>
        </div>
        </>
                )}
            <li className="nav-item">
            <RiProfileLine className='icons'/> <span >Master <FaAngleDown
                 className={`togglebtn ${openSection === 'master' ? 'rotate' : ''}`}
                 onClick={() => toggleSection('master')}
                /></span>
                </li>
                {openSection === 'master' && (
                  <>
                <div className='sidebarcon'>
                 <div className='sidebar-content' onClick={handleMasterClick}>
         Master
        </div>
        </div>
        </>
                )}
                <li className="nav-item" onClick={handleLogout}><RiLogoutCircleLine className='icons'/><span className='logoutcon'>Logout</span></li>
          </ul>
        </nav>
      </div>
      </div>
      <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
               
            </label>
        </div>
    </div>
    
    );
  }

  const ViewEmpDetails = () => {
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

//   useEffect(()=>{
   
//     axios.get(get_data).then((res)=>{
//          setData(res.data)
//      console.log(res.data);
//     })
     
//   }, [])

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
 // Append other fields in a similar manner
 
 // Check if HSC qualification is checked
 if (isChecked) {
   formData.append("hscMarks", hscMarks);
   formData.append("hscSclName", hscSclName);
   formData.append("hscPoy", hscPoy);
   formData.append("hscPercentage", hscPercentage);
 }

 // Check if Diploma qualification is checked
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
       <p><span className='inputhandle'>Contact: </span><input type="number" required className='form-control fstname' value={contact} onChange={(e)=>{
         setcontact(e.target.value)}}/></p>
       <p><span className='inputhandle'>Father Number: </span><input type="number" required className='form-control fstname' value={fatherNumber} onChange={(e)=>{
         setfathernumber(e.target.value)}}/></p>

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
        <span className='checks'> <span className='checkbox1'><input checked ={qualification === 'diploma'}  type="checkbox"  
        onChange={handleDlmo}
        />Diploma</span></span></p>
            
         {
           isChecked && (
             <p><span className='inputhandle'>HSC Marks: </span><input type="number" required className='form-control fstname' value={hscMarks} onChange={(e)=>{
               setHscMarks(e.target.value)}}/></p>
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
                 <p><span className='inputhandle'>HSC Passed Out Year: </span><input type="number" required className='form-control fstname' value={hscPoy} onChange={(e)=>{
                   setHscPoy(e.target.value)}}/></p>
               )
              }
               {
               isChecked && (
                 <p><span className='inputhandle'>HSC Percentage: </span><input type="text" required className='form-control fstname' value={hscPercentage} onChange={(e)=>{
                         setHscPercentage(e.target.value)}}/></p>
               )
              }
              {
               isCheckedSec && (
                 <p><span className='inputhandle'>Diploma Marks: </span><input type="text" required className='form-control fstname' value={dipMarks} onChange={(e)=>{
                   setDipMarks(e.target.value)}}/></p>
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
           <p><span className='inputhandle'>Diploma POY: </span><input type="text" required className='form-control fstname' value={dipPoy} onChange={(e)=>{
             setDipPoy(e.target.value)}}/></p>
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
           <p><span className='inputhandle'>Diploma Percentage: </span><input type="text" required className='form-control fstname' value={dipPercentage} onChange={(e)=>{
             setDipPercentage(e.target.value)}}/></p>
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
       <p><span className='inputhandle'>CGPA (Percentage): </span><input type="number" required className='form-control fstname' value={CgpaPercentage} onChange={(e)=>{
         setcgpapercentage(e.target.value)}}/></p>
       <p><span className='inputhandle'>Passedout Year: </span><input type="number" required className='form-control fstname' value={passedOutyear} onChange={(e)=>{
         setpassedoutyear(e.target.value)}}/></p>
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
  
export default Dashboard