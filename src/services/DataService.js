import { Component } from "react";
import axios from "axios";

class DataService extends Component {
	constructor() {
		super();
		this.state = {
			currentNetwork: "not set",
		};
	}

	async getTokenList() {
		console.log(process.env.REACT_APP_API_DOMAIN + "getAlloyXTokens");
		return axios
			.get(process.env.REACT_APP_API_DOMAIN + "getAlloyXTokens")
			.then((response) => {
				let metadata = response.data;
				return metadata;
			})
			.catch((error) => {
				return "error";
			});
	}

	async getPortfolio() {
		console.log(process.env.REACT_APP_API_DOMAIN + "getPortfolioTokens");
		return axios
			.get(process.env.REACT_APP_API_DOMAIN + "getPortfolioTokens")
			.then((response) => {
				let metadata = response.data;
				return metadata;
			})
			.catch((error) => {
				return "error";
			});
	}
}

export default new DataService();
