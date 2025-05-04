import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const EscrowContract = await ethers.getContractFactory("EscrowContract");
  const escrow = await EscrowContract.deploy(deployer.address);
  await escrow.waitForDeployment();

  console.log(`EscrowContract deployed to:`, await escrow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
