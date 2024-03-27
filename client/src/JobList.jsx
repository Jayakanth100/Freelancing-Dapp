import './styles/list.css';
import abiJson from './contracts/freelancing.json';
const address = `0x0DD95CcD58d91452b4e816eA73e254960a021917`;
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
                const data = await contract.selectJob(id,lancer,"Jayakanth", false);
                // console.log(data);
                // console.log(Object.values(data)[0].jobName);
                // console.log(data.jobName);
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
            {Object.values(job).map((el, idx)=>
                <li onClick={()=>Jobselection(job[0],job[5])} 
                className="li" key={idx}>{el}</li>
            )}
        </div>
        </>)

        // string jobName;
        // string jobDescription;
        // Selection progress;
        // bool isSelected;
        // address lancer;
        // uint256 amount;
}
export default JobList;
