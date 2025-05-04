// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EscrowContract {
    enum JobStatus { Funded, Completed, Disputed, Resolved }

    struct Job {
        address client;
        address freelancer;
        uint256 amount;
        JobStatus status;
    }

    address public daoAddress;
    uint256 public jobIdCounter;
    mapping(uint256 => Job) public jobs;

    modifier onlyClient(uint256 _jobId) {
        require(msg.sender == jobs[_jobId].client, "Not job client");
        _;
    }

    modifier onlyDAO() {
        require(msg.sender == daoAddress, "Only DAO can call this");
        _;
    }

    constructor(address _daoAddress) {
        daoAddress = _daoAddress;
    }

    // Client funds the job
    function createJob(address _freelancer) external payable returns (uint256) {
        require(msg.value > 0, "Amount must be > 0");

        jobIdCounter++;
        jobs[jobIdCounter] = Job({
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            status: JobStatus.Funded
        });

        return jobIdCounter;
    }

    // Client marks job as complete, release fund to freelancer
    function completeJob(uint256 _jobId) external onlyClient(_jobId) {
        Job storage job = jobs[_jobId];
        require(job.status == JobStatus.Funded, "Job not in Funded state");

        job.status = JobStatus.Completed;
        payable(job.freelancer).transfer(job.amount);
    }

    // Client or Freelancer raises dispute
    function raiseDispute(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client || msg.sender == job.freelancer, "Not a participant");
        require(job.status == JobStatus.Funded, "Can't dispute now");

        job.status = JobStatus.Disputed;
    }

    // DAO resolves the dispute and sends funds accordingly
    function resolveDispute(uint256 _jobId, bool payToFreelancer) external onlyDAO {
        Job storage job = jobs[_jobId];
        require(job.status == JobStatus.Disputed, "Not disputed");

        job.status = JobStatus.Resolved;

        if (payToFreelancer) {
            payable(job.freelancer).transfer(job.amount);
        } else {
            payable(job.client).transfer(job.amount);
        }
    }
}
