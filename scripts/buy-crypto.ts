import hre from "hardhat";
import { BigNumber } from 'ethers';

type Memo = {
  from: string;
  timestamp: BigNumber;
  name: string;
  message: string;
};

/**
 * Return the Ether balance of a given address
 * @param address
 */
async function getBalance(address: string) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

/**
 * Logs the Ether balances for a list of addresses
 * @param addresses
 */
async function printBalances(addresses: string[]) {
  let loop = 0;
  for (const address of addresses) {
    console.log(`Address ${loop} balance: `, await getBalance(address));
    loop++;
  }
}

/**
 * Logs the memo stored on-chain from crypto purchases
 * @param memos
 */
function printMemos(memos: Memo[]) {
  for (const memo of memos) {
    console.log(`At ${memo.timestamp}, ${memo.name}, (${memo.from} said: ${memo.message})`);
  }
}

async function main() {
  //Get example accounts
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  //Get the contract to deploy
  const BuyMeACrypto = await hre.ethers.getContractFactory('BuyMeACrypto');
  const buyMeACrypto = await BuyMeACrypto.deploy();

  //Deploy the contract
  await buyMeACrypto.deployed();
  console.log('BuyMeACrypto deployed to: ', buyMeACrypto.address);

  //Check balances before the crypto purchase
  const addresses: string[] = [
    owner.address,
    tipper.address,
    buyMeACrypto.address
  ];
  console.log('== Start ==');
  await printBalances(addresses);

  //Buy the owner a few cryptos
  const tip = {
    value: hre.ethers.utils.parseEther('0.001')
  };
  await buyMeACrypto.connect(tipper).buyCrypto("Carolina", "You're the best!", tip);
  await buyMeACrypto.connect(tipper2).buyCrypto("Vitto", "Amazing person", tip);
  await buyMeACrypto.connect(tipper3).buyCrypto("Kay", "I love my Proof ok Knowledge", tip);

  //Check balances after cryptos purchases
  console.log('== Bought crypto ==');
  await printBalances(addresses);

  //Withdraw
  await buyMeACrypto.connect(owner).withdrawTips();

  //Check balances after withdraw
  console.log('== Withdraw ==');
  await printBalances(addresses);

  //Check out the memos
  console.log('== Memos ==');
  const memos = await buyMeACrypto.getMemos();

  printMemos(memos);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });