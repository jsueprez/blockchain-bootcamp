//var SimpleBank = artifacts.require("./SimpleBank.sol");
var CrowdFunding = artifacts.require("./CrowdFunding.sol");

module.exports = function (deployer) {
    //deployer.deploy(SimpleBank);
    deployer.deploy(CrowdFunding);
};