import { ethers, run, network } from 'hardhat';

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  console.log(`SimpleStorage deployed to: ${simpleStorage.target}`);

  // if we are on a local network, we don't want to verify
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction()?.wait(6); // this is to make sure the contract is deployed and 6 blocks are mined after this block is mined
    await verify(String(simpleStorage.target), []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is ${currentValue}`);
  const transactionResponse = await simpleStorage.store(10);
  await transactionResponse.wait();
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('already been verified')
    ) {
      console.log('Already verified!');
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
