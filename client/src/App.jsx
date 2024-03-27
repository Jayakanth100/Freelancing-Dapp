import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abiJson from './contracts/freelancing.json';
import JobListing from './JobListing.jsx';
import './styles/App.css';
const address = `0x0DD95CcD58d91452b4e816eA73e254960a021917`;

function App() {
    const [conData, setConData] = useState("");
    const [isActive, setActive] = useState(1);
    useEffect(()=>{
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
    },[])
    function toggleTab(tabVal){
        setActive(tabVal);
        console.log(tabVal);
    }

    return (
        <>
        <div className = "tab-container">
            <div className = "tab-name" onClick={()=>toggleTab(1)}>Find works</div>
            <div className = "tab-name" onClick={()=>toggleTab(2)}>Freelancers</div>
        </div>
        <div className="tab-content-container">
            <div className={isActive === 1 ? "tab tab-active": "tab"}>
                 <JobListing />
            </div>
            <div className={isActive === 2? "tab tab-active": "tab"}>Loading pls stfu</div>
        </div>
        </>
    );
}

export default App;

