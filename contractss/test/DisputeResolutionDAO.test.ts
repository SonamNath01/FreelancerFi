import { expect } from "chai";
import { ethers } from "hardhat";

describe("DisputeResolutionDAO", function () {
  let dao: any;
  let owner: any, voter1: any, voter2: any;

  beforeEach(async () => {
    [owner, voter1, voter2] = await ethers.getSigners();

    const DAO = await ethers.getContractFactory("DisputeResolutionDAO");
    dao = await DAO.connect(owner).deploy();
    await dao.deployed();
  });

  it("should create a dispute", async () => {
    const tx = await dao.createDispute(voter1.address, voter2.address, "Quality issue");
    await tx.wait();

    const disputeId = await dao.disputeCount();
    expect(disputeId).to.equal(1);

    const dispute = await dao.disputes(disputeId);
    expect(dispute.client).to.equal(voter2.address);
    expect(dispute.freelancer).to.equal(voter1.address);
  });

  it("should allow users to vote on dispute", async () => {
    await dao.createDispute(voter1.address, voter2.address, "Late delivery");

    const stakeAmount = ethers.parseEther("0.01");

    await dao.connect(voter1).voteOnDispute(1, true, { value: stakeAmount });
    await dao.connect(voter2).voteOnDispute(1, false, { value: stakeAmount });

    const d = await dao.disputes(1);
    expect(d.voteYes).to.equal(1);
    expect(d.voteNo).to.equal(1);
  });

  it("should resolve dispute in favor of freelancer if votes are equal or more", async () => {
    await dao.createDispute(voter1.address, voter2.address, "Unclear specs");

    const stakeAmount = ethers.parseEther("0.01");
    await dao.connect(voter1).voteOnDispute(1, true, { value: stakeAmount });
    await dao.connect(voter2).voteOnDispute(1, false, { value: stakeAmount });

    await dao.resolveDispute(1);
    const d = await dao.disputes(1);
    expect(d.resolved).to.be.true;
    expect(d.winner).to.equal(voter1.address); // freelancer wins in tie
  });

  it("should resolve dispute in favor of client if voteNo wins", async () => {
    await dao.createDispute(voter1.address, voter2.address, "Poor communication");

    const stakeAmount = ethers.parseEther("0.01");
    await dao.connect(voter2).voteOnDispute(1, false, { value: stakeAmount });

    await dao.resolveDispute(1);
    const d = await dao.disputes(1);
    expect(d.resolved).to.be.true;
    expect(d.winner).to.equal(voter2.address); // client wins
  });

  it("should allow owner to withdraw contract balance", async () => {
    await dao.createDispute(voter1.address, voter2.address, "Some issue");
    const stakeAmount = ethers.parseEther("0.01");

    await dao.connect(voter1).voteOnDispute(1, true, { value: stakeAmount });

    const before = await ethers.provider.getBalance(owner.address);
    const tx = await dao.withdraw();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);
    const after = await ethers.provider.getBalance(owner.address);

    expect(after).to.be.greaterThan(before - gasUsed);
  });
});
