import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abiJson from './contracts/freelancing.json';
import Employer from './Employer.jsx';
import Freelancer from './Freelancer.jsx';
import './styles/App.css';
const address = `0x0DD95CcD58d91452b4e816eA73e254960a021917`;

function App() {
  const [status, setStatus] = useState(2); // 0-login, 1-Employer, 2-freelancer
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

  const textChangeHandlerGenerator = (setStateFunction) => {
    return function(event) {
      setStateFunction(event.target.value);
    }
  }

  return (
    <div>
      {status === 0 ?
        <div>
          <label>username: </label>
          <input type='text' onChange={textChangeHandlerGenerator(setUsername)} />
          <label>password: </label>
          <input type='password' onChange={textChangeHandlerGenerator(setPassword)} />
          <button>login</button>
        </div>
        : status === 1 ?
          <Employer />
          : status === 2 ?
            <Freelancer /> : <div>Error: please contact admin</div>
      }
    </div>
  );
}

export default App;

