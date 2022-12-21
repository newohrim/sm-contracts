require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;

module.exports = {
  defaultNetwork: "goerli",
  solidity: { version: "0.8.8"},
  networks: {
	  goerli: {
		  url: endpoint,
		  accounts: [`0x${privateKey}`]
	  }
  }
};