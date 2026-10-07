import { expect } from "chai";
import { ethers } from "hardhat";

describe("StreamlinedSubscriptionValidator", function () {
  it("Should enforce billing intervals and prevent early double charges", async function () {
    const [owner, merchant, user] = await ethers.getSigners();
    
    const Validator = await ethers.getContractFactory("StreamlinedSubscriptionValidator");
    const validator = await Validator.deploy();
    await validator.waitForDeployment();

    const amount = ethers.parseUnits("10", 6);
    const interval = 30 * 24 * 60 * 60; // 30 days

    await validator.connect(user).setSubscription(
      merchant.address,
      ethers.ZeroAddress,
      amount,
      interval
    );

    const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "address"],
      [user.address, merchant.address]
    );

    await expect(
      validator.validateUserOp(ethers.ZeroHash, encodedData)
    ).to.be.revertedWithCustomError(validator, "BillingIntervalNotPassed");
  });
});