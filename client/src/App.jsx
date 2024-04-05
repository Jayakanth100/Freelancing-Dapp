import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';
import Employer from './Employer.jsx';
import Login from './Login.jsx';
import Freelancer from './Freelancer.jsx';
import './styles/App.css';
import {address} from './config.js'
function App() {
  const [status, setStatus] = useState(0); // 0-login, 1-Employer, 2-freelancer
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => console.log(username, password), [username, password]);
  useEffect(() => {
    const connectAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (window.ethereum) {
            try {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(
                address,
                abiJson.abi,
                signer
              );
                const data = await contract.addFreelancers("Jaya");
                console.log("freelancer added status: ",data);
            } catch (error) {
              console.log("Error fetching contract data:", error);
            }
          }
        } catch (error) {
          console.log("Error connecting account:", error);
        }
      }
    };
    connectAccount();
  }, [])

    console.log(status);
  return (
     <> 
     <div className="tab">
        <div onClick={()=>setStatus(0)}>Login</div>
        <div onClick={()=>setStatus(1)}>FreeLancer</div>
        <div onClick={()=>setStatus(2)}>Employer</div>
     </div> 
      <Login/>
    <div className="tab-content-container">
      <Freelancer className={status === 1? "content-active freelancer-content": "content-inactive"}/>
        <Employer className={status === 2 ? "content-active employer-content": "content-inactive"}/>
    </div>
      </>
  );
}

export default App;

