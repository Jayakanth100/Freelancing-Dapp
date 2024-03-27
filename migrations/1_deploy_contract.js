var myContract = artifacts.require("../contracts/freelancing.sol");
module.exports = (deployer)=>{
    deployer.deploy(myContract);
}
