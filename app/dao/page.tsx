import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { DAODashboard } from "@/components/dao-dashboard"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "DAO Governance | DecentWork",
  description: "Community-driven dispute resolution and platform governance",
}

export default function DAOPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">DAO Governance</h1>
          <DAODashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
