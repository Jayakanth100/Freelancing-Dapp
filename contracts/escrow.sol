// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.21;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Escrow is ERC20{
    uint256 public constant INITIAL_SUPPLY = 10000000000000000000000;
    constructor () ERC20("ESCROW TOKEN", "ET"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
}

