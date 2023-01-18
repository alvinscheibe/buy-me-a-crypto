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
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractABI = buyMeACryptoABI.abi;
}