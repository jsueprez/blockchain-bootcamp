const ProofOfExistence1 = artifacts.require('./ProofOfExistence1.sol');
const ProofOfExistence2 = artifacts.require('./ProofOfExistence2.sol');
const ProofOfExistence3 = artifacts.require('./ProofOfExistence3.sol');

module.exports = function (deployer) {
    deployer.deploy(ProofOfExistence1);
    deployer.deploy(ProofOfExistence2);
    deployer.deploy(ProofOfExistence3);
};