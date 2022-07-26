export const counter = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 internal s_counter;

    function getCurrent() external view returns(uint256) {
        return s_counter;
    }

    function increment() external {
        s_counter += 1;
    }
}`;
