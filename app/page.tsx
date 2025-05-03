import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { IntroSection } from "@/components/intro-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CTASection } from "@/components/action-section"
import ProposalNotifications from "@/components/proposalsNotifications"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <CTASection/>
        {/* <ProposalNotifications/> */}

        {/* Call to Action Section */}
        {/* <section className="container mx-auto py-20 px-4">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Ready to revolutionize your freelance experience?
            </h2>
            <p className="max-w-[700px] text-zinc-400">
              Join our decentralized platform and experience the future of freelancing with secure payments, transparent
              processes, and community governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-800"
              >
                <Link href="/dashboard">
                  Get Started
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-opacity duration-300 group-hover:opacity-100" />
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-zinc-800 text-white hover:text-white hover:bg-zinc-900"
              >
                <Link href="/jobs">
                  Browse Jobs
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
