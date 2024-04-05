import './styles/list.css';
import abiJson from './contracts/Freelancing.json';
import {address} from './config.js'
import { ethers } from 'ethers';

const JobList = ({job})=>{
    // job.map(el=>console.log(el));
    //         uint256 id;
    // function selectJob(uint256 id, address lancer, string calldata name, bool status) public {

    async function Jobselection(id,lancer){
        if(window.ethereum){
            try{
                
                const provider = new ethers.BrowserProvider(window.ethereum); 
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abiJson.abi,
                    signer
                )
                const data = await contract.selectJob(id, lancer, "Jayakanth", true);
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        } 
    }
    // console.log(job[0])
    return(
        <>
        <div className="list-container">
            {Object.values(job).filter((el)=>el!==true).map((el, idx)=>{
                console.log("h  :", el.toString());
                return <li onClick={()=>Jobselection(job[0],job[5])} 
                className="li" key={idx}>{el.toString()}</li>
            }
            )}
        </div>
        </>)

        // string jobName;
        // string jobDescription;
        // Selection progress; bool isSelected;
        // address lancer;
        // uint256 amount;
}
export default JobList;
