import React, {useEffect,useState } from 'react'
import './currency.css'
import axios from "axios";
import logo from './assets/imag/currency.png'

const Currency = () => {
    const [amount,setamount]=useState(1);
    const [fromcurrency,setfromcurrency]=useState("USD"); 
    const [tocurrency,settocurrency]=useState("INR"); 
    const [convertedcurrency,setconvertedcurrency]=useState(null); 
    const [exchangerate,setexchangerate]=useState(null);

    const [ curr, setCurr ] = useState( {} );

    useEffect(()=>{
        const getexchangerate= async () =>{
          try{  
           let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
           const response= await axios.get(url);
           console.log(response);
           setCurr( response.data.rates );
           setexchangerate(response.data.rates[tocurrency]);
          }catch(error){
            console.log("The error has occured to convert amount broo.. sorry😭😭",error);
          }
        };
       getexchangerate();
    },[fromcurrency,tocurrency]
  );

    useEffect(()=>{
      if(exchangerate!==null){
        setconvertedcurrency((amount*exchangerate).toFixed(2));
      }
    },[amount,exchangerate]
   );

    const handleamount = (e) =>{
        const value =parseFloat(e.target.value);
        setamount(isNaN(value)?0:value);
    }
    const handlefromcurrency =(e)=>{
         setfromcurrency(e.target.value);
    }
    const handletocurrency =(e)=>{
        settocurrency(e.target.value);
    }
  return (
    <div className='content'>
        <img className="logo" src={logo}/>
        <h3 className='dotted'>------------------------------------</h3>
        <h3 className='heading'>CURRENCY CONVERTOR</h3>
        <h3 className='dotted'>------------------------------------</h3>
        <label htmlFor="amount">Amount :</label>
        <input type="number" id="amount" value={amount} onChange={handleamount} placeholder="Enter the amount broo..."/>
        <div className="inpbox">
            <label htmlFor="fromcur">From currency:</label><br />
            <select id='fromcurr' onChange={handlefromcurrency} value={fromcurrency}>
                <option value="USD">USD-United states dollar</option>
                <option value="EUR">EUR-Euro</option>
                <option value="GBP">GBP-British pound sterling</option>
                <option value="JPY">JPY-Japanese yen</option>
                <option value="AUD">AUD-Australian dollar</option>
                <option value="CAD">CAD-Canadian dollar</option>
                <option value="CNY">CNY-Chinese yuan</option>
                <option value="INR">INR-Indian ruppee</option>
                <option value="BRL">BRL-Brazilian real</option>
                <option value="ZAR">ZAR-south african rand</option>
            </select>
        </div>
        <div className="outbox">
            <label htmlFor="tocur">To currency:</label><br />
            <select id='tocurr' onChange={handletocurrency} value={tocurrency}>
                <option value="USD">USD-United states dollar</option>
                <option value="EUR">EUR-Euro</option>
                <option value="GBP">GBP-British pound sterling</option>
                <option value="JPY">JPY-Japanese yen</option>
                <option value="AUD">AUD-Australian dollar</option>
                <option value="CAD">CAD-Canadian dollar</option>
                <option value="CNY">CNY-Chinese yuan</option>
                <option value="INR">INR-Indian ruppee</option>
                <option value="BRL">BRL-Brazilian real</option>
                <option value="ZAR">ZAR-south african rand</option>
            </select>
        </div>
        <h5 className='footer'>{amount} {fromcurrency}  is equal to {convertedcurrency} {tocurrency}</h5>
    </div>
  )
}

export default Currency
