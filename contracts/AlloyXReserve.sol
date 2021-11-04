// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ============ External Imports ============
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TokeVault
 * @notice The source network vault that holds all deposits on the source chain. This vault manages deposits and redemptions for source network deposits.
 */
contract AlloyXReserve  {


	/**
	 * @dev Constructor sets token that can be received
	 */
	constructor(

	) {

	}
	
	function swap(uint256 amount, address depositToken, address withdrawToken) external {
	    ERC20 depositERC20 = ERC20(depositToken);
	    ERC20 withdrawERC20 = ERC20(withdrawToken);
	    
	    address from = msg.sender;

		depositERC20.transferFrom(from, address(this), amount);

		withdrawERC20.approve(from, amount);
		withdrawERC20.transfer(from, amount);
	}

}