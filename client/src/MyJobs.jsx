import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';
import './styles/list.css';

import {address} from './config.js'
function MyJobs(){
    const [myJobs, setMyJobs] = useState(null);
    const getMyjobs = async ()=>{
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

                const data = await contract.getMyJobs(accounts[0]);
                console.log(data);
                setMyJobs(Object.values(data));
                // const data = contract.getAllFreelancers();
                console.log("my jobs",data)
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        } 
    }
    useEffect(()=>getMyjobs,[]);

  return(
      <div>
      {
          myJobs?.map((el, idx)=>(
              <div className="list-container">
              {Object.values(el).map((e)=><div>{e}</div>)}
              </div>))
      }

        </div>);
}

export default MyJobs;
