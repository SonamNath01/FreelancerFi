// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DisputeResolutionDAO {
    struct Dispute {
        address freelancer;
        address client;
        string reason;
        uint voteYes;
        uint voteNo;
        bool resolved;
        address winner;
        mapping(address => bool) hasVoted;
    }

    address public owner;
    uint public disputeCount = 0;
    uint public stakingAmount = 0.01 ether;

    mapping(uint => Dispute) public disputes;

    event DisputeCreated(uint disputeId, address freelancer, address client);
    event Voted(uint disputeId, address voter, bool vote);
    event DisputeResolved(uint disputeId, address winner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function createDispute(address _freelancer, address _client, string memory _reason) external onlyOwner returns (uint) {
        disputeCount++;
        Dispute storage d = disputes[disputeCount];
        d.freelancer = _freelancer;
        d.client = _client;
        d.reason = _reason;
        emit DisputeCreated(disputeCount, _freelancer, _client);
        return disputeCount;
    }

    function voteOnDispute(uint _disputeId, bool voteFreelancer) external payable {
        require(msg.value == stakingAmount, "Stake required");
        Dispute storage d = disputes[_disputeId];
        require(!d.resolved, "Already resolved");
        require(!d.hasVoted[msg.sender], "Already voted");

        d.hasVoted[msg.sender] = true;

        if (voteFreelancer) {
            d.voteYes++;
        } else {
            d.voteNo++;
        }

        emit Voted(_disputeId, msg.sender, voteFreelancer);
    }

    function resolveDispute(uint _disputeId) external onlyOwner {
        Dispute storage d = disputes[_disputeId];
        require(!d.resolved, "Already resolved");

        d.resolved = true;

        if (d.voteYes >= d.voteNo) {
            d.winner = d.freelancer;
        } else {
            d.winner = d.client;
        }

        emit DisputeResolved(_disputeId, d.winner);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
