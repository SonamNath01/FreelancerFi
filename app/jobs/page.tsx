import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { JobListings } from "@/components/job-listings"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Job Listings | DecentWork",
  description: "Browse available freelance jobs and projects",
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
          <JobListings />
        </div>
      </main>
      <Footer />
    </div>
  )
}
