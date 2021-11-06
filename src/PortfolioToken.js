import { Card } from "react-bootstrap";

import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";
import NumberService from "./services/NumberService";

class PortfolioToken extends Component {
	constructor(props) {
		super(props);
		this.selectCard = this.selectCard.bind(this);

		this.state = {
			name: this.props.data.name,
			symbol: this.props.data.symbol,
			logoURI: this.props.data.logoURI,
			clickHandler: this.props.openCard,
			tokenData: this.props.data,
			balance: this.props.balance,
			convertedBalance: this.props.balance,
		};
	}

	componentDidMount() {}

	selectCard(e) {
		e.preventDefault();
		this.state.clickHandler(this.state.tokenData);
	}

	render() {
		return (
			<Card className="tokenCard" onClick={this.selectCard}>
				<table class="tokenTable">
					<col width="60px" />

					<tr>
						<td>
							<div class="tokenIconDiv">
								<img class="tokenIcon" src={this.state.logoURI} />{" "}
							</div>
						</td>
						<td>
							<div class="tokenSymbol">{this.state.symbol}</div>
							<div class="portfolioTokenTitle">{this.state.name}</div>
						</td>
						<td>
							<div class="tokenBalance">
								{NumberService.formatNumber(this.state.balance)}
							</div>
							<div class="portfolioConvertedBalance">
								CUSD {NumberService.formatNumber(this.state.convertedBalance)}
							</div>
						</td>{" "}
					</tr>
				</table>
			</Card>
		);
	}
}

export default PortfolioToken;
