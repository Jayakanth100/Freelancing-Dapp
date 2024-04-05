import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';
import {address} from './config.js';
const FreelancerList = ()=>{
    const [lancers, setLancer] = useState("");
    const getLancers = async()=>{
        // const contract = getContract();
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum); 
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abiJson.abi,
                    signer
                )
                const data = contract.getAllFreelancers();
                setLancer(data);
                // console.log("Hello: ", lancers);
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        }

    } 
    getLancers();
  return (
      <>                
      <div>Hello</div>
      {
          Object.values(lancers).map((lancer, idx)=><div>hello</div>)
      } 
      </>
  );
}
export default FreelancerList;

