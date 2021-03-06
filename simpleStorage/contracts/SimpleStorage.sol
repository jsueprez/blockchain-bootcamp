// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    uint256 storedData;

    event setEvent(uint256 newValue);

    function set(uint256 x) public {
        storedData = x;
        emit setEvent(x);
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
