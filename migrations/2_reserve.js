var reserve = artifacts.require("AlloyXReserve");

module.exports = function (deployer) {
	// deployment steps
	deployer.deploy(reserve);
};
