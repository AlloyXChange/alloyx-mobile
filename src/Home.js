import React, { Component } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";
import logo from "./LogoDark.png";
import Chart from "react-google-charts";
import { withRouter } from "react-router-dom";
class Login extends Component {
	constructor(props) {
		super(props);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);

		this.state = { showModal: false };
	}

	componentDidMount() {}

	open() {
		this.setState({ showModal: true });
	}

	close() {
		this.setState({ showModal: false });
	}

	submit() {
		window.location.href = "/pendingPurchase";
	}

	render() {
		return (
			<div className="platform">
				<Container>
					<table class="welcomeTitle">
						<tr>
							<td>
								<img src={logo} alt="" class="smallLogo" />
							</td>
							<td class="alignRight">
								<button type="button" class="btn btn-primary">
									Connect
								</button>
							</td>
						</tr>
					</table>
					<p></p>
					<div class="tagline">
						AlloyX provides pooled investment tokens backed with real world
						investments in revenue generating assets
					</div>
					<p></p>
					<Card>
						FinTech Fund
						<Chart
							width={"325px"}
							height={"400px"}
							chartType="LineChart"
							loader={<div>Loading Chart</div>}
							data={[
								["x", "dogs", "cats"],
								[0, 0, 0],
								[1, 10, 5],
								[2, 23, 15],
								[3, 17, 9],
								[4, 18, 10],
								[5, 9, 5],
								[6, 11, 3],
								[7, 27, 19],
							]}
							options={{
								hAxis: {
									title: "Time",
								},
								vAxis: {
									title: "Popularity",
								},
								series: {
									1: { curveType: "function" },
								},
							}}
							rootProps={{ "data-testid": "2" }}
						/>
						<button type="button" class="btn btn-primary" onClick={this.open}>
							Buy
						</button>
					</Card>
					<Modal
						className="modal-container"
						show={this.state.showModal}
						onHide={this.close}
						animation={true}
						dialogClassName="custom-map-modal"
					>
						<Modal.Header closeButton>
							<Modal.Title>Buy FINTECH Tokens</Modal.Title>
						</Modal.Header>

						<Modal.Body>Shares</Modal.Body>
						<Modal.Body>Market Price</Modal.Body>
						<Modal.Body>Estimated Cost</Modal.Body>

						<Modal.Footer>
							<Button
								className="button-theme button-theme-blue"
								type="submit"
								onClick={this.submit}
							>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>
			</div>
		);
	}
}

export default withRouter(Login);
