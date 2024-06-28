import React, { useEffect, useState } from 'react'
import { Route, Switch, useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import { BiLogoJquery } from "react-icons/bi";
import { CgProfile, CgMenuGridR } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { BsGraphUpArrow } from "react-icons/bs";
import axios from 'axios';
import { PiUsersThreeFill } from "react-icons/pi";
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


const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentContent, setCurrentContent] = useState('empinfo');
    const [openSection, setOpenSection] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const [addEmpDetails, setAddEmpDetails] = useState(false);
    const Navigate = useNavigate()
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
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
    const handleAddEmpDetails = () => {
        setCurrentContent('viewAddempdetails');
        setAddEmpDetails(true); // Show details when "View Employee" is clicked
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
        handleAddEmpDetails={handleAddEmpDetails}
      />
    
      
      <div className="content-wrapper">
        {currentContent === 'dashboards' ? <Dashboards /> :
          currentContent === 'studentinfo' ? <Studentinfo /> :
          currentContent === 'viewstudent' ? <Viewstudent /> :
          currentContent === 'viewemp' ? <ViewEmp /> :
          currentContent === 'empinfo' ? <Addemp /> :
            currentContent === 'attendance' ? <AddAttendance /> :
            currentContent === 'viewAttendance' ? <ViewAttendance /> :
            currentContent === 'viewAddempdetails' ? <ViewAddDetails /> :
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
    handleAttendanceClick,handleReceiptClick,handleGSTbillingClick,handleMasterClick,handleAddEmpDetails
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
                 <div className='sidebar-content' onClick={handleAddEmpDetails}>
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
const ViewAddDetails =()=>{
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
  const Navigate = useNavigate()

//   useEffect(()=>{
//     axios.get(get_emp).then((res)=>{
//      console.log(res.data);
//     })
//   }, [])
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate('/');
    }
  }, []);
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
  const empcreate=()=>{
    navigate ("/addEmp")
  }
  return (
    <div className='addstdadd'>

  <div className='colorprsadd'>
      <div className='addhdicon'>
        <h2>EMPLOYEE ENTRY FORM</h2>
      <span className='haddStusentemp' onClick={empcreate}><Link to='haddStusent' className='cashs'><PiUsersThreeFill /></Link>
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
          <p><span className='inputhandle'>Email: </span><input className='form-control fstname'  type='email' required value={emp_email} onChange={(e)=>{
          setEmpemail(e.target.value)}}/></p>
        <p><span className='inputhandle'>Contact: </span><input className='form-control fstname' required type='number' value={emp_contact} onChange={(e)=>{
          setEmpcontact(e.target.value)}}/></p>
        <p><span className='inputhandle'>Designation: </span><input className='form-control fstname' required value={emp_desg} onChange={(e)=>{
          setEmpdesti(e.target.value)}}/></p>
        <p><span className='inputhandle'>Salary: </span><input className='form-control fstname' required value={emp_salary} onChange={(e)=>{
          setEmpslaray(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Joining: </span><input className='form-control fstname' required type='date' value={emp_joindate} onChange={(e)=>{
          setEmpdoj(e.target.value)}}/></p>
        <p><span className='inputhandle'>Date of Relieving: </span><input className='form-control fstname' required type='date' value={emp_reldate} onChange={(e)=>{
          setEmpdor(e.target.value)}}/></p>
        <p><span className='inputhandle'>Experience: </span><input className='form-control fstname' required type='number' value={emp_exp} onChange={(e)=>{
          setEmpexp(e.target.value)}}/></p>
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
export default Dashboard
