import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import PendingPurchase from "./PendingPurchase";
import PurchaseConfirmation from "./PurchaseConfirmation";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/pendingPurchase">
					<PendingPurchase />
				</Route>
				<Route exact path="/purchaseConfirmed">
					<PurchaseConfirmation />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
