import React, { useEffect, useState } from 'react'
import "./studentsinfo.css"
import axios from 'axios'
import { MdDelete, MdEdit, MdOutlineFileDownloadDone} from "react-icons/md";
import { GrView } from "react-icons/gr";
import { edit_data, get_emp } from '../URL/url';
import { Link, useNavigate } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ViewEmp = ({img}) => {
   const [employee, setEmployee] = useState(null);
  const [search, setSearch] = useState([])
  const [ref, setRef] = useState(true)
  const [editMode, setEditMode] = useState([]);
  const [editedData, setEditedData] = useState({});
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
  const navigate = useNavigate(); 
  const [data, setData] = useState([])
  const [imgemp, setimgemp] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleIdStd = (id) => {
    const selected = data.find(student => student._id === id);
    setSelectedStudent(selected);
    setModalIsOpen(true); 
  };

  const closePopup = () => {
    setSelectedStudent(null);
    setModalIsOpen(false);
  };
  const Navigate = useNavigate()

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    if (!token) {
        
        Navigate("/")
    }
}, []);
  useEffect(() => {
    axios.get("http://localhost:5001/api/getempimg").then((res) => {
      console.log(res.data);
      setData(res.data);

    });
  }, [ref])


    const handleSaveEdit = (v)=>{
    
    axios.put(`${"http://localhost:5001/api/empedit"}/${v._id}`, editedData, {
      empFirstname,
      empLastname,
      empFatherName,
      empMotherName,
      emp_dob,
      emp_email,
      emp_contact,
      emp_desg,
      emp_salary,
      emp_joindate,
      emp_reldate,
      emp_exp
    })
   .then((res)=>{
    setEmpfname('')
    setEmplname('')
    setEmpfatherName('')
    setEmpmotherName('')
    setEmpdob('')
    setEmpemail('')
    setEmpcontact('')
    setEmpdesti('')
    setEmpslaray('')
    setEmpdoj('')
    setEmpdor('')
    setEmpexp('')
    console.log(res)})
   .catch((err)=>{console.log(err)})
   setRef(!ref)
  }

const handleDeleteRow = (v)=>{
   
  axios.delete(`${"http://localhost:5001/api/empdelete"}/${v._id}`).then((res)=>console.log(res))
  setRef(!ref)
  console.log(v);
}
  const handleInputChange = (e) => {  
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
    
  };
  const handleEditRow = (id) => {
    setEditMode(id);
    const selectedItem = data.find((item) => item._id === id);
    setEditedData(selectedItem);
    console.log(id);
  }
 
  const addEmp=()=>{
    navigate ("/addEmp")
  }
  const empcreate=()=>{
    navigate ("/addemployee")
  }
  const handleSearchInputChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = data ? data.slice(startIndex, endIndex) : [];


const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div id='mainssss'>
      <span className='emplogo' onClick={addEmp} ><Link to='haddStusent' className='cash'><PiUsersThreeFill /></Link>
