import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { EscrowDashboard } from "@/components/escrow-dashboard"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Escrow System | DecentWork",
  description: "Secure payment system for freelancers and clients",
}

export default function EscrowPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Escrow System</h1>
          <EscrowDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
