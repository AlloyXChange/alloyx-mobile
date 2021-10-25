import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import logo from "./LogoVertDark.png";
import Chart from "react-google-charts";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

class PendingPurchase extends Component {
	constructor(props) {
		super(props);
		this.goHome = this.goHome.bind(this);

		this.state = { isPending: true, showModal: false };
	}

	componentDidMount() {
		this.startTimer();
	}

	nextScreen() {
		// window.location.href = "/purchaseConfirmation";
		this.setState({ isPending: false });
		this.setState({ showModal: true });
	}

	goHome() {
		window.location.href = "/";
	}

	startTimer() {
		const interval = setInterval(() => {
			this.nextScreen();
		}, 5000);
	}

	render() {
		return (
			<div className="platform">
				{" "}
				<p></p>
				<table class="pendingTable">
					<tr>
						<td class="pendingLogoCell">
							<img src={logo} alt="" class="pendingLogo" />
							<p></p>

							<LoadingOverlay
								active={this.state.isPending}
								spinner
								text={"Order Placed"}
							></LoadingOverlay>
						</td>
					</tr>
				</table>
				<Modal
					className="modal-container"
					show={this.state.showModal}
					onHide={this.close}
					animation={true}
					dialogClassName="custom-map-modal"
				>
					<Modal.Header closeButton>
						<Modal.Title>FINTECH Purchased</Modal.Title>
					</Modal.Header>

					<Modal.Body>Shares</Modal.Body>
					<Modal.Body>Market Price</Modal.Body>
					<Modal.Body>Acutal Cost</Modal.Body>

					<Modal.Footer>
						<Button
							className="button-theme button-theme-blue"
							type="submit"
							onClick={this.goHome}
						>
							My Portfolio
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default withRouter(PendingPurchase);
