import hre from "hardhat";

type Memo = {
  from: string;
  timestamp: number;
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
async function printMemos(memos: Memo[]) {
  for (const memo of memos) {
    console.log(`At ${memo.timestamp}, ${memo.name}, (${memo.from} said: ${memo.message})`);
  }
}
