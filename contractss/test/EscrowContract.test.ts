import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers"; 

describe("EscrowContract", function () {
  let escrow: any;
  let client: any, freelancer: any, dao: any;

  beforeEach(async () => {
    [dao, client, freelancer] = await ethers.getSigners();

    const EscrowContract = await ethers.getContractFactory("EscrowContract");
    escrow = await EscrowContract.connect(dao).deploy(dao.address);
    await escrow.waitForDeployment(); // ✅ Ethers v6 replaces .deployed()
  });

  it("should allow a client to create and fund a job", async () => {
    const tx = await escrow.connect(client).createJob(freelancer.address, {
      value: parseEther("1"), // ✅
    });

    await tx.wait();
    const jobId = await escrow.jobIdCounter();

    const job = await escrow.jobs(jobId);
    expect(job.client).to.equal(client.address);
    expect(job.freelancer).to.equal(freelancer.address);
    expect(job.amount).to.equal(parseEther("1")); // ✅
    expect(job.status).to.equal(0); // Funded
  });

  it("should allow the client to complete job and transfer funds to freelancer", async () => {
    await escrow.connect(client).createJob(freelancer.address, {
      value: parseEther("1"),
    });

    const jobId = await escrow.jobIdCounter();
    const initialBalance = await ethers.provider.getBalance(freelancer.address);

    const tx = await escrow.connect(client).completeJob(jobId);
    await tx.wait();

    const job = await escrow.jobs(jobId);
    expect(job.status).to.equal(1); // Completed

    const finalBalance = await ethers.provider.getBalance(freelancer.address);
    const received = finalBalance - initialBalance; // ✅ bigint math

    expect(received).to.be.greaterThanOrEqual(parseEther("0.999"));
  });

  it("should allow dispute by client or freelancer", async () => {
    await escrow.connect(client).createJob(freelancer.address, {
      value: parseEther("1"),
    });
    const jobId = await escrow.jobIdCounter();

    await escrow.connect(freelancer).raiseDispute(jobId);
    const job = await escrow.jobs(jobId);
    expect(job.status).to.equal(2); // Disputed
  });

  it("should allow DAO to resolve dispute and pay freelancer", async () => {
    await escrow.connect(client).createJob(freelancer.address, {
      value: parseEther("1"),
    });
    const jobId = await escrow.jobIdCounter();

    await escrow.connect(freelancer).raiseDispute(jobId);
    const initialBal = await ethers.provider.getBalance(freelancer.address);

    const tx = await escrow.connect(dao).resolveDispute(jobId, true);
    await tx.wait();

    const job = await escrow.jobs(jobId);
    expect(job.status).to.equal(3); // Resolved

    const finalBal = await ethers.provider.getBalance(freelancer.address);
    const received = finalBal - initialBal; // ✅ bigint math

    expect(received).to.be.greaterThanOrEqual(parseEther("0.999"));
  });

  it("should allow DAO to resolve dispute and refund client", async () => {
    await escrow.connect(client).createJob(freelancer.address, {
      value: parseEther("1"),
    });
    const jobId = await escrow.jobIdCounter();

    await escrow.connect(client).raiseDispute(jobId);
    const initialBal = await ethers.provider.getBalance(client.address);

    const tx = await escrow.connect(dao).resolveDispute(jobId, false);
    await tx.wait();

    const job = await escrow.jobs(jobId);
    expect(job.status).to.equal(3); // Resolved

    const finalBal = await ethers.provider.getBalance(client.address);
    const refunded = finalBal - initialBal;

    expect(refunded).to.be.greaterThanOrEqual(parseEther("0.999"));
  });
});
