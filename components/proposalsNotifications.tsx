"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";

type Proposal = {
  id: string;
  message: string;
  bidAmount: number;
  deliveryTime: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  freelancer: { id: string; name: string; rating: number };
  job: { id: string; title: string };
};

const ESCROW_ADDRESS = "0x57662B0D2c958514acb0960c7C1e4411E9941993"; 
const ESCROW_ABI = [
  "function createJob(address _freelancer) external payable returns (uint256)",
];

export default function ProposalNotifications() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { address, isConnected } = useAccount();
  // Load proposals
  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
        if (!userId || !role) return;

        const res = await fetch("/api/proposal/received", {
          headers: { "x-user-id": userId, "x-role": role },
        });
        const data = await res.json();
        setProposals(data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProposals();
  }, []);

  // Accept or reject a proposal
  const handleAction = async (proposal: Proposal, action: "accept" | "reject") => {
    if (action === "accept") {
      // 1) On‑chain fund
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const escrow = new ethers.Contract(ESCROW_ADDRESS, ESCROW_ABI, signer);
        const network = await provider.getNetwork();

        const tx = await escrow.createJob(address, {
          value: ethers.parseEther("0.000001"),
        });
        await tx.wait();
      } catch (err) {
        console.error("Escrow funding failed", err);
        return;
      }
    }

    // 2) Backend API call
    try {
      const res = await fetch(`/api/proposal/${action}/${proposal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.success) {
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposal.id
              ? { ...p, status: action === "accept" ? "ACCEPTED" : "REJECTED" }
              : p
          )
        );
      }
    } catch (err) {
      console.error(`Error ${action}ing proposal`, err);
    }
  };

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">
            Pending
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
            Accepted
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium">
            Rejected
          </span>
        );
    }
  };

  // star rating omitted for brevity…

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400" />
      </div>
    );
  }
  if (!proposals.length) {
    return (
      <div className="bg-gray-700/50 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">No proposals yet</h3>
        <p className="text-gray-400">New proposals will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {proposals.map((p) => (
        <div
          key={p.id}
          className="bg-gray-700/40 border border-gray-700 hover:border-gray-600 rounded-lg overflow-hidden transition-all duration-300"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">{p.job.title}</h3>
              {getStatusBadge(p.status)}
            </div>
            <p className="text-gray-300 mb-2">"{p.message}"</p>
            <div className="flex gap-4 mb-3">
              <div className="text-sm text-gray-400">Bid: ${p.bidAmount}</div>
              <div className="text-sm text-gray-400">Time: {p.deliveryTime}d</div>
            </div>
            {p.status === "PENDING" && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAction(p, "accept")}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white"
                >
                  ✅ Accept
                </Button>
                <Button
                  onClick={() => handleAction(p, "reject")}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white"
                >
                  ❌ Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
