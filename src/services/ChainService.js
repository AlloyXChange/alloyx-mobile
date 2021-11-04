import { Celo, NETWORKS } from "@dexfair/celo-web-signer";
import Web3 from "web3";
import AlloyXReserve from "./../../src/contracts/AlloyXReserve.json";
import ERC20 from "./../../src/contracts/BasicToken.json";

import { Component } from "react";

const ContractKit = require("@celo/contractkit");
class ChainService extends Component {
	constructor() {
		super();
		this.state = {
			currentNetwork: "not set",
		};
	}

	async getERC20(web3, address) {
		const kit = ContractKit.newKitFromWeb3(web3);
		return new kit.web3.eth.Contract(ERC20.abi, address);
	}

	async getReserveContract(web3, address) {
		const kit = ContractKit.newKitFromWeb3(web3);
		return new kit.web3.eth.Contract(AlloyXReserve.abi, address);
	}

	getActiveNetwork() {
		return NETWORKS.Alfajores;
	}

	async getAccount(networkType) {
		// this.checkWeb3();
		const celo = new Celo(this.getActiveNetwork());
		await celo.connectCelo(this.onChainChanged, this.onAccountsChanged); // for celo extension wallet
		const accounts = await celo.getAccounts();
		return accounts[0];
	}

	async balanceOfToken(tokenAddress, userAddress) {
		let provider = "";
		let web3 = "";
		let signer = "";

		provider = this.getActiveNetwork();
		signer = new Celo(this.getActiveNetwork());
		web3 = await new Web3(this.getActiveNetwork().provider);

		await signer.connectCelo(this.onChainChanged, this.onAccountsChanged); // for celo extension wallet
		let bondContract = await this.getERC20(web3, tokenAddress);
		const rawBalance = await bondContract.methods.balanceOf(userAddress).call();

		return Web3.utils.fromWei(rawBalance, "ether");
	}

	async getAllowance(ownerAddress, spenderAddress, forToken) {
		let provider = "";
		let web3 = "";
		let signer = "";

		provider = this.getActiveNetwork();
		signer = new Celo(this.getActiveNetwork());
		web3 = await new Web3(this.getActiveNetwork().provider);

		await signer.connectCelo(this.onChainChanged, this.onAccountsChanged); // for celo extension wallet
		let bondContract = await this.getERC20(web3, forToken);
		const rawBalance = await bondContract.methods
			.allowance(ownerAddress, spenderAddress)
			.call();

		return Web3.utils.fromWei(rawBalance, "ether");
	}

	async approveReserve(reserveAddress, erc20Address, amount) {
		let provider = "";
		let web3 = "";
		let signer = "";
		let erc20Contract;

		provider = this.getActiveNetwork();
		signer = new Celo(this.getActiveNetwork());
		web3 = await new Web3(this.getActiveNetwork().provider);

		await signer.connectCelo(this.onChainChanged, this.onAccountsChanged); // for celo extension wallet
		erc20Contract = await this.getERC20(web3);
		let account = await this.getAccount();
		const vaultABI = erc20Contract.methods
			.approve(reserveAddress, Web3.utils.toWei(amount, "ether").toString())
			.encodeABI();
		const bondTx = {
			from: account,
			to: erc20Address,
			data: vaultABI,
		};
		const approveReceipt = await signer.sendTransaction(bondTx);

		return approveReceipt;
	}

	async swap(amount, depositToken, withdrawToken, reserveAddress) {
		let signer = new Celo(this.getActiveNetwork());
		let web3 = await new Web3(this.getActiveNetwork().provider);

		await signer.connectCelo(this.onChainChanged, this.onAccountsChanged); // for celo extension wallet
		let reserveContract = await this.getReserveContract(web3);
		let account = await this.getAccount();
		const vaultABI = reserveContract.methods
			.swap(
				Web3.utils.toWei(amount, "ether").toString(),
				depositToken,
				withdrawToken
			)
			.encodeABI();
		const bondTx = {
			from: account,
			to: reserveAddress,
			data: vaultABI,
		};
		const approveReceipt = await signer.sendTransaction(bondTx);

		return approveReceipt;
	}
}

export default new ChainService();
