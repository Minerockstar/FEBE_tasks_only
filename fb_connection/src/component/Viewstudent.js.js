import React, { useEffect, useState } from 'react'
import "./studentsinfo.css"
import axios from 'axios'
import { MdDelete, MdEdit, MdOutlineFileDownloadDone} from "react-icons/md";
import { GrView } from "react-icons/gr";
import { edit_data } from '../URL/url';
import { PiUsersThreeFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');


const Viewstudent = ({img}) => {
  const [search, setSearch] = useState([])
  const [ref, setRef] = useState(true)
  const [editMode, setEditMode] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [firstname, setfirstname] = useState('')
     const [lastname, setlastname] = useState('')
     const [fatherName, setfathername] = useState('')
     const [motherName, setmothername] = useState('')
     const [address, setaddress] = useState('')
     const [dob, setdob] = useState('')
     const [contact, setcontact] = useState('')
     const [fatherNumber, setfathernumber] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('no')
     const [gender, setgender] = useState('')
     const [qualification, setqualification] = useState('')
     const [CgpaPercentage, setcgpapercentage] = useState('')
     const [passedOutyear, setpassedoutyear] = useState('')
     const fixedAmount = 30000;
     const [tAmount, settamount] = useState(fixedAmount)
     const [paidAmount, setpaidamount] = useState('')
     const [remainingAmount, setremainingamount] = useState('')
     const navigate = useNavigate();
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage] = useState(5); 
     const [selectedStudent, setSelectedStudent] = useState(null);
     const [modalIsOpen, setModalIsOpen] = useState(false); 

   
  
     const handleIdStd = (id) => {
      const selected = data.find(student => student._id === id);
      setSelectedStudent(selected);
      setModalIsOpen(true); // Open the modal when student is selected
    };
  
    const closePopup = () => {
      setSelectedStudent(null);
      setModalIsOpen(false); // Close the modal
    };
  

  const [data, setData] = useState()
  useEffect(() => {
    axios.get("http://localhost:5001/api/getimg").then((res) => {
      console.log(res.data);
      setData(res.data);

    });
  }, [ref])


  const handleSaveEdit = (v)=>{
    
    axios.put(`${"http://localhost:5001/api/update"}/${v._id}`, editedData, {
      firstname,
      lastname,
      fatherName,
      motherName,
      address,
      dob,
      contact,
      fatherNumber,
      maritalStatus,
      gender,
      qualification,
      CgpaPercentage,
      passedOutyear,
      tAmount,
      paidAmount,
      remainingAmount,
    })
   .then((res)=>{
    setfirstname('')
    setlastname('')
    setfathername('')
    setmothername('')
    setaddress('')
    setdob('')
    setcontact('')
    setfathernumber('')
    setMaritalStatus('')
    setgender('')
    setqualification('')
    setcgpapercentage('')
    setpassedoutyear('')
    settamount('')
    setpaidamount('')
    setremainingamount('')
    setEditMode(null);
    console.log(res)})
   .catch((err)=>{console.log(err)})
   
  }

const handleDeleteRow = (v)=>{
   
  axios.delete(`${"http://localhost:5001/api/delete"}/${v._id}`).then((res)=>console.log(res))
  
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
  };

  const stdview=()=>{
    navigate ("/viewstd")
  }
  const stdcreate=()=>{
    navigate ("/addstd")
  }
  // const handlePrevClick = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const handleNextClick = () => {
  //   if (currentPage < 1) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handleSearchInputChange = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearch(query);
  //   const filtered = data.filter((item) =>
  //     Object.values(item).some(
  //       (value) =>
  //         typeof value === 'string' && value.toLowerCase().includes(query)
  //     )
  //   );
  //   setFilteredData(filtered);
  // };
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
      <span className='emplogo' onClick={stdcreate}><Link className='cash'><PiUsersThreeFill /></Link>
Add Student </span>
     <span className='emplogos' onClick={stdview}><Link className='cash'><PiUsersThreeFill /></Link>
     View Student
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
            <th>Address</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Father No</th>
            <th>Marital Status</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>CgpaPercentage</th>
            <th>PassedOut Year</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Remaining Amount</th>
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
                <td>{editMode === v._id ? <input type="text" name="firstname" value={editedData.firstname} 
                onChange={handleInputChange} /> : v.firstname}</td>
                 <td>{editMode === v._id ? <input type="text" name="lastname" value={editedData.lastname} 
                onChange={handleInputChange} /> : v.lastname}</td>
                 <td>{editMode === v._id ? <input type="text" name="fatherName" value={editedData.fatherName} 
                onChange={handleInputChange} /> : v.fatherName}</td>
                 <td>{editMode === v._id ? <input type="text" name="motherName" value={editedData.motherName} 
                onChange={handleInputChange} /> : v.motherName}</td>
                <td>{editMode === v._id ? <input type="text" name="address" value={editedData.address} 
                onChange={handleInputChange} /> : v.address}</td>
                 <td>{editMode === v._id ? <input type="date" name="dob" value={editedData.dob} 
                onChange={handleInputChange} /> : v.dob}</td>
                 <td>{editMode === v._id ? <input type="number" name="contact" value={editedData.contact} 
                onChange={handleInputChange} /> : v.contact}</td>
                <td>{editMode === v._id ? <input type="number" name="fatherNumber" value={editedData.fatherNumber} 
                onChange={handleInputChange} /> : v.fatherNumber}</td>
                <td>{editMode === v._id ? <input type="text" name="maritalStatus" value={editedData.maritalStatus} 
                onChange={handleInputChange} /> : v.maritalStatus}</td>
                 <td>{editMode === v._id ? <input type="text" name="gender" value={editedData.gender} 
                onChange={handleInputChange} /> : v.gender}</td>
                <td>{editMode === v._id ? <input type="text" name="qualification" value={editedData.qualification} 
                onChange={handleInputChange} /> : v.qualification}</td>
                <td>{editMode === v._id ? <input type="number" name="CgpaPercentage" value={editedData.CgpaPercentage} 
                onChange={handleInputChange} /> : v.CgpaPercentage}</td>
                <td>{editMode === v._id ? <input type="number" name="passedOutyear" value={editedData.passedOutyear} 
                onChange={handleInputChange} /> : v.passedOutyear}</td>
                <td>{editMode === v._id ? <input type="number" name="tAmount" value={editedData.tAmount} 
                onChange={handleInputChange} /> : v.tAmount}</td>
                <td>{editMode === v._id ? <input type="number" name="paidAmount" value={editedData.paidAmount} 
                onChange={handleInputChange} /> : v.paidAmount}</td>
                <td>{editMode === v._id ? <input type="number" name="remainingAmount" value={editedData.remainingAmount} 
                onChange={handleInputChange} /> : v.remainingAmount}</td>
                
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
            
             
              {/* <img className='imgstdpop' src={require(`./images/${selectedStudent.imageUrl}`) } 
              alt="student" width="200px" height="200px"/> */}
               <img className='imgstdpop' src={require(`./images/1714932012155-Screenshot 2024-05-05 232904.png`)} 
              alt="student" width="200px" height="200px"/>
              {/* Example: */}
              <div className='stdpop'>
              <h2>Student Details</h2>
              <p>ID: {selectedStudent._id}</p>
              <p>Name: {selectedStudent.firstname} {selectedStudent.lastname}</p>
              <p>FatherName: {selectedStudent.fatherName}</p>
              <p>MotherName: {selectedStudent.motherName}</p>
              <p>Date of birth: {selectedStudent.dob}</p>
              <p>Contact No: {selectedStudent.contact}</p>
              <p>FatherNumber: {selectedStudent.fatherNumber}</p>
              <p>MaritalStatus: {selectedStudent.maritalStatus}</p>
              <p>Gender: {selectedStudent.gender}</p>
              <p>Qualification: {selectedStudent.qualification}</p>
              <p>Cgpa Percentage: {selectedStudent.CgpaPercentage}</p>
              <p>Passed Outyear: {selectedStudent.passedOutyear}</p>
              <p>Total Amount: {selectedStudent.tAmount}</p>
              <p>Paid Amount: {selectedStudent.paidAmount}</p>
              <p>HSC Marks: {selectedStudent.hscMarks}</p>
              <p>HSC School Name: {selectedStudent.hscSclName}</p>
              <p>HSC Passed out year: {selectedStudent.hscPoy}</p>
              <p>HSC Percentage: {selectedStudent.hscPercentage}</p>
              <p>Diploma Marks: {selectedStudent.dipMarks}</p>
              <p>Diploma College Name: {selectedStudent.dipClgName}</p>
              <p>Diploma Passed out year: {selectedStudent.dipPoy}</p>
              <p>Diploma Class: {selectedStudent.dipClass}</p>
              <p>Diploma Percentage: {selectedStudent.dipPercentage}</p>
              <p>Diploma Core: {selectedStudent.dipSpctn}</p>
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

export default Viewstudent