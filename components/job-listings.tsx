"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase, ChevronDown, X, ArrowRight, Star, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { ProposalModal } from "./proposalModal"

export function JobListings() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole, setUserRole] = useState("CLIENT")
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    skills: [] as string[],
    priceRange: [0, 10000],
    experienceLevel: [] as string[],
    projectLength: [] as string[],
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Initial jobs (just two as examples)
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "E-commerce Website Redesign",
      company: "FashionBrand Co.",
      location: "Remote",
      type: "Fixed Price",
      budget: 4000,
      posted: "2 days ago",
      description: "We're looking for an experienced UI/UX designer to redesign our e-commerce website.",
      skills: ["UI/UX Design", "Figma", "HTML/CSS", "JavaScript", "E-commerce"],
      category: "Web Design",
      experienceLevel: "Intermediate",
      projectLength: "1-3 months",
      proposals: 12,
      clientRating: 4.8,
      clientReviews: 24,
    },
    {
      id: "2",
      title: "Mobile App Development - Fitness Tracker",
      company: "HealthTech Inc.",
      location: "Remote",
      type: "Hourly",
      budget: 6000,
      posted: "1 day ago",
      description: "We need a skilled mobile developer to build a fitness tracking app for iOS and Android.",
      skills: ["React Native", "iOS", "Android", "API Integration", "Firebase"],
      category: "Mobile Development",
      experienceLevel: "Expert",
      projectLength: "3-6 months",
      proposals: 8,
      clientRating: 4.9,
      clientReviews: 37,
    }
  ])

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/job/jobs')
        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }
        const data = await response.json()
        
        if (data.success && data.data) {
          const fetchedJobs = data.data.map((job: any) => {
            // Process fetched job data to match our structure
            let richDescription = {}
            try {
              richDescription = job.richDescription || {}
            } catch (e) {
              console.error("Error parsing rich description:", e)
            }
            
            return {
              id: job.id,
              title: job.title,
              company: job.company || "Company Name",
              location: job.location || "Remote",
              type: richDescription.type || "Fixed Price",
              budget: job.budget || 0,
              posted: formatDatePosted(job.createdAt || new Date()),
              description: richDescription.description || "No description provided",
              skills: richDescription.skills || [],
              category: job.category || "Other",
              experienceLevel: richDescription.experienceLevel || "Intermediate",
              projectLength: richDescription.projectLength || "1-3 months",
              proposals: job.proposals?.length || 0,
              clientRating: 4.5, // Placeholder
              clientReviews: 10, // Placeholder
            }
          })
          
          // Keep our example jobs and add the fetched ones
          setJobs(prev => [...prev, ...fetchedJobs])
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchJobs()
  }, [])
  
  // Helper to format date to "X days/hours ago"
  const formatDatePosted = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      return diffHours === 0 ? "Just now" : `${diffHours} hours ago`
    } else if (diffDays === 1) {
      return "Yesterday"
    } else {
      return `${diffDays} days ago`
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role")
      setUserRole(role || "")
    }
  }, [])

  const categories = ["Web Design", "Web Development", "Mobile Development", "Graphic Design", "Writing", "Marketing"]
  const skills = [
    "UI/UX Design",
    "React",
    "Node.js",
    "JavaScript",
    "HTML/CSS",
    "Figma",
    "Mobile",
    "Logo Design",
    "Content Writing",
    "SEO",
  ]
  const experienceLevels = ["Entry", "Intermediate", "Expert"]
  const projectLengths = ["< 1 month", "1-3 months", "3-6 months", "6+ months", "Ongoing"]

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (type === "categories") {
        if (newFilters.categories.includes(value)) {
          newFilters.categories = newFilters.categories.filter((c) => c !== value)
          setActiveFilters((prev) => prev.filter((f) => f !== value))
        } else {
          newFilters.categories = [...newFilters.categories, value]
          setActiveFilters((prev) => [...prev, value])
        }
      } else if (type === "skills") {
        if (newFilters.skills.includes(value)) {
          newFilters.skills = newFilters.skills.filter((s) => s !== value)
          setActiveFilters((prev) => prev.filter((f) => f !== value))
        } else {
          newFilters.skills = [...newFilters.skills, value]
          setActiveFilters((prev) => [...prev, value])
        }
      } else if (type === "experienceLevel") {
        if (newFilters.experienceLevel.includes(value)) {
          newFilters.experienceLevel = newFilters.experienceLevel.filter((e) => e !== value)
          setActiveFilters((prev) => prev.filter((f) => f !== value))
        } else {
          newFilters.experienceLevel = [...newFilters.experienceLevel, value]
          setActiveFilters((prev) => [...prev, value])
        }
      } else if (type === "projectLength") {
        if (newFilters.projectLength.includes(value)) {
          newFilters.projectLength = newFilters.projectLength.filter((p) => p !== value)
          setActiveFilters((prev) => prev.filter((f) => f !== value))
        } else {
          newFilters.projectLength = [...newFilters.projectLength, value]
          setActiveFilters((prev) => [...prev, value])
        }
      }
      return newFilters
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }))

    // Add price range to active filters
    const priceFilter = `$${value[0]} - $${value[1]}`
    setActiveFilters((prev) => {
      const withoutPrice = prev.filter((f) => !f.startsWith("$"))
      return [...withoutPrice, priceFilter]
    })
  }

  const clearFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))

    if (filter.startsWith("$")) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [0, 10000],
      }))
      return
    }

    setFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters.categories.includes(filter)) {
        newFilters.categories = newFilters.categories.filter((c) => c !== filter)
      }
      if (newFilters.skills.includes(filter)) {
        newFilters.skills = newFilters.skills.filter((s) => s !== filter)
      }
      if (newFilters.experienceLevel.includes(filter)) {
        newFilters.experienceLevel = newFilters.experienceLevel.filter((e) => e !== filter)
      }
      if (newFilters.projectLength.includes(filter)) {
        newFilters.projectLength = newFilters.projectLength.filter((p) => p !== filter)
      }
      return newFilters
    })
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setFilters({
      categories: [],
      skills: [],
      priceRange: [0, 10000],
      experienceLevel: [],
      projectLength: [],
    })
  }

  const filteredJobs = jobs.filter((job) => {
    // Search term filter
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
      return false
    }

    // Skills filter
    if (filters.skills.length > 0 && !job.skills.some((skill) => filters.skills.includes(skill))) {
      return false
    }

    // Price range filter
    if (job.budget < filters.priceRange[0] || job.budget > filters.priceRange[1]) {
      return false
    }

    // Experience level filter
    if (filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
      return false
    }

    // Project length filter
    if (filters.projectLength.length > 0 && !filters.projectLength.includes(job.projectLength)) {
      return false
    }

    return true
  })

  // Format budget for display
  const formatBudget = (budget: number) => {
    if (budget >= 1000) {
      return `$${(budget / 1000).toFixed(1)}k`
    }
    return `$${budget}`
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Filters Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <div className="sticky top-24 space-y-6">
          {/* Search */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-md">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-purple-400" />
                <h3 className="font-medium">Filters</h3>
              </div>
              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-8 text-xs text-zinc-400 hover:text-white"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="p-4">
              <Accordion type="multiple" className="space-y-2">
                <AccordionItem value="category" className="border-zinc-800">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Category</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => handleFilterChange("categories", category)}
                            className="border-zinc-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills" className="border-zinc-800">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Skills</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={filters.skills.includes(skill)}
                            onCheckedChange={() => handleFilterChange("skills", skill)}
                            className="border-zinc-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <label
                            htmlFor={`skill-${skill}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="budget" className="border-zinc-800">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Budget</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">${filters.priceRange[0]}</span>
                        <span className="text-sm text-zinc-400">${filters.priceRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 10000]}
                        value={filters.priceRange}
                        max={10000}
                        step={100}
                        onValueChange={handlePriceRangeChange}
                        className="[&>span]:bg-purple-500"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience" className="border-zinc-800">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Experience Level</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {experienceLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            id={`level-${level}`}
                            checked={filters.experienceLevel.includes(level)}
                            onCheckedChange={() => handleFilterChange("experienceLevel", level)}
                            className="border-zinc-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <label
                            htmlFor={`level-${level}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="length" className="border-zinc-800">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Project Length</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {projectLengths.map((length) => (
                        <div key={length} className="flex items-center space-x-2">
                          <Checkbox
                            id={`length-${length}`}
                            checked={filters.projectLength.includes(length)}
                            onCheckedChange={() => handleFilterChange("projectLength", length)}
                            className="border-zinc-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <label
                            htmlFor={`length-${length}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {length}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="outline"
                className="bg-zinc-900 border-zinc-700 text-white pl-2 pr-1 py-1 flex items-center"
              >
                {filter}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter(filter)}
                  className="h-4 w-4 p-0 ml-1 text-zinc-400 hover:text-white hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-7 text-xs text-zinc-400 hover:text-white"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Sort and Results Count + Post Job Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <p className="text-zinc-400 text-sm">
              Showing <span className="font-medium text-white">{filteredJobs.length}</span> jobs
            </p>
            
            {/* Post Job Button - Only shown for clients */}
            {userRole === "CLIENT" && (
              <Button 
                className="sm:ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                size="sm"
                onClick={() => router.push("/post-job")}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Post Job
              </Button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                Sort By: Newest
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">Newest</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">Budget: High to Low</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">Budget: Low to High</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">Client Rating</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center shadow-md">
            <h3 className="text-lg font-bold mb-2">Loading jobs...</h3>
            <p className="text-zinc-400">Please wait while we fetch the latest opportunities.</p>
          </div>
        )}

        {/* Job Cards */}
        {!isLoading && filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl">
                      <Link href={`/jobs/${job.id}`} className="hover:text-purple-400 transition-colors">
                        {job.title}
                      </Link>
                    </CardTitle>
                    <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400 mt-1">
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4 text-purple-400" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-purple-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-purple-400" />
                      {formatBudget(job.budget)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-purple-400" />
                      Posted {job.posted}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-zinc-300 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} className="bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 5 && (
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                        +{job.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="flex items-center text-zinc-400">
                      <div className="flex mr-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(job.clientRating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"}`}
                            />
                          ))}
                      </div>
                      <span>
                        {job.clientRating} ({job.clientReviews} reviews)
                      </span>
                    </div>
                    <div className="ml-auto text-zinc-400">{job.proposals} proposals</div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/50 text-white"
                  >
                    {/* <Link href={`/jobs/${job.id}`}>
                      View Job
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link> */}
                    <ProposalModal/>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : !isLoading && filteredJobs.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center shadow-md">
            <h3 className="text-lg font-bold mb-2">No jobs found</h3>
            <p className="text-zinc-400 mb-4">Try adjusting your filters or search term to find more jobs.</p>
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              Clear All Filters
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}