import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import PendingPurchase from "./PendingPurchase";
import PurchaseConfirmation from "./PurchaseConfirmation";

import {
	ContractKitProvider,
	useContractKit,
	Alfajores,
	NetworkNames,
} from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
import Checkout from "./Checkout";
import Portfoliio from "./Portfoliio";
import Tutorial from "./Tutorial";
function WrappedApp() {
	return (
		<ContractKitProvider
			networks={[Alfajores]}
			network={{
				name: NetworkNames.Alfajores,
				rpcUrl: "https://alfajores-forno.celo-testnet.org",
				graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
				explorer: "https://alfajores-blockscout.celo-testnet.org",
				chainId: 44787,
			}}
			dapp={{
				name: "AlloyX",
				description: "AllyX",
				url: "http://localhost:3000",
			}}
		>
			<App />
		</ContractKitProvider>
	);
}

function App() {
	const { address, connect, kit, Alfajores } = useContractKit();
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{/* <Home connect={connect} address={address} kit={kit} /> */}
					<Tutorial />
				</Route>
				<Route exact path="/home">
					<Home connect={connect} address={address} kit={kit} />
				</Route>
				<Route exact path="/portfolio">
					<Portfoliio />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default WrappedApp;
