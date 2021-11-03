import React, { Component } from "react";
import { Container, Card, Modal, Form } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import swapIcon from "./assets/swapIcon.png";
import closeButton from "./assets/closeButton.png";

class Checkout extends Component {
	constructor(props) {
		super(props);
		let search = window.location.search;
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);

		this.onStableCoinChange = this.onStableCoinChange.bind(this);

		this.state = {
			showModal: false,
			connect: this.props.connect,
			address: this.props.address,
			tokens: [],
			tokenViews: [],
			selectedToken: {},
			logoURI: this.props.token.logoURI,
			symbol: this.props.token.symbol,
			address: this.props.token.address,
			name: this.props.token.name,
			onCheckout: this.props.submit,
			showModal: false,

			stableCoinValue: 0,
			etTokenValue: 0,
		};
	}

	onStableCoinChange(e) {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({ stableCoinValue: e.target.value });
		}
	}

	close() {
		// window.location.href = "/";
	}

	submit() {
		// this.setState({ showModal: true });
		this.state.onCheckout();
	}
	render() {
		return (
			<div className="platform">
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

										<div class="tokenTitle">{this.state.name}</div>
									</td>
									<td class="purchaseInputCell">
										{" "}
										<Form.Group controlId="purchaseStable">
											<Form.Control
												className="purchaseInput"
												type="number"
												placeholder="0.0"
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
							<table class="stableTokenTable">
								<col width="60px" />

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
									</td>
									<td class="purchaseInputCell">
										{" "}
										<Form.Group controlId="purchaseStable">
											<Form.Control
												className="purchaseInput text-right"
												type="number"
												placeholder="0.0"
											/>
										</Form.Group>
									</td>
								</tr>
							</table>
						</Card>
						<div class="modalButton">
							<button onClick={this.submit} class="btn-hover color-1">
								Submit
							</button>
						</div>
					</div>
					<p></p>
				</Container>
			</div>
		);
	}
}

export default withRouter(Checkout);
