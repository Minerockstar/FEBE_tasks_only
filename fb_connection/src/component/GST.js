import React, { useEffect, useRef, useState } from 'react'
import './GST.css'
import { BiLogoJquery } from "react-icons/bi";
import {useReactToPrint} from 'react-to-print'
import { AiFillPlusSquare } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { customer_create, customer_get } from '../URL/url';
import axios from 'axios';

const GST = () => {
  const printRef = useRef()
  const [value1, setValue1] = useState('');
  const [ref, setRef] = useState(true)
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState('');
  const [total, setTotal] = useState(0);
  const gstPercentage = 10;
  const [gstAmount, setGstAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [data, seData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(()=>{
    axios.get(customer_get).then((res)=>{
     console.log(res.data);
     seData(res.data)
    })
  }, [ref])
  
    const generateRandomNumber = () => {
      return Math.floor(Math.random() * 10000);
    };
    useEffect(() => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth()).toString().padStart(2, '0')
      // const day = currentDate.getDate().toString().padStart(2); 
      const randomNumber = generateRandomNumber(); 
      const newInvoiceNumber = `MPC${year}${month}-${randomNumber}`;
      setInvoiceNumber(newInvoiceNumber);
    }, []); 

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);


  const handlePrint = useReactToPrint({
    content: ()=> printRef.current
  })
  const handleAddItem = () => {
    setItems([...items,  { quantity: '', price: '', total: 0 }]);
  };
  const handleInputChange = (index, field, value) => {
    
    const newItems = [...items ];
    newItems[index][field] = value;
    newItems[index].total = parseFloat(newItems[index].quantity) * parseFloat(newItems[index].price);
    setItems(newItems);
    updateTotal(newItems);
  }

  const updateTotal = (items) => {
    let sum = 0;
    items.forEach(item => {
      sum += item.total || 0;
    });
    setTotal(sum);
  }
  const deleteRow = (id)=>{
        setItems(items.filter(item=> item.id !== id))
  }
  const handleChangeValue1 = (event) => {
    const newValue = event.target.value;
    setValue1(newValue);
    calculateResult(newValue,value2);
  };

  const handleChangeValue2 = (event) => {
    const newValue = event.target.value;
    setValue2(newValue);
    calculateResult(value1, newValue);
  };
 

  const calculateResult = (val1, val2) => {
    const product = parseFloat(val1) * parseFloat(val2);
    const gst = product * (gstPercentage / 100);
    setResult(isNaN(product) ? '' : product);
    // Set the GST amount to 10% of the total amount
    setGstAmount(product * (gstPercentage / 100));
  };
  


  const handleCustomerSelect = (customerName) => {
    const customer = data.find(item => item.customerName === customerName);
    setSelectedCustomer(customer);
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    const numToWords = (num) => {
        let words = '';
        let scaleIndex = 0; // Track the current scale index
        while (num > 0) {
            if (num % 1000 !== 0) {
                words = convertHundreds(num % 1000) + ' ' + scales[scaleIndex] + ' ' + words;
            }
            num = Math.floor(num / 1000);
            scaleIndex++;
        }
        return words.trim();
    };

    const convertHundreds = (num) => {
        let words = '';
        if (num >= 100) {
            words += ones[Math.floor(num / 100)] + ' Hundred ';
            num %= 100;
        }
        if (num >= 10 && num <= 19) {
            words += teens[num - 10] + ' ';
            return words;
        } else if (num >= 20) {
            words += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        }
        if (num > 0) {
            words += ones[num] + ' ';
        }
        return words;
    };

    if (num === 0) return 'Zero';
    return numToWords(num);
};



  return (
    <div  className='gst'>
     <div ref={printRef} className='gstcolor'>
      <div className='bill'>
        <h1>ESTIMATED BILL</h1>
      <h3>MPC Limited</h3>
      <p>No: 29, 2nd floor, Siva Complex, AVR Circle, Salem-586990, Phone No: 7946767963, 97474249011.</p>
      <h4>INVOICE TO:</h4>
      <select
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          handleCustomerSelect(e.target.value); // Fetch customer details when an option is selected
        }}
        
      >
        <option className='detailcus' value="">Select an option</option>
        {data.map((v) => (
          <option key={v._id} value={v.customerName}>
                        {v.customerName}
          </option>
        ))}
      </select>
      {selectedCustomer && ( 
  <div id='customer-details'>
    <li>{selectedCustomer.address},</li>
    <li> {selectedCustomer.state},</li>
    <li> {selectedCustomer.phoneNum},</li>
    <li>{selectedCustomer.gstin}.</li>
  </div>
)}
        </div>
        <div  className='logoimgs'><p >
        <BiLogoJquery className='logoimg' /><sup className='mpclogo'>MPC</sup>
        </p></div>
   <div className='invoicegst'>
    <label>
      <input type='date' value={selectedDate} // Set the value of the input field
          onChange={(e) => setSelectedDate(e.target.value)}/>
    </label>
    <p><strong>Invoice No:</strong>{invoiceNumber}</p>
    {selectedCustomer && ( 
  <div id='customer-details'>
    <p><strong>GSTIN:</strong>{selectedCustomer.gstin}</p>
  </div>
)}
   </div>
   <div className='buzzz'>
   <table className='businessreq'>
          <tr>
            <th>S.no</th>
            <th>Descrription</th>
            <th>QTY</th>
            <th>Unit Price</th>
            <th>Total Amount</th>
            <th>Action</th>
                   </tr>
                   <tr>
            <td>1.</td>
            <td colSpan='2'><input /><input  value={value1} onChange={handleChangeValue1} className='insecond'/></td>
            <td><input value={value2} onChange={handleChangeValue2} type='number'/></td>
            <td>{result}.00</td>
            {/* value={value1} onChange={handleChangeValue1} */}
            {/* value={result.quantity} onChange={(e) => handleInputChange(e.target.value)} */}
            <td ><AiFillPlusSquare onClick={handleAddItem}  className='plusicon' /></td>
                   </tr>
                     
                   <tbody>
                   {items.map((item, index) => (
            <tr key={index}>
              <td>2.</td>
              <td colSpan='2'>
                <input
                  type='text'
                />
                 <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td><input 
              type="number"
              value={item.price}
              onChange={(e) => handleInputChange(index, 'price', e.target.value)}
             /></td>
              <td className='zero'>{total.toFixed(2)}</td>
              <td>
                 <MdDelete className='delicons' onClick={()=>deleteRow(index.id)} />
              </td>
            </tr>
          ))}
          </tbody>
          
                   <div className='total'>
                    
                   <tr>
                   <td className='totlo'>TOTAL</td>
                   <td className='zero'>{result}.00</td>
                   </tr>
                   <tr >
                   <td className='totlo'>GST 10%</td>
                   <td className='zero'>{gstAmount.toFixed(2)}</td>
                   </tr>
                   <tr>
                   <td className='totlo'>Finalt Total</td>
                   <td className='zero'>{(parseFloat(result) + parseFloat(gstAmount)).toFixed(2)}</td>
                   </tr>
                   </div>
                   
        </table>
        <div className='words'>
        <p>TOTAL (In Words) : {numberToWords(parseFloat(result) + parseFloat(gstAmount)).toUpperCase()}</p>
  <h3>THANK YOU FOR YOUR BUSINESS!</h3>

  <button className='printbtn' onClick={handlePrint}>Print</button>
        </div>
       
  </div>
 
      </div>
      
  
    </div>
  )
}

export default GST
