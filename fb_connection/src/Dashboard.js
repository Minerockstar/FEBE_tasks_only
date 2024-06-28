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
import './App.css'
import Studentinfo from './component/Addstudent';
import Dashboards from './component/Dashb_content';
import AddAttendance from './component/AddAttendance';
import CashIn from './component/CashIn';
import GSTbilling from './component/GSTbilling';
import Master from './component/Master';
import ViewEmp from './component/ViewEmp';
import Addemp from './component/Addemp';
import Customer from './component/Customer';
import Viewstudent from './component/Viewstudent.js';
import ViewAttendance from './component/ViewAttendance';
import GST from './component/GST.js';
import Nongst from './component/Nongst.js';


const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentContent, setCurrentContent] = useState('dashboards');
    const [openSection, setOpenSection] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const Navigate = useNavigate()
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
      />
    
      
      <div className="content-wrapper">
        {currentContent === 'dashboards' ? <Dashboards /> :
          currentContent === 'studentinfo' ? <Studentinfo /> :
          currentContent === 'viewstudent' ? <Viewstudent /> :
          currentContent === 'viewemp' ? <ViewEmp /> :
          currentContent === 'empinfo' ? <Addemp /> :
            currentContent === 'attendance' ? <AddAttendance /> :
            currentContent === 'viewAttendance' ? <ViewAttendance /> :
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
    handleAttendanceClick,handleReceiptClick,handleGSTbillingClick,handleMasterClick
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

export default Dashboard
