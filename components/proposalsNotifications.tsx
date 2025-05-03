'use client';

import { useEffect, useState } from 'react';

type Proposal = {
  id: string;
  message: string;
  bidAmount: number;
  deliveryTime: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  freelancer: {
    name: string;
    rating: number;
  };
  job: {
    id: string;
    title: string;
  };
};

export default function ProposalNotifications() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');

        if (!userId || !role) return;

        const res = await fetch('/api/proposal/received', {
          headers: {
            'x-user-id': userId,
            'x-role': role,
          },
        });

        const data = await res.json();
        setProposals(data.data || []);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleAction = async (proposalId: string, action: 'accept' | 'reject') => {
    try {
      const res = await fetch(`/api/proposal/${action}/${proposalId}`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId ? { ...p, status: action.toUpperCase() as Proposal['status'] } : p
          )
        );
      }
    } catch (error) {
      console.error(`Error ${action}ing proposal:`, error);
    }
  };

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">Pending</span>;
      case 'ACCEPTED':
        return <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">Accepted</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium">Rejected</span>;
    }
  };

  // Render star rating with filled and unfilled stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const pendingCount = proposals.filter(p => p.status === 'PENDING').length;

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      ) : proposals.length === 0 ? (
        <div className="bg-gray-700/50 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">No proposals yet</h3>
          <p className="text-gray-400">New proposals will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div 
              key={proposal.id} 
              className="bg-gray-700/40 border border-gray-700 hover:border-gray-600 rounded-lg overflow-hidden transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {proposal.job.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">ID: {proposal.id.substring(0, 8)}...</span>
                    {getStatusBadge(proposal.status)}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                      {proposal.freelancer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{proposal.freelancer.name}</div>
                      {renderRating(proposal.freelancer.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mt-3 text-sm border-l-2 border-blue-500 pl-2 py-1">
                    "{proposal.message}"
                  </p>
                  
                  <div className="flex gap-3 mt-3">
                    <div className="bg-gray-900/70 px-2 py-1 rounded-md flex items-center flex-1">
                      <span className="text-blue-300 mr-1 text-xs">💰</span>
                      <div>
                        <div className="text-xs text-gray-400">Bid</div>
                        <div className="text-sm font-medium text-white">${proposal.bidAmount}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/70 px-2 py-1 rounded-md flex items-center flex-1">
                      <span className="text-purple-300 mr-1 text-xs">⏱️</span>
                      <div>
                        <div className="text-xs text-gray-400">Time</div>
                        <div className="text-sm font-medium text-white">{proposal.deliveryTime}d</div>
                      </div>
                    </div>
                  </div>

                  {proposal.status === 'PENDING' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAction(proposal.id, 'accept')}
                        className="flex-1 py-1 px-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded transition duration-300 flex items-center justify-center gap-1"
                      >
                        <span>✅</span>
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleAction(proposal.id, 'reject')}
                        className="flex-1 py-1 px-2 bg-gray-600 hover:bg-red-500 text-white text-sm rounded transition duration-300 flex items-center justify-center gap-1"
                      >
                        <span>❌</span>
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}