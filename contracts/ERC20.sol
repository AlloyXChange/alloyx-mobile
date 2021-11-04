// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BasicToken is ERC20 {
    uint256 supply = 1000000;
    constructor() ERC20("Fake cUSD", "fCUSD") {
    _mint(msg.sender, supply * (10**uint256(decimals())));

    }
}
