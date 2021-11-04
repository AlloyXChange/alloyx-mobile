import React, { Component } from "react";
import { Container, Form, Modal, Card } from "react-bootstrap";
import backButton from "./assets/backButton.png";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import Checkout from "./Checkout";
import SuccessfulPurchase from "./SuccessfulPurchase";
import PortfolioToken from "./PortfolioToken";
import RewardToken from "./RewardToken";
const { Chart } = require("react-google-charts");

class Login extends Component {
	constructor(props) {
		super(props);

		this.close = this.close.bind(this);

		this.state = {
			tokenViews: [],
			tokens: [],
			rewardTokens: [],
			rewardViews: [],
		};
	}

	componentDidMount() {
		this.loadTokens();
	}

	close() {
		window.location.href = "/";
	}

	async loadTokens() {
		let tokens = await dataService.getPortfolio();
		this.setState({ tokens: tokens.tokens });
		this.setState({ rewardTokens: tokens.reward });

		let views = this.state.tokens.map((token) => (
			<PortfolioToken data={token} key={token.name} openCard={this.open} />
		));

		let rewardViews = this.state.rewardTokens.map((token) => (
			<RewardToken data={token} key={token.name} openCard={this.open} />
		));
		this.setState({ rewardViews: rewardViews });

		this.setState({ tokenViews: views });
	}

	render() {
		return (
			<div className="platform">
				<Container>
					<div class="backButtonStyle">
						<button onClick={this.close} class="closeStyle">
							<img src={backButton} class="backButton" />
						</button>
					</div>
					<table class="portfolioHeaderTable">
						<tr>
							<td class="portfolioHeaderCell">
								<div class="portfolioHeader">My Portfolio</div>
								<p></p>
							</td>
						</tr>
						<tr>
							<td class="portfolioHeaderCell">
								<table class="portfolioBalanceTable">
									<tr>
										<td>
											<div class="portfolioBalance">5,8756.76 </div>
										</td>
										<td class="portfolioBalanceCell">
											<div class="portfolioBalanceType">cUSD</div>
										</td>
									</tr>
								</table>

								<table class="portfolioAllTimeTable">
									<tr>
										<td>
											<div class="portfolioAlltime">+2,452.06 (37.7%) </div>
										</td>
										<td class="portfolioBalanceCell">
											<div class="portfolioAllTimeText"> ALL TIME</div>
										</td>
									</tr>
								</table>

								<table class="portfolioPaymentsTable">
									<tr>
										<td>
											<div class="portfolioPayments">
												Payments: 1870.00 CUSD (+18.9%){" "}
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
					<div class="portfolioChart">
						<Chart
							chartType="LineChart"
							loader={<div>Loading Chart</div>}
							data={[
								["Month", "NAV"],
								["1D", 100],
								["1W", 90],
								["1M", 120],
								["3M", 117],
								["1Y", 130],
								["All", 150],
							]}
							options={{
								chartArea: {
									left: 0,
									top: 0,
									right: 0,
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
										color: "transparent",
										opacity: 0,
									},
									gridlines: {
										color: "transparent",
										opacity: 0,
									},
									baselineColor: "#FFFFFF",
								},
								hAxis: {
									minorGridlines: { count: 0 },

									textStyle: {
										color: "#FFFFFF",
										opacity: 0.5,
									},
									gridlines: {
										color: "transparent",
										opacity: 0,
									},
									baselineColor: "none",
								},
								backgroundColor: "transparent",
							}}
						/>
					</div>
					<div class="portfolioDetails">
						<hr class="lineBreak"></hr>
						<div class="portfolioRewardTitle">Reward</div>

						{this.state.rewardViews}

						<div class="portfolioRewardTitle">Portfolio</div>
						{this.state.tokenViews}
					</div>
				</Container>
			</div>
		);
	}
}

export default withRouter(Login);
