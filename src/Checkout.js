import React, { Component } from "react";
import { Container, Card, Modal, Form } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import swapIcon from "./assets/swapIcon.png";
import closeButton from "./assets/closeButton.png";
import chainService from "./services/ChainService";
import NumberService from "./services/NumberService";
import ChainService from "./services/ChainService";
import LoadingOverlay from "react-loading-overlay";

class Checkout extends Component {
	constructor(props) {
		super(props);
		let search = window.location.search;
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);

		this.onStableCoinChange = this.onStableCoinChange.bind(this);
		this.onWithdrawChange = this.onWithdrawChange.bind(this);

		this.state = {
			showModal: false,
			connect: this.props.connect,
			tokenAddress: this.props.token.address,
			tokens: [],
			tokenViews: [],
			selectedToken: {},
			logoURI: this.props.token.logoURI,
			symbol: this.props.token.symbol,
			address: this.props.token.address,
			name: this.props.token.name,
			onCheckout: this.props.submit,
			address: this.props.address,
			kit: this.props.kit,
			marketPrice: this.props.token.market,
			showModal: false,
			cUSDBalance: 0,
			currentAllowance: 0,
			stableCoinValue: 0,
			etTokenValue: 0,
			isLoading: false,
			marketValue: 0,
			loadingText: "",
			closeCheckout: this.props.closeCheckout,
		};
	}

	componentDidMount() {
		// alert(this.state.marketPrice);
		this.loadBalances();
		this.loadApproval();
	}

	async loadBalances() {
		let balanceOf = await chainService.balanceOfToken(
			"0xa7fc6f216d74a30cf018ecb6e52ae6706faec66a",
			this.state.address
		);

		let reserveBalance = await chainService.balanceOfToken(
			this.state.tokenAddress,
			"0x471B32Ef053ac12a91bc44655744C22Ec8fC37a8"
		);

		console.log("reserve balance" + reserveBalance);

		this.setState({
			cUSDBalance: NumberService.formatNumber(balanceOf),
		});
	}

	async loadApproval() {
		let currentAllowance = await chainService.getAllowance(
			this.state.address,
			"0x471B32Ef053ac12a91bc44655744C22Ec8fC37a8",
			"0xa7fc6f216d74a30cf018ecb6e52ae6706faec66a"
		);
		console.log("ALLOWANCE " + currentAllowance);
		this.setState({ currentAllowance: parseInt(currentAllowance) });
		// this.setState({ stableCoinValue: currentAllowance });
	}

	onStableCoinChange(e) {
		const re = /^[0-9\b]+$/;
		let fixMarketPrice = this.state.marketPrice.replace("$", "");
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({ stableCoinValue: e.target.value });
			this.setState({ marketValue: e.target.value * fixMarketPrice });
		}
	}

	onWithdrawChange(e) {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({ withdrawCoinValue: e.target.value });
		}
	}

	close() {
		// window.location.href = "/";
		this.state.closeCheckout();
	}

	submit() {
		this.approveSpend();
	}

	async approveSpend() {
		try {
			if (this.state.currentAllowance >= this.state.stableCoinValue) {
				this.setState({ isLoading: true });
				this.setState({ loadingText: "Purchasing Tokens" });
				// alert(this.state.marketValue);
				let receipt = await ChainService.swap(
					this.state.stableCoinValue.toString(),
					this.state.marketValue.toString(),
					"0xa7fc6f216d74a30cf018ecb6e52ae6706faec66a",
					this.state.tokenAddress,
					"0x471B32Ef053ac12a91bc44655744C22Ec8fC37a8"
				);
				this.state.onCheckout(this.state.stableCoinValue);
				this.setState({ isLoading: false });
			} else {
				this.setState({ isLoading: true });
				this.setState({ loadingText: "Approving Token Transfer" });

				let receipt = await ChainService.approveReserve(
					"0x471B32Ef053ac12a91bc44655744C22Ec8fC37a8",
					"0xa7fc6f216d74a30cf018ecb6e52ae6706faec66a",
					this.state.stableCoinValue
				);
				this.loadBalances();
				this.loadApproval();
				this.forceUpdate();
				this.setState({ isLoading: false });
			}
		} catch (e) {
			this.setState({ isLoading: false });
		}
	}
	render() {
		return (
			<div className="platform">
				<LoadingOverlay
					active={this.state.isLoading}
					spinner
					text={this.state.loadingText}
				>
					<Container>
						<table class="checkoutTable">
							<tr>
								<td class="closeCell">
									<button onClick={this.close} class="closeStyle">
										<img class="closeButton" src={closeButton} />
									</button>
								</td>
							</tr>
						</table>
						<div class="checkoutHeader">Checkout</div>

						<div class="checkoutTokens">
							<Card className="tokenCard" onClick={this.selectCard}>
								<table class="tokenTable">
									<col width="60px" />
									<col width="160px" />

									<tr>
										<td>
											<div class="tokenIconDiv">
												<img class="tokenIcon" src={this.state.logoURI} />
											</div>
										</td>

										<td>
											<div class="tokenSymbol">{this.state.symbol}</div>

											<div class="tokenTitleSmall">{this.state.name}</div>
										</td>
										<td class="purchaseInputCell">
											{" "}
											<Form.Group controlId="purchaseWithdraw">
												<Form.Control
													className="purchaseInput"
													type="number"
													placeholder="0.0"
													value={this.state.marketValue}
													disabled={true}
												/>
											</Form.Group>
										</td>
									</tr>
								</table>
							</Card>
							<div class="swapDiv">
								<img src={swapIcon} class="swapIcon" />
							</div>
							<Card className="tokenCard" onClick={this.selectCard}>
								<table class="tokenTable">
									<col width="60px" />
									<col width="160px" />

									<tr>
										<td>
											<div class="stableTokenIconDiv">
												<img
													class="tokenIcon"
													src="https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png"
												/>
											</div>
										</td>

										<td>
											<div class="tokenSymbol">CUSD</div>
											<div class="tokenTitleSmall">
												Balance: {this.state.cUSDBalance}
											</div>
										</td>
										<td class="purchaseInputCell">
											{" "}
											<Form.Group controlId="purchaseStable">
												<Form.Control
													className="purchaseInput text-right"
													type="number"
													placeholder="0"
													onChange={this.onStableCoinChange}
												/>
											</Form.Group>
										</td>
									</tr>
								</table>
							</Card>
							<div class="modalButton">
								<button onClick={this.submit} class="btn-hover color-1">
									{this.state.currentAllowance >= this.state.stableCoinValue &&
									this.state.currentAllowance !== 0
										? "Submit"
										: "Approve"}
								</button>
							</div>
						</div>
					</Container>
				</LoadingOverlay>
			</div>
		);
	}
}

export default withRouter(Checkout);
