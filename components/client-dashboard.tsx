"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Users,
  DollarSign,
  Search,
  ChevronRight,
  Clock,
  MessageSquare,
  Settings,
  User,
  FileText,
  PieChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ClientDashboard() {
  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Redesign",
      freelancer: "John Smith",
      deadline: "May 15, 2025",
      progress: 65,
      budget: "$2,400",
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      freelancer: "Sarah Johnson",
      deadline: "June 2, 2025",
      progress: 30,
      budget: "$1,800",
    },
  ])

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <div className="sticky top-24 space-y-6">
          <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-950">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-zinc-800">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">AC</div>
              </div>
              <div>
                <h3 className="font-medium">Acme Corporation</h3>
                <p className="text-sm text-zinc-400">Client</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-lg font-bold">5</p>
                <p className="text-xs text-zinc-400">Active Projects</p>
              </div>
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-lg font-bold">12</p>
                <p className="text-xs text-zinc-400">Completed</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: PieChart, label: "Overview", href: "/dashboard" },
              { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
              { icon: Users, label: "Freelancers", href: "/dashboard/freelancers" },
              { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
              { icon: DollarSign, label: "Payments", href: "/dashboard/payments" },
              { icon: FileText, label: "Contracts", href: "/dashboard/contracts" },
              { icon: User, label: "Company Profile", href: "/dashboard/profile" },
              { icon: Settings, label: "Settings", href: "/dashboard/settings" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  index === 0
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: DollarSign, label: "Total Budget", value: "$12,500.00", color: "from-blue-500/20 to-blue-700/20" },
            { icon: Briefcase, label: "Active Projects", value: "5", color: "from-purple-500/20 to-purple-700/20" },
            { icon: Users, label: "Hired Freelancers", value: "8", color: "from-emerald-500/20 to-emerald-700/20" },
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Projects</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>Freelancer: {project.freelancer}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress
                        value={project.progress}
                        className="h-1 bg-zinc-800"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Deadline: {project.deadline}</span>
                      </div>
                      <div className="font-medium">{project.budget}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                  >
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Hired Freelancers */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Hired Freelancers</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              Find More
              <Search className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            {[
              { name: "John Smith", role: "UI/UX Designer", rating: 4.9, projects: 3 },
              { name: "Sarah Johnson", role: "Frontend Developer", rating: 4.8, projects: 2 },
              { name: "Michael Brown", role: "Backend Developer", rating: 5.0, projects: 1 },
              { name: "Emily Davis", role: "Graphic Designer", rating: 4.7, projects: 2 },
            ].map((freelancer, index) => (
              <div
                key={index}
                className={`flex items-center p-4 hover:bg-zinc-900 transition-colors duration-200 ${
                  index !== 3 ? "border-b border-zinc-800" : ""
                }`}
              >
                <Avatar className="h-10 w-10 mr-4 border border-zinc-800">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    {freelancer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium">{freelancer.name}</p>
                    <div className="ml-2 flex items-center">
                      <span className="text-xs bg-zinc-900 text-zinc-300 px-1.5 py-0.5 rounded-full border border-zinc-800">
                        {freelancer.rating} ★
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {freelancer.role} • {freelancer.projects} projects
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
