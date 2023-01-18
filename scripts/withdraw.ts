import hre from "hardhat";
// @ts-ignore
import buyMeACryptoABI from '../artifacts/contracts/BuyMeACrypto.sol/BuyMeACrypto.json';
require('dotenv').config();

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractABI = buyMeACryptoABI.abi;
}