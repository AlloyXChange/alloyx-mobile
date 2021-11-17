// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ============ External Imports ============
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Reserve
 * @notice A Reserve contract used to buy/sell ETF tokens
 */
contract AlloyXReserve  {


	/**
	 * @dev Constructor sets token that can be received
	 */
	constructor() {}
	
	function swap(uint256 amount,uint256 withdrawAmount, address depositToken, address withdrawToken) external {
	    ERC20 depositERC20 = ERC20(depositToken);
	    ERC20 withdrawERC20 = ERC20(withdrawToken);
	    
	    address from = msg.sender;

		depositERC20.transferFrom(from, address(this), amount);

		withdrawERC20.approve(from, withdrawAmount);
		withdrawERC20.transfer(from, withdrawAmount);
	}

}