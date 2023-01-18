import hre from "hardhat";
// @ts-ignore
import buyMeACryptoABI from '../artifacts/contracts/BuyMeACrypto.sol/BuyMeACrypto.json';
import { UrlJsonRpcProvider } from '@ethersproject/providers/src.ts/url-json-rpc-provider';
require('dotenv').config();

async function getBalance(provider: UrlJsonRpcProvider, address: string) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  const contractABI = buyMeACryptoABI.abi;
  const provider = new hre.ethers.providers.AlchemyProvider('goerli', process.env.GOERLI_API_KEY);

  //Ensure that signer is the same address s the original contract deployer, or else this script will fail with an error
  const signer = new hre.ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY as string, provider);

  //Instantiate connected contract
  const buyMeACrypto = new hre.ethers.Contract(contractAddress, contractABI, signer);

  console.log('Current balances of owner: ', await getBalance(provider, signer.address), 'ETH');
  const contractBalance = await getBalance(provider, buyMeACrypto.address);
  console.log('Current balances of contract: ', await getBalance(provider, contractAddress), 'ETH');

  //Withdraw funds if there are funds to withdraw
  if (contractBalance !== '0.0') {
    console.log('Withdrawing funds...');
    const withdrawTxn = await buyMeACrypto.withdrawTips();
    await withdrawTxn.wait();
  } else
    console.log('No funds to withdraw');

  console.log('Current balance of owner: ', await getBalance(provider, signer.address), 'ETH');
}