import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
import 'dotenv/config';
import './tasks/block-number';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  // to run on sepolia network
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY!],
      chainId: 11155111,
    },
  },
  // to verify contract on etherscan
  etherscan: {
    apiKey: ETHERSCAN_API_KEY!,
  },
  // to generate gas report
  gasReporter: {
    enabled: false, // make it true to generate gas report
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY!,
  },
  solidity: '0.8.28',
};

export default config;
