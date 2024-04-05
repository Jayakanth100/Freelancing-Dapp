// SPDX-License-Identifier: MITp

pragma solidity  ^0.8.21;
// import "./escrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Freelancing is ERC20 {

    //structures
    struct Account{
        address addr;
        string Name;
        string Password;
    }
    struct Freelancer{
        uint256 lancer_id;
        string name;
        address lancer_address;
    }
    struct Job{
        uint256 id;
        string jobName;
        string jobDescription;
        Selection progress;
        bool isSelected;
        address lancer;
        uint256 amount;
    }
    struct Proposal{
        uint256 id;
        address freelancer_address;
        string name;
        bool status ;
    }

    //variables
    address public owner;
    Freelancer [] public freelancers;
    Job[] public jobList;
    Proposal[] public proposals;
    Account[] public Accounts; 
    string[] public usernames;
    mapping(address=>Job[]) public myJobs;
    mapping(address => Proposal) public proposalKeys; 
    mapping(address => uint256) escrowBalances;
    enum Selection {open, ongoing, close}

     
    //constructor
    constructor() ERC20("EscrowToken", "ET"){
        owner = msg.sender;
        _mint(msg.sender, 10000 * 10 ** uint(decimals()));
    }
    
    //functions
    
    function returnSelection() public pure returns(Selection){
        Selection selection;
        return selection;
    }
    function getAllProposals(address client) external view returns (Proposal memory){
        return proposalKeys[client];
    }
    function postJob(string calldata jobName, string calldata jobDescription, Selection _progress, bool isSelected, uint256 amount) public{
        uint256 id = jobList.length;
       Job memory jobItem = Job({id: id, jobName: jobName, jobDescription: jobDescription, progress: _progress,
                                isSelected: isSelected, lancer: msg.sender, amount: amount}); 
       jobList.push(jobItem);
    }

    function completeJob(uint256 id) public{
       if(!jobList[id].isSelected){
           jobList[id].isSelected = true;
       } 
    }
    function login()public view returns (bool){
        for(uint i = 0; i < Accounts.length; i++){
           if(Accounts[i].addr == msg.sender){
               return true;
           } 
        }
        return false;
    }
    function sigIn(string calldata name, string calldata password) external returns (uint){
        if(!login()){
            for(uint i = 0; i < usernames.length; i++){
                if(keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(usernames[i])) ){
                    return 2;
                }
            }
            Account memory account = Account(msg.sender, name, password);
            Accounts.push(account);
            usernames.push(name);
            return 1;
        }
        else{
            return 0;
        }
    }

    function getMyJobs(address lancer) external view returns (Job[] memory){
        Job[] memory temporary = new Job[](myJobs[lancer].length);
        uint count = 0;
        for(uint i = 0; i < myJobs[lancer].length; i++){
            if(myJobs[lancer][i].isSelected){
                temporary[count] = myJobs[lancer][i];
                count++;
            }
        }
        Job[] memory result = new Job[](count);
        count = 0;
        for(uint i = 0; i < temporary.length; i++){
            if(myJobs[lancer][i].isSelected){
                result[count] = temporary[i];
                count++;
            }
        }
        return result;
    }

    function addFreelancers(string calldata name)external{
        uint256 id = freelancers.length;
        address lancer = msg.sender;
        Freelancer memory freelancer = Freelancer(id, name, lancer);  
        freelancers.push(freelancer);
    }

    function getAllFreelancers()external view returns (Freelancer[] memory){
        return freelancers;
    }

    
    function getJobs() external view returns (Job[] memory){
       Job[] memory temporary = new Job[](jobList.length);
       uint count = 0;
       for(uint i=0; i<jobList.length; i++){
           if(jobList[i].isSelected){
               temporary[count] = jobList[i];
               count++;
           }
       }
       Job[] memory result = new Job[](temporary.length);
       for(uint i=0; i<temporary.length; i++){
           result[i] = temporary[i];
       }
       return result;
    }

    function selectJob(uint256 id, address lancer, string calldata name, bool status) external returns (bool){
        Proposal memory proposal = Proposal(id, lancer, name, status);
        proposals.push(proposal);
        proposalKeys[lancer] = proposal;
        myJobs[lancer].push(jobList[id]);
        return true;
    }

    function selectProposal(address client, address lancer, bool status) public {
        Proposal storage selectedProposal = proposalKeys[lancer];
        jobList[selectedProposal.id].progress = Selection.ongoing;
        uint256 amount = jobList[selectedProposal.id].amount;
        _mint(lancer, amount);
        escrowBalances[client] = escrowBalances[client] + amount;
        jobList[selectedProposal.id].lancer = lancer;
        escrowBalances[client] = escrowBalances[client] - amount;
        escrowBalances[lancer] = escrowBalances[lancer] + amount;
        selectedProposal.status = status;
}
    function complete(address client, uint256 id) public {
        address lancer = jobList[id].lancer;
        uint256 amount = jobList[id].amount;
        jobList[id].progress = Selection.close;

        _transfer(client, lancer, amount);
        require(escrowBalances[lancer] >= amount, "Insufficient balance for withdrawal");
        escrowBalances[lancer] = escrowBalances[lancer] - amount;
    }

}

