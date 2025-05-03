import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { FreelancerProfile } from "@/components/freelancer-profile"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Freelancer Profile | DecentWork",
  description: "View freelancer profile, portfolio and ratings",
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <FreelancerProfile id={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
