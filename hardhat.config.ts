import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: "1f736308-0496-4a7b-8d98-13b0defe8f10",
    currency: "USD",
  },
};

export default config;
