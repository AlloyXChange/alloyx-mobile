var basicToken = artifacts.require("BasicToken");

module.exports = function (deployer) {
	// deployment steps
	deployer.deploy(basicToken);
};