Add Employee </span>
     <span className='emplogos'  ><Link to='hviewstd' className='cash'><PiUsersThreeFill /></Link>
     View Employee
     </span>
     <div><input type="text" placeholder='Search' id='search' value={search}
     onChange={handleSearchInputChange} /></div>
      <div id='tablma' className='tablemains'>
       <table className='listtab'>
          <tr className='headth'>
          <th>ID</th>
             <th>Photo</th>
             <th>FirtName</th>
             <th>LastName</th>
             <th>Fathername</th>
             <th>MotherName</th>
             <th>DOB</th>
             <th>Email</th>
             <th>Contact</th>
             <th>Designation</th>
             <th>Salary</th>
             <th>Date of joining date</th>
             <th>Date of relieving date</th>
             <th>Expereince</th>
             <th>Actions</th>
           </tr>
          <tbody id='tablemap'>
      
      {data && currentItems.map((v) => {
              if (
                search === '' ||
                Object.values(v).some(
                  (val) =>
                    typeof val === 'string' && val.toLowerCase().includes(search)
                )
              ) 
              {
                return (
                  <tr key={v._id}>
                <td onClick={() => handleIdStd(v._id)}>{v._id}</td>
                <td>
                  
                    <img className='imgstd' src={require(`./images/1714932012155-Screenshot 2024-05-05 232904.png`)} width="100px" height="100px"/>
                 
                
                </td>
                <td>{editMode === v._id ? <input type="text" name="empFirstname" value={editedData.empFirstname} 
                  onChange={handleInputChange} /> : v.empFirstname}</td>
                   <td>{editMode === v._id ? <input type="text" name="empLastname" value={editedData.empLastname} 
                  onChange={handleInputChange} /> : v.empLastname}</td>
                   <td>{editMode === v._id ? <input type="text" name="empFatherName" value={editedData.empFatherName} 
                  onChange={handleInputChange} /> : v.empFatherName}</td>
                  <td>{editMode === v._id ? <input type="text" name="empMotherName" value={editedData.empMotherName} 
                  onChange={handleInputChange} /> : v.empMotherName}</td>
                  <td>{editMode === v._id ? <input type="date" name="emp_dob" value={editedData.emp_dob} 
                  onChange={handleInputChange} /> : v.emp_dob}</td>
                   <td>{editMode === v._id ? <input type="email" name="emp_email" value={editedData.emp_email} 
                  onChange={handleInputChange} /> : v.emp_email}</td>
                   <td>{editMode === v._id ? <input type="number" name="emp_contact" value={editedData.emp_contact} 
                  onChange={handleInputChange} /> : v.emp_contact}</td>
                  <td>{editMode === v._id ? <input type="text" name="emp_desg" value={editedData.emp_desg} 
                  onChange={handleInputChange} /> : v.emp_desg}</td>
                  <td>{editMode === v._id ? <input type="text" name="emp_salary" value={editedData.emp_salary} 
                  onChange={handleInputChange} /> : v.emp_salary}</td>
                   <td>{editMode === v._id ? <input type="date" name="emp_joindate" value={editedData.emp_joindate} 
                  onChange={handleInputChange} /> : v.emp_joindate}</td>
                  <td>{editMode === v._id ? <input type="date" name="emp_reldate" value={editedData.emp_reldate} 
                  onChange={handleInputChange} /> : v.emp_reldate}</td>
                  <td>{editMode === v._id ? <input type="number" name="emp_exp" value={editedData.emp_exp} 
                  onChange={handleInputChange} /> : v.emp_exp}</td>
                  <td>
                  <MdEdit className='delicon' id='cash' onClick={() => handleEditRow(v._id)} />
                  <MdOutlineFileDownloadDone className='saveicons' id='cash' onClick={()=>handleSaveEdit(v)}/>
                  <MdDelete className='deldelicons' id='cash' onClick={()=>handleDeleteRow(v)} />
                  <div onClick={() => handleIdStd(v._id)}>
               <span className='viewicon'>View </span><span><GrView className='viewstd'/></span>
               </div> 
                  </td>
                  
                </tr>
                );
              }
              return null;
            })}

          </tbody>
          </table>
          <div className='pagibtn'>
          {Array.from({ length: totalPages }, (_, index) => (
            <>
            <button  key={index} onClick={() => handlePaginationClick(index + 1)}>
              {index + 1}
            </button>
            </>
          ))}
        </div>
        <div id='popmodal'>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closePopup}
        contentLabel="Student Details"
        overlayClassName="modal-overlay"
        style={{
          content: {
            width:"900px",
            left: '750px', // Center the modal horizontally
            transform: 'translateX(-50%)', // Adjust to center the modal properly
          },
        }}
        // className="popmodal"
      >
        <div className="popup-content">
          <span className="close" onClick={closePopup}>&times;</span>
          {/* Render student details here */}
          {selectedStudent && (
            <>
            
             
            <img className='imgstdpop' src={require(`./images/1714932012155-Screenshot 2024-05-05 232904.png`) } 
              alt="employee" width="200px" height="200px"/>
              {/* Example: */}
              <div className='stdpop'>
              <h2>Employee Details</h2>
              <p>ID: {selectedStudent._id}</p>
              <p>Name: {selectedStudent.empFirstname} {selectedStudent.empLastname}</p>
              <p>FatherName: {selectedStudent.empFatherName}</p>
              <p>MotherName: {selectedStudent.empMotherName}</p>
              <p>Date of birth: {selectedStudent.emp_dob}</p>
              <p>Email: {selectedStudent.emp_email}</p>
              <p>Contact No: {selectedStudent.emp_contact}</p>
              <p>Designation: {selectedStudent. emp_desg}</p>
              <p>Salary: {selectedStudent.emp_salary}</p>
              <p>Joining Date: {selectedStudent.emp_joindate}</p>
              <p>Relieving Date: {selectedStudent.emp_reldate}</p>
              <p>Expereince: {selectedStudent.emp_exp}</p>
              </div>
              
              {/* Add other details */}
            </>
          )}
        </div>
      </Modal>
      </div>
    </div>
    </div>
  )
}

export default ViewEmp

