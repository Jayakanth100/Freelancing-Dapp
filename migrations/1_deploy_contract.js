var myContract = artifacts.require("../contracts/Freelancing.sol");
module.exports = (deployer)=>{
    deployer.deploy(myContract);
}
