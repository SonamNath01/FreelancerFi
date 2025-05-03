"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  Share2,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function FreelancerProfile({ id }: { id: string }) {
  // In a real app, you would fetch the freelancer data based on the ID
  const [freelancer, setFreelancer] = useState({
    name: "John Smith",
    title: "UI/UX Designer & Frontend Developer",
    location: "San Francisco, CA",
    memberSince: "January 2023",
    rating: 4.9,
    reviews: 38,
    completionRate: 98,
    bio: "I'm a passionate UI/UX designer and frontend developer with over 5 years of experience creating beautiful, functional, and user-centered digital experiences. I specialize in creating clean, modern designs and translating them into pixel-perfect code.",
    hourlyRate: "$65",
    skills: [
      "UI/UX Design",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "HTML/CSS",
      "JavaScript",
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
      { name: "French", level: "Conversational" },
    ],
    education: [{ degree: "B.S. in Computer Science", school: "Stanford University", year: "2018-2022" }],
    portfolio: [
      {
        id: 1,
        title: "E-commerce Website Redesign",
        client: "FashionBrand Co.",
        image: "/placeholder.svg?height=300&width=500",
        description:
          "Complete redesign of an e-commerce platform focusing on improved user experience and conversion rate optimization.",
      },
      {
        id: 2,
        title: "Mobile Banking App",
        client: "FinTech Inc.",
        image: "/placeholder.svg?height=300&width=500",
        description: "Designed and developed a mobile banking application with a focus on security and ease of use.",
      },
      {
        id: 3,
        title: "SaaS Dashboard",
        client: "TechCorp",
        image: "/placeholder.svg?height=300&width=500",
        description: "Created an intuitive dashboard for a SaaS platform that simplifies complex data visualization.",
      },
    ],
    reviews: [
      {
        id: 1,
        client: "Sarah Johnson",
        clientTitle: "Product Manager at TechCorp",
        rating: 5,
        date: "March 15, 2025",
        comment:
          "John delivered exceptional work on our dashboard project. His attention to detail and ability to translate our requirements into a beautiful, functional interface exceeded our expectations. He was communicative throughout the process and delivered on time. Highly recommended!",
      },
      {
        id: 2,
        client: "Michael Brown",
        clientTitle: "Founder at StartupX",
        rating: 5,
        date: "February 22, 2025",
        comment:
          "Working with John was a pleasure. He took our vague concept and turned it into a stunning website that perfectly represents our brand. His technical skills are top-notch, and he was always responsive to feedback and requests for changes.",
      },
      {
        id: 3,
        client: "Emily Davis",
        clientTitle: "Marketing Director at GrowthCo",
        rating: 4,
        date: "January 10, 2025",
        comment:
          "John created a beautiful design for our marketing website. He was professional, met all deadlines, and was very receptive to feedback. The only reason for 4 stars instead of 5 is that we needed a few more revisions than initially expected, but the final result was excellent.",
      },
    ],
    workHistory: [
      {
        id: 1,
        project: "E-commerce Website Redesign",
        client: "FashionBrand Co.",
        date: "Feb 2025 - Mar 2025",
        amount: "$4,800",
        status: "Completed",
        rating: 5,
      },
      {
        id: 2,
        project: "SaaS Dashboard",
        client: "TechCorp",
        date: "Dec 2024 - Jan 2025",
        amount: "$3,200",
        status: "Completed",
        rating: 5,
      },
      {
        id: 3,
        project: "Mobile Banking App",
        client: "FinTech Inc.",
        date: "Oct 2024 - Nov 2024",
        amount: "$5,500",
        status: "Completed",
        rating: 4,
      },
    ],
  })

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-400"}`}
        />
      ))
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Profile Header */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
          <div className="p-6 -mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative h-24 w-24 rounded-lg border-4 border-zinc-950 overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  {freelancer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{freelancer.name}</h1>
                <p className="text-zinc-400">{freelancer.title}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                <Button className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/50 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {freelancer.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Member since {freelancer.memberSince}
              </div>
              <div className="flex items-center">
                <div className="flex mr-1">{renderStars(freelancer.rating)}</div>
                <span>
                  {freelancer.rating} ({freelancer.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-zinc-900">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-zinc-900">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-zinc-900">
              Work History
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-zinc-900">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancer.portfolio.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-zinc-300">Client: {item.client}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{item.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                    >
                      View Project
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900">
                View All Projects
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {freelancer.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{review.client}</h3>
                      <p className="text-sm text-zinc-400">{review.clientTitle}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-2">{renderStars(review.rating)}</div>
                      <span className="text-sm text-zinc-400">{review.date}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-zinc-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="grid grid-cols-12 p-4 border-b border-zinc-800 text-sm font-medium text-zinc-400">
                <div className="col-span-5">Project</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Rating</div>
              </div>
              {freelancer.workHistory.map((work) => (
                <div
                  key={work.id}
                  className="grid grid-cols-12 p-4 border-b border-zinc-800 hover:bg-zinc-900 transition-colors duration-200"
                >
                  <div className="col-span-5">
                    <div className="font-medium">{work.project}</div>
                    <div className="text-sm text-zinc-400">Client: {work.client}</div>
                  </div>
                  <div className="col-span-3 flex items-center text-zinc-400">{work.date}</div>
                  <div className="col-span-2 flex items-center font-medium">{work.amount}</div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex">{renderStars(work.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-lg font-bold mb-4">About Me</h3>
                <p className="text-zinc-300">{freelancer.bio}</p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-lg font-bold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <Badge key={index} className="bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                  <h3 className="text-lg font-bold mb-4">Languages</h3>
                  <div className="space-y-3">
                    {freelancer.languages.map((language, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{language.name}</span>
                        <Badge variant="outline" className="border-zinc-700">
                          {language.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                  <h3 className="text-lg font-bold mb-4">Education</h3>
                  <div className="space-y-3">
                    {freelancer.education.map((edu, index) => (
                      <div key={index}>
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-zinc-400">
                          {edu.school}, {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="sticky top-24 space-y-6">
          {/* Stats */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Hourly Rate</span>
                  <span className="text-xl font-bold">{freelancer.hourlyRate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Job Success</span>
                  <span>{freelancer.completionRate}%</span>
                </div>
                <Progress
                  value={freelancer.completionRate}
                  className="h-1 bg-zinc-800"
                  indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-zinc-800">
                <div className="text-center">
                  <div className="text-2xl font-bold">{freelancer.reviews}</div>
                  <div className="text-xs text-zinc-400">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{freelancer.workHistory.length}</div>
                  <div className="text-xs text-zinc-400">Projects</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/50 text-white">
                Invite to Project
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-lg font-bold mb-4">Achievements</h3>
            <div className="space-y-4">
              {[
                { icon: Award, label: "Top Rated", description: "Top 5% in UI/UX Design" },
                { icon: CheckCircle, label: "Identity Verified", description: "ID and credentials verified" },
                { icon: Clock, label: "Fast Response", description: "Responds within 2 hours" },
                { icon: Briefcase, label: "Experienced", description: "5+ years of experience" },
              ].map((badge, index) => (
                <div key={index} className="flex items-start">
                  <div className="rounded-full bg-zinc-900 p-2 mr-3 border border-zinc-800">
                    <badge.icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">{badge.label}</div>
                    <div className="text-xs text-zinc-400">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Freelancers */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-lg font-bold mb-4">Similar Freelancers</h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", title: "UI/UX Designer", rating: 4.8 },
                { name: "Michael Brown", title: "Frontend Developer", rating: 4.7 },
                { name: "Emily Davis", title: "Product Designer", rating: 4.9 },
              ].map((freelancer, index) => (
                <Link
                  key={index}
                  href={`/profile/${index + 1}`}
                  className="flex items-center p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-zinc-900 mr-3 border border-zinc-800">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{freelancer.name}</div>
                    <div className="text-xs text-zinc-400 truncate">{freelancer.title}</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    {freelancer.rating}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
