import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { FreelancerDashboard } from "@/components/freelancer-dashboard"
import { ClientDashboard } from "@/components/client-dashboard"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Dashboard | DecentWork",
  description: "Manage your freelance projects and clients in one place",
}

export default function DashboardPage() {
  // In a real app, you would determine the user type from authentication
  const userType = "freelancer" // or "client"

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {userType === "freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
