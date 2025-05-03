"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Clock,
  DollarSign,
  Star,
  ChevronRight,
  Bell,
  MessageSquare,
  Settings,
  User,
  FileText,
  PieChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FreelancerDashboard() {
  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Redesign",
      client: "TechCorp Inc.",
      deadline: "May 15, 2025",
      progress: 65,
      payment: "$2,400",
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupX",
      deadline: "June 2, 2025",
      progress: 30,
      payment: "$1,800",
    },
  ])

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <div className="sticky top-24 space-y-6">
          <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-950">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-zinc-800">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">JD</div>
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-zinc-400">UI/UX Designer</p>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Profile Completion</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress
                value={85}
                className="h-1 bg-zinc-800"
                indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-lg font-bold">4.9</p>
                <p className="text-xs text-zinc-400">Rating</p>
              </div>
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-lg font-bold">24</p>
                <p className="text-xs text-zinc-400">Completed</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: PieChart, label: "Overview", href: "/dashboard" },
              { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
              { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
              { icon: DollarSign, label: "Payments", href: "/dashboard/payments" },
              { icon: FileText, label: "Proposals", href: "/dashboard/proposals" },
              { icon: User, label: "Profile", href: "/dashboard/profile" },
              { icon: Settings, label: "Settings", href: "/dashboard/settings" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  index === 0
                    ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-zinc-800 text-white"
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
            {
              icon: DollarSign,
              label: "Available Balance",
              value: "$4,250.00",
              color: "from-purple-500/20 to-purple-700/20",
            },
            { icon: Clock, label: "Hours This Month", value: "87.5 hrs", color: "from-blue-500/20 to-blue-700/20" },
            { icon: Star, label: "Completion Rate", value: "98%", color: "from-emerald-500/20 to-emerald-700/20" },
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
                  <CardDescription>Client: {project.client}</CardDescription>
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
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Deadline: {project.deadline}</span>
                      </div>
                      <div className="font-medium">{project.payment}</div>
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

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            {[
              { icon: Bell, message: "New message from StartupX", time: "2 hours ago", color: "text-blue-400" },
              { icon: DollarSign, message: "Payment of $1,200 received", time: "Yesterday", color: "text-emerald-400" },
              {
                icon: Briefcase,
                message: "New job invitation: Mobile App Development",
                time: "2 days ago",
                color: "text-purple-400",
              },
              {
                icon: Star,
                message: "You received a 5-star review from TechCorp Inc.",
                time: "3 days ago",
                color: "text-amber-400",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`flex items-center p-4 hover:bg-zinc-900 transition-colors duration-200 ${
                  index !== 3 ? "border-b border-zinc-800" : ""
                }`}
              >
                <div className={`rounded-full p-2 mr-4 bg-zinc-900 border border-zinc-800 ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-zinc-400">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
