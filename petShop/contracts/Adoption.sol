// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
    address[16] public adopters;

    // Adopting a pet
    function adopt(uint256 petId) public returns (uint256) {
        // to check range.
        require(petId >= 0 && petId <= 15);

        //msg.sender is the addres wwho made the call
        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    // memory gives the data location for the variable(an address)
    // view keyword, avoid modify the state of the contract
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
