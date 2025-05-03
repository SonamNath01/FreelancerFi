"use client"

import { useState } from "react"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  DollarSign,
  Lock,
  Unlock,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function EscrowDashboard() {
  const [escrows, setEscrows] = useState([
    {
      id: 1,
      project: "E-commerce Website Redesign",
      client: "TechCorp Inc.",
      amount: "$2,400",
      status: "active",
      progress: 65,
      releaseDate: "May 15, 2025",
    },
    {
      id: 2,
      project: "Mobile App UI Design",
      client: "StartupX",
      amount: "$1,800",
      status: "pending",
      progress: 0,
      releaseDate: "Awaiting deposit",
    },
    {
      id: 3,
      project: "Brand Identity Design",
      client: "FashionBrand Co.",
      amount: "$3,200",
      status: "completed",
      progress: 100,
      releaseDate: "Released on April 10, 2025",
    },
    {
      id: 4,
      project: "Marketing Website",
      client: "GrowthCo",
      amount: "$4,500",
      status: "dispute",
      progress: 80,
      releaseDate: "In dispute resolution",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "pending":
        return <Lock className="h-5 w-5 text-amber-400" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      case "dispute":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "dispute":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-blue-500 to-purple-500"
      case "pending":
        return "bg-gradient-to-r from-amber-500 to-amber-600"
      case "completed":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600"
      case "dispute":
        return "bg-gradient-to-r from-red-500 to-red-600"
      default:
        return "bg-gradient-to-r from-zinc-500 to-zinc-600"
    }
  }

  return (
    <div className="space-y-8">
      {/* Escrow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            label: "Total in Escrow",
            value: "$4,200.00",
            description: "Across 2 active projects",
            color: "from-blue-500/20 to-purple-500/20",
          },
          {
            icon: CheckCircle,
            label: "Released Payments",
            value: "$7,800.00",
            description: "From 5 completed projects",
            color: "from-emerald-500/20 to-emerald-700/20",
          },
          {
            icon: AlertTriangle,
            label: "In Dispute",
            value: "$4,500.00",
            description: "1 project under review",
            color: "from-red-500/20 to-red-700/20",
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

      {/* Escrow Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-900">
            All
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-zinc-900">
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-zinc-900">
            Completed
          </TabsTrigger>
          <TabsTrigger value="disputes" className="data-[state=active]:bg-zinc-900">
            Disputes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {escrows.map((escrow) => (
              <Card
                key={escrow.id}
                className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
              >
                <div
                  className={`h-1 w-full ${getProgressColor(escrow.status)}`}
                  style={{ width: `${escrow.progress}%` }}
                />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{escrow.project}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(escrow.status)}
                        <span className="capitalize">{escrow.status}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>Client: {escrow.client}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Escrow Progress</span>
                        <span>{escrow.progress}%</span>
                      </div>
                      <Progress
                        value={escrow.progress}
                        className="h-1 bg-zinc-800"
                        indicatorClassName={getProgressColor(escrow.status)}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{escrow.releaseDate}</span>
                      </div>
                      <div className="font-medium">{escrow.amount}</div>
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

                  {escrow.status === "active" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/50 text-white"
                        >
                          Actions
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800">
                        <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                          <Unlock className="mr-2 h-4 w-4" />
                          <span>Release Payment</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Raise Dispute</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {escrow.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/50 text-white"
                    >
                      <DollarSign className="mr-1 h-4 w-4" />
                      Make Deposit
                    </Button>
                  )}

                  {escrow.status === "dispute" && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 text-white"
                    >
                      View Dispute
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-6">
            {escrows
              .filter((e) => e.status === "active" || e.status === "pending")
              .map((escrow) => (
                <Card
                  key={escrow.id}
                  className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
                >
                  <div
                    className={`h-1 w-full ${getProgressColor(escrow.status)}`}
                    style={{ width: `${escrow.progress}%` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{escrow.project}</CardTitle>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(escrow.status)}
                          <span className="capitalize">{escrow.status}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>Client: {escrow.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Escrow Progress</span>
                          <span>{escrow.progress}%</span>
                        </div>
                        <Progress
                          value={escrow.progress}
                          className="h-1 bg-zinc-800"
                          indicatorClassName={getProgressColor(escrow.status)}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-zinc-400">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{escrow.releaseDate}</span>
                        </div>
                        <div className="font-medium">{escrow.amount}</div>
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

                    {escrow.status === "active" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/50 text-white"
                          >
                            Actions
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800">
                          <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                            <Unlock className="mr-2 h-4 w-4" />
                            <span>Release Payment</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>Raise Dispute</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {escrow.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/50 text-white"
                      >
                        <DollarSign className="mr-1 h-4 w-4" />
                        Make Deposit
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-6">
            {escrows
              .filter((e) => e.status === "completed")
              .map((escrow) => (
                <Card
                  key={escrow.id}
                  className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
                >
                  <div
                    className={`h-1 w-full ${getProgressColor(escrow.status)}`}
                    style={{ width: `${escrow.progress}%` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{escrow.project}</CardTitle>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(escrow.status)}
                          <span className="capitalize">{escrow.status}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>Client: {escrow.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Escrow Progress</span>
                          <span>{escrow.progress}%</span>
                        </div>
                        <Progress
                          value={escrow.progress}
                          className="h-1 bg-zinc-800"
                          indicatorClassName={getProgressColor(escrow.status)}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-zinc-400">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{escrow.releaseDate}</span>
                        </div>
                        <div className="font-medium">{escrow.amount}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                    >
                      <FileText className="mr-1 h-4 w-4" />
                      View Transaction Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="disputes" className="mt-6">
          <div className="space-y-6">
            {escrows
              .filter((e) => e.status === "dispute")
              .map((escrow) => (
                <Card
                  key={escrow.id}
                  className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
                >
                  <div
                    className={`h-1 w-full ${getProgressColor(escrow.status)}`}
                    style={{ width: `${escrow.progress}%` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{escrow.project}</CardTitle>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(escrow.status)}
                          <span className="capitalize">{escrow.status}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>Client: {escrow.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Escrow Progress</span>
                          <span>{escrow.progress}%</span>
                        </div>
                        <Progress
                          value={escrow.progress}
                          className="h-1 bg-zinc-800"
                          indicatorClassName={getProgressColor(escrow.status)}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-zinc-400">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{escrow.releaseDate}</span>
                        </div>
                        <div className="font-medium">{escrow.amount}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 text-white"
                    >
                      View Dispute Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* How Escrow Works */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">How Our Escrow System Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Client Deposits Funds",
              description: "The client securely deposits the project funds into our blockchain-based escrow system.",
              icon: DollarSign,
              color: "from-blue-500/20 to-blue-500/10",
            },
            {
              step: 2,
              title: "Work Completion",
              description: "The freelancer completes the work according to the agreed terms and submits for approval.",
              icon: CheckCircle,
              color: "from-purple-500/20 to-purple-500/10",
            },
            {
              step: 3,
              title: "Funds Release",
              description:
                "Upon approval, funds are automatically released to the freelancer. Disputes are handled by the DAO.",
              icon: Unlock,
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
