import React, { useState, useEffect } from 'react';
import JobList from "./JobList.jsx"

import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';
import {address} from './config.js'

const JobListing = ()=>{
    const [jobs, setJobs] = useState("");
    useEffect(()=>{
        const getJobs = async()=>{
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
                    const data = await contract.getJobs();
                    setJobs(data);
                    console.log("stipend: ",data);
                    // console.log(Object.values(data)[0].jobName);
                    // console.log(data.jobName);
                } 
                catch(err){
                    console.log("Error in ethereum connection: ", err);
                }
            } 
        }
        getJobs();
    },[])
    return (
        <>
        {
           Object.values(jobs).map((el,index)=><JobList key = {index} job={el}/>)
        }
        </>
    )
}
export default JobListing;
