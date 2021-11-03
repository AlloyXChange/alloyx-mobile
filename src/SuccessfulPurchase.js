import React, { Component } from "react";
import { Container, Card, Modal, Form } from "react-bootstrap";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import success from "./assets/success.png";
import closeButton from "./assets/closeButton.png";
import Checkout from "./Checkout";

class SuccessfulPurchase extends Component {
	constructor(props) {
		super(props);

		this.state = {};
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
									You added 1,000 Fintech Tokens <p></p>
									You invested 1,611.20 cUSD
									<p></p>
									<div class="successSummary">
										You have 4,200 Fintech Tokens
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
