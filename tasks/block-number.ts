import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';

export default task('block-number', 'Print the current block number').setAction(
  async (taskArgs: any[], hre: HardhatRuntimeEnvironment) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number is : ${blockNumber}`);
  },
);
