import React, { Component } from "react";
import { Container, Form, Modal, Card } from "react-bootstrap";
import backButton from "./assets/backButton.png";
import dataService from "./services/DataService";
import { withRouter } from "react-router-dom";
import Checkout from "./Checkout";
import SuccessfulPurchase from "./SuccessfulPurchase";
import PortfolioToken from "./PortfolioToken";
import RewardToken from "./RewardToken";
import chainService from "./services/ChainService";
import NumberService from "./services/NumberService";
import LoadingOverlay from "react-loading-overlay";

const { Chart } = require("react-google-charts");

class Login extends Component {
	constructor(props) {
		super(props);
		const search = window.location.search;
		const params = new URLSearchParams(search);
		const address = params.get("address");
		this.close = this.close.bind(this);

		this.state = {
			tokenViews: [],
			tokens: [],
			rewardTokens: [],
			rewardViews: [],
			address: address,
			cUSDBalance: 0,
			isLoading: false,
		};
	}

	componentDidMount() {
		this.loadTokens();
	}

	close() {
		window.location.href = "/";
	}

	async loadTokens() {
		this.setState({ isLoading: true });
		let allTokens = await dataService.getTokenList();
		var balances = {};
		var totalBalance = 0;
		for (let i = 0; i < allTokens.tokens.length; i++) {
			let t = allTokens.tokens[i];
			let balanceOf = await chainService.balanceOfToken(
				t.address,
				this.state.address
			);
			if (balanceOf > 0) {
				this.state.tokens.push(t);
				balances[t.address] = parseInt(balanceOf);
				console.log(balanceOf);
				console.log(this.state.address);
				console.log(t.address);
			}
			totalBalance += parseInt(balanceOf);
		}
		let tokenViews = this.state.tokens.map((token) => (
			<PortfolioToken
				data={token}
				key={token.name}
				openCard={this.open}
				balance={balances[token.address]}
			/>
		));
		this.setState({ tokenViews: tokenViews });

		let tokens = await dataService.getPortfolio();
		this.setState({ rewardTokens: tokens.reward });

		let rewardViews = this.state.rewardTokens.map((token) => (
			<RewardToken data={token} key={token.name} openCard={this.open} />
		));
		this.setState({ rewardViews: rewardViews });
		totalBalance += parseInt(this.state.rewardTokens[0].converted_balance);
		this.setState({ cUSDBalance: parseInt(totalBalance) });
		this.setState({ isLoading: false });
	}

	render() {
		return (
			<LoadingOverlay
				active={this.state.isLoading}
				spinner
				text={this.state.loadingText}
			>
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
												<div class="portfolioBalance">
													{NumberService.formatNumber(this.state.cUSDBalance)}{" "}
												</div>
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
													Payments: 1,870.00 CUSD (+18.9%){" "}
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
			</LoadingOverlay>
		);
	}
}

export default withRouter(Login);
