"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Users } from "lucide-react"

export function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const features = [
    {
      icon: Shield,
      title: "Secure Escrow System",
      description:
        "Our blockchain-based escrow system ensures your payments are secure and only released when work is completed to satisfaction.",
    },
    {
      icon: Zap,
      title: "Efficient Matching",
      description:
        "Advanced algorithms match freelancers with the perfect projects based on skills, experience, and preferences.",
    },
    {
      icon: Users,
      title: "DAO Governance",
      description:
        "Community-driven dispute resolution and platform governance through our decentralized autonomous organization.",
    },
  ]

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  return (
    <section id="intro" ref={ref} className="py-32 bg-black relative min-h-screen flex items-center mt-[-2rem]">
      {/* No top gradient needed as we'll add it to the hero section instead */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            Redefining Freelance Work
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <motion.p
            className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            A decentralized platform connecting skilled professionals with quality projects
            while ensuring security, transparency, and fair compensation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-lg border border-zinc-800 bg-zinc-950"
            >
              <div className="absolute -top-5 -left-5 p-4 rounded-full bg-zinc-900 border border-zinc-800 z-10">
                <feature.icon className="h-7 w-7 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500" />
              </div>
              
              <h3 className="text-2xl font-bold mt-4 mb-3">{feature.title}</h3>
              <p className="text-zinc-400 text-lg">{feature.description}</p>
              
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 mt-6" />
            </div>
          ))}
        </div>
        
        {/* Additional stats section for extra content */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-zinc-800 pt-16">
          <div className="text-center">
            <h4 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">10K+</h4>
            <p className="text-zinc-400 mt-2">Active Freelancers</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">$2M+</h4>
            <p className="text-zinc-400 mt-2">Payments Processed</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">98%</h4>
            <p className="text-zinc-400 mt-2">Client Satisfaction</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-purple-900/10 to-blue-900/10 blur-3xl rounded-full pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" 
           style={{
             maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
           }}
      />
    </section>
  )
}