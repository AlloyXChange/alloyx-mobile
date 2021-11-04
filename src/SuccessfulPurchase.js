import React, { Component } from "react";
import { Container, Card, Modal, Form } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import success from "./assets/success.png";
import closeButton from "./assets/closeButton.png";
import ChainService from "./services/ChainService";

class SuccessfulPurchase extends Component {
	constructor(props) {
		super(props);
		this.checkout = this.checkout.bind(this);

		this.state = {
			totalPurchased: this.props.tokensPurchased,
			tokenAddress: this.props.token.address,
			address: this.props.address,
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
		window.location.href = "/portfolio";
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
									You added {this.state.totalPurchased} Fintech Tokens <p></p>
									You invested {this.state.totalPurchased} cUSD
									<p></p>
									<div class="successSummary">
										You have {this.state.balance} Fintech Tokens
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
