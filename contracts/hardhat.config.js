
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", 
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: true
        }
      },
      {
        version: "0.8.7", 
        settings: {
          optimizer: true
        }
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: true
        }
      }
    ],
  },
  networks: {
    sepolia: {
    url: "", 
    accounts: {
      mnemonic: "", 
      path: "", 
      initialIndex: 0,
      count: 1
    },
    chainId: 11155111
    }, 
    hardhat: {
      allowUnlimitedContractSize: true
    }
  }, 
  paths: {
    artifacts: "./artifacts", 
    cache: "./cache",
    sources: "./contracts"
  }, 
 gasReporter: {
  enabled: false, 
  currency: "USD", 
  outputFile: "./GasReport.txt",
  noColors: false
 }
};
