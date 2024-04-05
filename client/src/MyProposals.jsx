import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';

import {address} from './config.js'
function MyProposals(){
    const [proposals, setProposals] = useState("");
    const getProposals = async()=>{
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum); 
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abiJson.abi,
                    signer
                )
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                console.log("This is my accoubnt: ", accounts[0]);
                const data = await contract.getAllProposals(accounts[0]);
                setProposals(data);
                console.log("Proposals: ", data);
                // console.log(Object.values(data)[0].jobName);
                // console.log(data.jobName);
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        } 
    }
    getProposals();
    
  return(
      <div>
      Hello
      </div>
  )
}

export default MyProposals;
