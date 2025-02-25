import { assert } from 'chai';
import { ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe('SimpleStorage', () => {
  let SimpleStorageFactory: SimpleStorage__factory,
    SimpleStorage: SimpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    SimpleStorage = await SimpleStorageFactory.deploy();
    await SimpleStorage.waitForDeployment();
  });

  it('Should return the default value of 0', async () => {
    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), '0');
    // expect(currentValue).to.equal(0);    // same as above
  });
  it('Should update when we call store', async () => {
    const transactionResponse = await SimpleStorage.store(10);
    await transactionResponse.wait(1);
    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), '10');
    // expect(currentValue).to.equal(10);    // same as above
  });
});
