import React, { Component } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import logo from "./simpleLogo.png";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import TokenCard from "./TokenCard";
const { Chart } = require("react-google-charts");

class Login extends Component {
	constructor(props) {
		super(props);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);
		this.connect = this.connect.bind(this);
		this.checkout = this.checkout.bind(this);

		this.state = {
			showModal: false,
			connect: this.props.connect,
			address: this.props.address,
			tokens: [],
			tokenViews: [],
			selectedToken: {},
		};
	}

	componentDidMount() {
		console.log(this.state.address);
		this.loadTokens();
	}

	async loadTokens() {
		let tokens = await dataService.getTokenList();
		this.setState({ tokens: tokens.tokens });
		console.log(this.state.tokens);

		let views = this.state.tokens.map((token) => (
			<TokenCard data={token} key={token.name} openCard={this.open} />
		));
		this.setState({ tokenViews: views });
	}
	open(data) {
		this.setState({ selectedToken: data });
		this.setState({ showModal: true });
	}

	close() {
		this.setState({ showModal: false });
	}

	submit() {
		window.location.href = "/pendingPurchase";
	}

	checkout() {
		window.location.href =
			"/checkout?uri=" +
			this.state.selectedToken.logoURI +
			"&name=" +
			this.state.selectedToken.name +
			"&symbol=" +
			this.state.selectedToken.symbol +
			"&address=" +
			this.state.selectedToken.address;
	}

	connect() {
		try {
			this.state.connect();
		} catch (e) {}
	}

	truncate(str, n) {
		let prefix = str.length > n ? str.substr(0, n - 1) + "..." : str;
		let suffix = str.substr(str.length - n);
		return prefix + suffix;
	}

	render() {
		return (
			<div className="platform">
				<Container>
					<table class="welcomeTitle">
						<tr>
							<td>
								<img src={logo} alt="" class="smallLogo" />
							</td>
							<td class="alignRight">
								<button class="btn-hover color-1">PORTFOLIO</button>{" "}
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
											left: 40,
											top: 20,
											right: 30,
											bottom: 30,
											width: "100%",
											height: "100%",
										},

										legend: "none",
										colors: ["#A747F4", "#2FC5C3"],
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
							{/* <div class="modalDetails"> */}
							<table class="modalTable">
								<tr>
									<td>
										<div class="modalMarket">Net Asset Value (NAV)</div>
									</td>{" "}
									<td class="modalCell">
										<div class="modalMarketValue">$1.25</div>
									</td>
								</tr>
							</table>

							<hr class="whiteSeparator"></hr>
							<table class="modalTable">
								<tr>
									<td>
										<div class="modalMarket">Market Value</div>
									</td>{" "}
									<td class="modalCell">
										<div class="modalMarketValue">$1.25</div>
									</td>
								</tr>
							</table>
							<div class="modalButton">
								<button onClick={this.checkout} class="btn-hover color-1">
									Buy
								</button>
							</div>
							{/* </div> */}
						</div>
						{/* <Modal.Header closeButton>
							<Modal.Title>Buy FINTECH Tokens</Modal.Title>
						</Modal.Header>

						<Modal.Body>Shares</Modal.Body>
						<Modal.Body>Market Price</Modal.Body>
						<Modal.Body>Estimated Cost</Modal.Body>

						<Modal.Footer>
							<Button
								className="button-theme button-theme-blue"
								type="submit"
								onClick={this.submit}
							>
								Confirm
							</Button>
						</Modal.Footer> */}
					</Modal>
				</Container>
			</div>
		);
	}
}

export default withRouter(Login);
