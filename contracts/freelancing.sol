// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.21;
// import "./escrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract freelancing is ERC20 {
    address public owner;
    constructor() ERC20("EscrowToken", "ET"){
        owner = msg.sender;
        _mint(msg.sender, 10000 * 10 ** uint(decimals()));
    }

    // function mintToken(address to, uint256 amount){
    //    _mint(to, amount); 
    // }

    enum Selection {open, ongoing, close}
    function returnSelection() public pure returns(Selection){
        Selection selection;
        return selection;
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
    Job[] public jobList;

    struct Proposal{
        uint256 id;
        address freelancer_address;
        string name;
        bool status ;
    }
    Proposal[] public proposals;
    mapping(address => Proposal) public proposalKeys; 
    // Escrow public escrowToken;


    mapping(address => uint256) escrowBalances;

    function postJob(string calldata jobName, string calldata jobDescription, Selection _progress, bool isSelected, uint256 amount) public{
        uint256 id = jobList.length;
       Job memory jobItem = Job({id: id, jobName: jobName, jobDescription: jobDescription, progress: _progress,
                                isSelected: isSelected, lancer: 0x0000000000000000000000000000000000000000, amount: amount}); 
       jobList.push(jobItem);
    }

    function completeJob(uint256 id) public{
       if(!jobList[id].isSelected){
           jobList[id].isSelected = true;
       } 
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

    function selectJob(uint256 id, address lancer, string calldata name, bool status) public {
        Proposal memory proposal = Proposal(id, lancer, name, status);
        proposals.push(proposal);
        proposalKeys[lancer] = proposal;
    }

    function getAllProposals() external view returns (Proposal[] memory){
       return proposals;
    }
    function selectProposal(address client, address lancer, bool status) public {
        Proposal memory selectedProposal = proposalKeys[lancer];
        selectedProposal.status = true;

        jobList[selectedProposal.id].progress = Selection.ongoing;
        uint256 amount = jobList[selectedProposal.id].amount;
        _mint(lancer, amount);

        jobList[selectedProposal.id].lancer = lancer;
        escrowBalances[client] = escrowBalances[client] - amount;
        escrowBalances[lancer] = escrowBalances[lancer] + amount;
        selectedProposal.status = status;
    }
    // function credit(address client, uint256 amount)public{
    //     require(escrowToken.allowance(client, address(this)) >= amount, "EscrowToken not allowed to transferFrom this buyer");
    //     escrowToken.transferFrom(client, address(this), amount);
    //     escrowBalances[client] = escrowBalances[client] + amount;
    //     escrowBalances[address(this)] = escrowBalances[address(this)] + amount;
    // }
    function complete(address client, uint256 id) public {
        address lancer = jobList[id].lancer;
        uint256 amount = jobList[id].amount;
        jobList[id].progress = Selection.close;
        _transfer(client, lancer, amount);
        escrowBalances[address(this)] = escrowBalances[address(this)] - amount;
        escrowBalances[lancer] = escrowBalances[lancer] - amount;
    }
}

