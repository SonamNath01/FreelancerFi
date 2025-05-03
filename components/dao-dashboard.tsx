"use client"

import { useState } from "react"
import {
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Vote,
  Shield,
  FileText,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DAODashboard() {
  const [disputes, setDisputes] = useState([
    {
      id: 1,
      title: "Marketing Website Payment Dispute",
      client: "GrowthCo",
      freelancer: "Michael Brown",
      amount: "$4,500",
      status: "active",
      votesFor: 24,
      votesAgainst: 8,
      totalVotes: 32,
      deadline: "April 25, 2025 (3 days left)",
    },
    {
      id: 2,
      title: "Logo Design Revision Dispute",
      client: "FitnessBrand",
      freelancer: "Emily Davis",
      amount: "$800",
      status: "active",
      votesFor: 15,
      votesAgainst: 12,
      totalVotes: 27,
      deadline: "April 22, 2025 (12 hours left)",
    },
    {
      id: 3,
      title: "Mobile App Development Milestone",
      client: "FinTech Inc.",
      freelancer: "John Smith",
      amount: "$3,200",
      status: "resolved",
      votesFor: 42,
      votesAgainst: 5,
      totalVotes: 47,
      deadline: "Resolved on April 10, 2025",
      resolution: "In favor of freelancer",
    },
  ])

  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Reduce Platform Fee from 5% to 3%",
      proposer: "DAO Member: Alex Johnson",
      status: "active",
      votesFor: 156,
      votesAgainst: 42,
      totalVotes: 198,
      deadline: "May 5, 2025 (10 days left)",
    },
    {
      id: 2,
      title: "Add Support for New Payment Methods",
      proposer: "DAO Member: Sarah Williams",
      status: "active",
      votesFor: 187,
      votesAgainst: 15,
      totalVotes: 202,
      deadline: "April 30, 2025 (5 days left)",
    },
  ])

  const [activeMembers, setActiveMembers] = useState([
    { name: "Alex Johnson", votes: 47, status: "active" },
    { name: "Sarah Williams", votes: 38, status: "active" },
    { name: "Michael Chen", votes: 32, status: "active" },
    { name: "Emma Davis", votes: 29, status: "active" },
    { name: "Robert Kim", votes: 26, status: "active" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* DAO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Users,
            label: "Active DAO Members",
            value: "248",
            description: "Participating in governance",
            color: "from-purple-500/20 to-blue-500/20",
          },
          {
            icon: AlertTriangle,
            label: "Active Disputes",
            value: "2",
            description: "Awaiting resolution",
            color: "from-amber-500/20 to-amber-700/20",
          },
          {
            icon: Vote,
            label: "Governance Proposals",
            value: "2",
            description: "Open for voting",
            color: "from-emerald-500/20 to-emerald-700/20",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-colors duration-300"
          >
            <div
              className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-50 blur-xl`}
            />
            <div className="relative flex items-center space-x-4">
              <div className="rounded-full bg-zinc-900 p-3 border border-zinc-800">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DAO Tabs */}
      <Tabs defaultValue="disputes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          <TabsTrigger value="disputes" className="data-[state=active]:bg-zinc-900">
            Disputes
          </TabsTrigger>
          <TabsTrigger value="proposals" className="data-[state=active]:bg-zinc-900">
            Proposals
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-zinc-900">
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disputes" className="mt-6">
          <div className="space-y-6">
            {disputes.map((dispute) => (
              <Card
                key={dispute.id}
                className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dispute.title}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                      <div className="flex items-center space-x-1">
                        {dispute.status === "active" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span className="capitalize">{dispute.status}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    Client: {dispute.client} • Freelancer: {dispute.freelancer} • Amount: {dispute.amount}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Voting Progress</span>
                        <span>{dispute.totalVotes} votes cast</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-emerald-500"
                            style={{ width: `${(dispute.votesFor / dispute.totalVotes) * 100}%` }}
                          />
                          <div
                            className="bg-red-500"
                            style={{ width: `${(dispute.votesAgainst / dispute.totalVotes) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1" />
                          For Freelancer: {dispute.votesFor} votes
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
                          For Client: {dispute.votesAgainst} votes
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{dispute.deadline}</span>
                      </div>
                      {dispute.resolution && (
                        <div className="font-medium text-emerald-400">Resolution: {dispute.resolution}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                  >
                    <FileText className="mr-1 h-4 w-4" />
                    View Details
                  </Button>

                  {dispute.status === "active" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/50 text-white"
                      >
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 text-white"
                      >
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Vote Against
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span className="capitalize">{proposal.status}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{proposal.proposer}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Voting Progress</span>
                        <span>{proposal.totalVotes} votes cast</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-emerald-500"
                            style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                          />
                          <div
                            className="bg-red-500"
                            style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1" />
                          For: {proposal.votesFor} votes
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
                          Against: {proposal.votesAgainst} votes
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{proposal.deadline}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                  >
                    <FileText className="mr-1 h-4 w-4" />
                    View Details
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/50 text-white"
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      Vote For
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 text-white"
                    >
                      <ThumbsDown className="mr-1 h-4 w-4" />
                      Vote Against
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="space-y-6">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                <CardTitle>Active DAO Members</CardTitle>
                <CardDescription>Members who have participated in recent votes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border border-zinc-800">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-zinc-400">{member.votes} votes cast</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        <span className="capitalize">{member.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <Users className="mr-1 h-4 w-4" />
                  View All Members
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                <CardTitle>DAO Membership</CardTitle>
                <CardDescription>How to become a DAO member and participate in governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-zinc-800 p-4">
                    <h3 className="text-lg font-bold mb-2">Membership Requirements</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 mr-2 text-purple-400 shrink-0 mt-0.5" />
                        <span>Hold at least 100 DECENT tokens in your wallet</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-purple-400 shrink-0 mt-0.5" />
                        <span>Complete at least 3 successful projects on the platform</span>
                      </li>
                      <li className="flex items-start">
                        <Vote className="h-5 w-5 mr-2 text-purple-400 shrink-0 mt-0.5" />
                        <span>Participate in at least 5 votes per month to maintain active status</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart3 className="h-5 w-5 mr-2 text-purple-400 shrink-0 mt-0.5" />
                        <span>Voting power is proportional to your token holdings and platform reputation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/50 text-white">
                  Apply for Membership
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* How DAO Works */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">How Our DAO Governance Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Dispute Submission",
              description:
                "When a dispute arises between a client and freelancer, either party can submit it to the DAO for resolution.",
              icon: AlertTriangle,
              color: "from-amber-500/20 to-amber-500/10",
            },
            {
              step: 2,
              title: "Community Voting",
              description:
                "DAO members review the evidence and vote on the resolution. Voting power is based on token holdings and reputation.",
              icon: Vote,
              color: "from-purple-500/20 to-purple-500/10",
            },
            {
              step: 3,
              title: "Automated Execution",
              description:
                "Once voting concludes, the smart contract automatically executes the decision, releasing funds to the appropriate party.",
              icon: Shield,
              color: "from-emerald-500/20 to-emerald-500/10",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-colors duration-300"
            >
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${step.color} opacity-50 blur-xl`}
              />
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="ml-3 h-px flex-1 bg-zinc-800" />
                </div>
                <div className="rounded-full bg-zinc-900 p-3 border border-zinc-800 inline-flex mb-4">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
