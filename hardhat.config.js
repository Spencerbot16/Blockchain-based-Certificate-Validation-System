require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",

  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x8368def6c2e5fc36e4d65894c3c127c7e6924457e4a2e7a17abdb0e5b8288750"
      ]
    }
  }
};