"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Users } from "lucide-react"
import Tilt from "react-parallax-tilt"

export function IntroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
 


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
  }

  return (
    <section
      id="intro"
      ref={ref}
      className="py-32 bg-black relative min-h-screen flex items-center mt-[-2rem]"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.1}
                scale={1.05}
                transitionSpeed={1500}
              >
                <div className="group relative p-8 rounded-2xl border border-white/10 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/10 transform transition duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <div className="absolute -top-6 left-6 p-3 rounded-full bg-zinc-900 border border-zinc-700 shadow-md z-10 transition-all duration-500 group-hover:scale-125">
                    <feature.icon className="h-8 w-8 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text group-hover:drop-shadow-[0_0_12px_#8b5cf6]" />
                  </div>

                  <h3 className="text-2xl font-extrabold mt-10 mb-3 text-white group-hover:drop-shadow-[0_0_10px_#8b5cf6] transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-300 text-sm">{feature.description}</p>

                  <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-blue-500 mt-6 transition-all duration-500 group-hover:w-24" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Stats Section — UPDATED */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: "$2.4M+", label: "Total Value Locked" },
            { value: "12,000+", label: "Freelancers Onboarded" },
            { value: "5,600+", label: "Projects Completed" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-10 text-center transition-all duration-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.3)] hover:border-indigo-500/30 hover:scale-[1.03]"
            >
              <h4 className="text-5xl font-extrabold text-white tracking-tight group-hover:text-indigo-400 transition duration-300">
                {stat.value}
              </h4>
              <p className="mt-3 text-zinc-300 text-sm tracking-wide">{stat.label}</p>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-indigo-400/20 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-purple-900/10 to-blue-900/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
    </section>
  )
}

