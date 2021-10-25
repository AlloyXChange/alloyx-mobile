import React, { Component } from "react";
import { Container, Card, Form } from "react-bootstrap";
import logo from "./LogoVertDark.png";
import Chart from "react-google-charts";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

class PurchaseConfirmation extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return <div className="platform"> PURCHASE CONFIRMED</div>;
	}
}

export default withRouter(PurchaseConfirmation);
