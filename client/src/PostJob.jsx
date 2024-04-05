import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';

import {address} from './config.js'
function PostJob(){
    const handleSubmit = async (event)=>{
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const jobName = formData.get('jobName');
        const jobDescription = formData.get('jobDescription');
        const stipend = parseInt(formData.get('stipend')); 
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum); 
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abiJson.abi,
                    signer
                )
                let data = contract.postJob(jobName, jobDescription,0,true,stipend);
                console.log(data);
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        } 

    }
return (
        <div className="job-post">
            <form onSubmit={handleSubmit} action="" className="form-container">
                <div className="form-line">
                    <label htmlFor="jobName">Enter job name:</label>
                    <input type="text" id="jobName" name="jobName" />
                </div>
                <div className="form-line">
                    <label htmlFor="jobDescription">Enter job description:</label>
                    <input type="text" id="jobDescription" name="jobDescription" />
                </div>
                <div className="form-line">
                    <label htmlFor="stipend">Enter stipend:</label>
                    <input type="number" id="stipend" name="stipend" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );}
    // function postJob(string calldata jobName, string calldata jobDescription, Selection _progress, bool isSelected, uint256 amount) public{

export default PostJob;
