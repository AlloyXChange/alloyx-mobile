import React, { Component } from "react";
import { Container, Card, Modal, Form } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import success from "./assets/success.png";
import closeButton from "./assets/closeButton.png";
import ChainService from "./services/ChainService";
import NumberService from "./services/NumberService";

class SuccessfulPurchase extends Component {
	constructor(props) {
		super(props);
		this.checkout = this.checkout.bind(this);

		this.state = {
			totalPurchased: this.props.tokensPurchased,
			tokenAddress: this.props.token.address,
			address: this.props.address,
			tokenData: this.props.token,
			balance: 0,
		};
	}

	componentDidMount() {
		this.loadToken();
	}

	async loadToken() {
		if (this.state.tokenAddress) {
			let balanceOf = await ChainService.balanceOfToken(
				this.state.tokenAddress,
				this.state.address
			);
			this.setState({ balance: balanceOf });
		}
	}
	checkout() {
		window.location.href = "/portfolio?address=" + this.state.address;
	}

	render() {
		return (
			<div className="platform">
				<Container>
					<div class="modalContainer">
						<table class="successTable">
							<tr>
								<td>
									<div class="successDiv">
										<img src={success} class="successImage" />
									</div>
								</td>
							</tr>
							<tr>
								<td class="successResults">
									You added{" "}
									{NumberService.formatNumber(this.state.totalPurchased)}{" "}
									{this.state.tokenData.symbol} Tokens <p></p>
									You invested{" "}
									{NumberService.formatNumber(this.state.totalPurchased)} cUSD
									<p></p>
									<div class="successSummary">
										You have {NumberService.formatNumber(this.state.balance)}{" "}
										{this.state.tokenData.symbol} Tokens
									</div>
									<p></p>
								</td>
							</tr>
							<tr>
								<td class="successButtonCell">
									<button onClick={this.checkout} class="btn-hover color-1">
										My Portfolio
									</button>
								</td>
							</tr>
						</table>
					</div>
				</Container>
			</div>
		);
	}
}

export default withRouter(SuccessfulPurchase);
