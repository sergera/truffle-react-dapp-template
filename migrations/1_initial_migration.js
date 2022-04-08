const Migrations = artifacts.require("Migrations");
const Notes = artifacts.require("Notes");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
	deployer.deploy(Notes);
};
