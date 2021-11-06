import { Component } from "react";

class NumberService extends Component {
	constructor() {
		super();
		this.state = {};
	}

	countDecimals(value) {
		if (Math.floor(value) === value) return 0;
		return value.toString().split(".")[1].length || 0;
	}

	formatNumber(number) {
		let fixRate = 0;

		if (number < 0.0001) {
			return 0;
		}

		if (number < 0.1) {
			fixRate = Math.max(this.countDecimals(parseFloat(number)), 5);
		}
		number = parseFloat(number).toFixed(fixRate) + "";
		let x = number.split(".");
		let x1 = x[0];
		let x2 = x.length > 1 ? "." + x[1] : "";
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, "$1" + "," + "$2");
		}
		return x1 + x2;
	}
}

export default new NumberService();
