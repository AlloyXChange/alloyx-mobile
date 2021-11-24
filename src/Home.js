import React, { Component } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import logo from "./simpleLogo.png";
import dataService from "./services/DataService";
import chainService from "./services/ChainService";
import LoadingOverlay from "react-loading-overlay";

import { withRouter } from "react-router-dom";
import TokenCard from "./TokenCard";
import Checkout from "./Checkout";
import SuccessfulPurchase from "./SuccessfulPurchase";
import { useContractKit, WalletTypes } from "@celo-tools/use-contractkit";

// import {
// 	requestTxSig,
// 	waitForSignedTxs,
// 	requestAccountAddress,
// 	waitForAccountAuth,
// 	FeeCurrency,
// 	// Ensure that we are importing the functions from dappkit/lib/web
// } from "@celo/dappkit/lib/web";
const { Chart } = require("react-google-charts");

class Login extends Component {
	constructor(props) {
		super(props);

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);
		this.connect = this.connect.bind(this);
		this.checkout = this.checkout.bind(this);
		this.startCheckout = this.startCheckout.bind(this);
		this.goToPortfolio = this.goToPortfolio.bind(this);
		this.closeCheckout = this.closeCheckout.bind(this);
		this.state = {
			showModal: false,
			showCheckout: false,
			showSuccessModal: false,
			tokensPurchased: 0,

			connect: this.props.connect,
			address: this.props.address,
			kit: this.props.kit,
			tokens: [],
			tokenViews: [],
			selectedToken: {},
			isLoading: false,
		};
	}

	componentDidMount() {
		console.log(this.state.address);
		this.loadTokens();
	}

	// login = async () => {
	// 	console.log("entering login");
	// 	// A string you can pass to DAppKit, that you can use to listen to the response for that request
	// 	const requestId = "login";

	// 	// A string that will be displayed to the user, indicating the DApp requesting access/signature
	// 	const dappName = "Web DappKit";
	// 	// Ask the Celo Alfajores Wallet for user info
	// 	requestAccountAddress({
	// 		requestId,
	// 		dappName: dappName,
	// 		callback: window.location.href,
	// 	});

	// 	// Wait for the Celo Wallet response
	// 	try {
	// 		const dappkitResponse = await waitForAccountAuth(requestId);
	// 		this.setState({
	// 			status: "Login succeeded",
	// 			address: dappkitResponse.address,
	// 			phoneNumber: dappkitResponse.phoneNumber,
	// 			loggedIn: true,
	// 		});
	// 		// Catch and handle possible timeout errors
	// 	} catch (error) {
	// 		console.log(error);
	// 		this.setState({
	// 			status: "Login timed out, try again.",
	// 		});
	// 	}
	// };

	async loadTokens() {
		this.setState({ isLoading: true });

		let tokens = await dataService.getTokenList();
		this.setState({ tokens: tokens.tokens });

		let views = this.state.tokens.map((token) => (
			<TokenCard data={token} key={token.name} openCard={this.open} />
		));
		this.setState({ tokenViews: views });

		if (this.state.address) {
			let balanceOf = await chainService.balanceOfToken(
				"0x10e9bc0e75a35c10bc071f9b46e5C279fD951157",
				this.state.address
			);
			console.log(balanceOf);
			console.log(this.state.address);
		}
		this.setState({ isLoading: false });
	}
	open(data) {
		this.setState({ selectedToken: data });
		this.setState({ showModal: true });
	}

	close() {
		this.setState({ showModal: false });
		this.setState({ showCheckout: false });
		this.setState({ showSuccessModal: false });
	}

	closeCheckout() {
		this.setState({ showCheckout: false });
	}

	submit() {
		window.location.href = "/pendingPurchase";
	}

	goToPortfolio() {
		if (this.state.address) {
			window.location.href = "/portfolio?address=" + this.state.address;
		} else {
			alert("Connect Your Wallet");
		}
	}

	checkout() {
		if (this.state.address) {
			this.setState({ showModal: false });
			this.setState({ showCheckout: true });
		} else {
			alert("Connect Your Wallet");
		}
	}

	connect() {
		try {
			this.state.connect();
			// this.login();
		} catch (e) {}
	}

	startCheckout(purchaseValue) {
		this.setState({ tokensPurchased: purchaseValue });

		this.setState({ showCheckout: false });
		this.setState({ showSuccessModal: true });
	}

	truncate(str, n) {
		let prefix = str.length > n ? str.substr(0, n - 1) + "..." : str;
		let suffix = str.substr(str.length - n);
		return prefix + suffix;
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
						<table class="welcomeTitle">
							<tr>
								<td>
									<img src={logo} alt="" class="smallLogo" />
								</td>
								<td class="alignRight">
									<button
										onClick={this.goToPortfolio}
										class="btn-hover color-1"
									>
										PORTFOLIO
									</button>{" "}
								</td>
							</tr>
						</table>
						<p></p>
						{this.state.address ? (
							<Form>
								<div class="walletToggle">
									<Form.Check
										type="switch"
										label="Wallet Connected"
										id="disabled-custom-switch"
										checked={true}
									/>
								</div>
							</Form>
						) : (
							<Form>
								<div class="walletToggle">
									<Form.Check
										type="switch"
										label="Wallet Not Connected"
										id="disabled-custom-switch"
										onClick={this.connect}
										checked={false}
									/>
								</div>
							</Form>
						)}

						<p></p>
						<div class="tagline">
							Use AlloyX to invest in income generating assets.
						</div>
						<p></p>
						<div class="header">Pooled investments</div>
						<p></p>
						{this.state.tokenViews}
						<Modal
							show={this.state.showModal}
							onHide={this.close}
							animation={true}
							dialogClassName="modal-container"
							centered
						>
							<div class="modalContainer">
								<div class="modalTitle">Token Performance</div>
								<div class="modalIcon">
									<img src={this.state.selectedToken.logoURI} />
								</div>
								<div class="modalSymbol">{this.state.selectedToken.symbol}</div>
								<div class="modalName">{this.state.selectedToken.name}</div>
								<div class="modalChart">
									<Chart
										chartType="LineChart"
										loader={<div>Loading Chart</div>}
										data={this.state.selectedToken.performance}
										options={{
											chartArea: {
												left: 30,
												top: 20,
												right: 20,
												bottom: 30,
												width: "100%",
												height: "100%",
											},

											legend: "none",
											colors: ["#2FC5C3", "#A747F4"],
											vAxis: {
												format: "$#.###",
												minorGridlines: { count: 0 },
												textStyle: {
													color: "#FFFFFF",
													opacity: 0.5,
												},
												gridlines: {
													color: "#D8D8D8",
													opacity: 0.1,
												},
												baselineColor: "#FFFFFF",
											},
											hAxis: {
												textStyle: {
													color: "#FFFFFF",
													opacity: 0.5,
												},
												gridlines: {
													color: "none",
													opacity: 0.5,
												},
												baselineColor: "#FFFFFF",
											},
											backgroundColor: "transparent",
										}}
									/>
								</div>
								<div class="modalDetails">
									<table class="modalTable">
										<col width="1px" />
										<col width="85px" />
										<col width="25px" />

										<tr>
											<td>
												<span class="navDot"></span>
											</td>
											<td>
												<div class="modalMarket">Net Asset Value (NAV)</div>
											</td>{" "}
											<td class="modalCell">
												<div class="modalMarketValue">
													{this.state.selectedToken.nav}
												</div>
											</td>
										</tr>
									</table>

									<hr class="whiteSeparator"></hr>
									<table class="modalTable">
										<tr>
											<td>
												<span class="marketDot"></span>
											</td>
											<td>
												<div class="modalMarket">Market Value</div>
											</td>{" "}
											<td class="modalCell">
												<div class="modalMarketValue">
													{this.state.selectedToken.market}
												</div>
											</td>
										</tr>
									</table>
								</div>

								<div class="modalButton">
									<button onClick={this.checkout} class="btn-hover color-1">
										Buy
									</button>
								</div>
							</div>
						</Modal>

						<Modal
							show={this.state.showCheckout}
							onHide={this.close}
							animation={true}
							dialogClassName="modal-container"
							centered
						>
							<Checkout
								token={this.state.selectedToken}
								submit={this.startCheckout}
								address={this.state.address}
								kit={this.state.kit}
								closeCheckout={this.closeCheckout}
							/>
						</Modal>

						<Modal
							show={this.state.showSuccessModal}
							onHide={this.close}
							animation={true}
							dialogClassName="modal-container"
							centered
						>
							<SuccessfulPurchase
								tokensPurchased={this.state.tokensPurchased}
								token={this.state.selectedToken}
								address={this.state.address}
							/>
						</Modal>
					</Container>
				</LoadingOverlay>
			</div>
		);
	}
}

export default withRouter(Login);
