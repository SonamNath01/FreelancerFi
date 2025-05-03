"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import Aurora from "./ui/Aurora/Aurora";
import axios from "axios";
import { freemem } from "os";

export function ProposalModal({jobId}) {
  const [proposal, setProposal] = useState({
    message: "",
    bidAmount: "",
    deliveryTime: 1
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [freelancerId, setFreelancerId] = useState("");

  useEffect(() => {
    const freelancerId = localStorage.getItem("userId");
    setFreelancerId(freelancerId);
    console.log("Freelancer ID from localStorage:", freelancerId);
    if (!freelancerId) {
      console.error("Freelancer ID not found in localStorage. Please log in.");
    } else {
      console.log("Freelancer ID is available:", freelancerId);
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposal(prev => ({
      ...prev,
      [name]: name === "bidAmount" ? value.replace(/[^0-9.]/g, '') : value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Convert values to appropriate types
    const formattedProposal = {
      ...proposal,
      bidAmount: parseFloat(proposal.bidAmount),
      deliveryTime: parseInt(proposal.deliveryTime),
      freelancerId: freelancerId,
    };
    
    // Here you would connect to your API to send the proposal
    console.log("Submitting proposal:", formattedProposal);
    
    // Simulate API call
    console.log(jobId)
    const {data} = await axios.post(`/api/freelancer/submit-proposal/${jobId}`, formattedProposal);
    console.log("Response from API:", data);

    setTimeout(() => {
      setSubmitting(false);
      // You would handle the success/redirect here
      alert("Proposal submitted successfully!");
    }, 1000);
  };

  return (
    <div className="py-4 flex items-center justify-center relative">
      <Modal>
        <ModalTrigger className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-md transition duration-200 flex items-center justify-center shadow-lg">
          Submit Proposal
        </ModalTrigger>
        <ModalBody className="relative bg-black overflow-hidden">
          <div className="absolute inset-0">
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={0.5} 
              amplitude={0.8}
              speed={0.3}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-900/5 to-blue-900/5 blur-3xl rounded-full pointer-events-none" />
          
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
          
          <ModalContent className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
            <h4 className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-100 font-bold text-center mb-6">
              Submit Your Proposal
            </h4>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Bid Amount ($)
                </label>
                <input
                  type="text"
                  id="bidAmount"
                  name="bidAmount"
                  value={proposal.bidAmount}
                  onChange={handleChange}
                  placeholder="Enter your bid amount"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Delivery Time (days)
                </label>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={proposal.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  {[1, 2, 3, 5, 7, 10, 14, 21, 30].map(days => (
                    <option key={days} value={days}>{days} {days === 1 ? 'day' : 'days'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Why are you a good fit for this job?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={proposal.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your relevant experience and why you're the best candidate for this job..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            
            <div className="bg-blue-50/70 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg mb-4 border border-blue-100 dark:border-gray-700">
              <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Tips for a Great Proposal:</h5>
              <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc pl-4">
                <li>Highlight your relevant experience and skills</li>
                <li>Explain why you're interested in this particular project</li>
                <li>Be clear about your timeline and what's included in your bid</li>
                <li>Show that you've understood the client's requirements</li>
              </ul>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4 relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md text-sm w-28 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={submitting || !proposal.message || !proposal.bidAmount}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm w-28 transition duration-200 ${
                submitting || !proposal.message || !proposal.bidAmount ? 
                'opacity-50 cursor-not-allowed' : 
                'hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}