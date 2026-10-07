import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying StreamlinedSubscriptionValidator to Monad Testnet...");
  
  const Validator = await ethers.getContractFactory("StreamlinedSubscriptionValidator");
  const validator = await Validator.deploy();
  await validator.waitForDeployment();

  const address = await validator.getAddress();
  console.log(`✅ Moneta Pay Validator deployed successfully to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});