import hre, { ethers } from "hardhat";

async function main() {
  //Get the contract to deploy
  const BuyMeACrypto = await hre.ethers.getContractFactory('BuyMeACrypto');
  const buyMeACrypto = await BuyMeACrypto.deploy();

  //Deploy the contract
  await buyMeACrypto.deployed();
  console.log('BuyMeACrypto deployed to: ', buyMeACrypto.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
