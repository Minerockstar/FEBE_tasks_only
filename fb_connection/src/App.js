import './App.css';
import Dashboard from './Dashboard';
import LoginPage from './Login';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Signup from './Signup';
import ForgotPsw from './ForgotPsw';
import Viewstudent from './component/Viewstudent.js';
import { useState } from 'react';
// import ViewEmp from './component/ViewEmp.js';
import ViewEmpdetails from './component/ViewEmpdetails.js'
import Addempdetails from './component/Addempdetails.js';
import ViewstdDetails from './component/ViewstdDetails.js';
import AddstdDetails from './component/AddstdDetails.js';



const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., by checking token existence)
  const token = localStorage.getItem('token');
  return !!token;
};
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <BrowserRouter>
<div>
   <div>
   <Routes>
   
   <Route path='/' element={<LoginPage/>}/> 
     <Route path='/dashborad' element={<Dashboard/>}/> 
   <Route path='/forgot' element={<ForgotPsw/>}/>
   <Route path='/signup' element={<Signup/>}/>
   {/* <Route exact path='/viewstudent' element={<Viewstudent/>}/> */}
   {/* <Route path="/viewemployee" element={<ViewEmp/>} /> */}
   <Route path="/viewemp" element={<ViewEmpdetails/>} />
   <Route path="/addEmp" element={<Addempdetails/>} />
   <Route path="/viewstd" element={<ViewstdDetails/>} />
   <Route path="/addstd" element={<AddstdDetails/>} />
   </Routes>
   </div>
   </div>
   </BrowserRouter>
  );
}

export default App;


