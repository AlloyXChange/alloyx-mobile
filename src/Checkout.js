import React, { Component } from "react";
import { Container, Card } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import swapIcon from "./assets/swapIcon.png";
import closeButton from "./assets/closeButton.png";

class Checkout extends Component {
	constructor(props) {
		super(props);
		let search = window.location.search;
		this.close = this.close.bind(this);

		let params = new URLSearchParams(search);
		let name = String(params.get("name"));
		let uri = String(params.get("uri"));
		let symbol = String(params.get("symbol"));
		let address = String(params.get("name"));

		this.state = {
			showModal: false,
			connect: this.props.connect,
			address: this.props.address,
			tokens: [],
			tokenViews: [],
			selectedToken: {},
			logoURI: uri,
			symbol: symbol,
			address: address,
			name: name,
		};
	}

	close() {
		window.location.href = "/";
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

										<div class="tokenTitle"></div>
									</td>
								</tr>
							</table>
						</Card>
						<div class="modalButton">
							<button onClick={this.checkout} class="btn-hover color-1">
								Submit
							</button>
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

export default withRouter(Checkout);
