"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, ChevronRight, Shield, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [buttonHovered, setButtonHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] 
      }
    })
  };
  
  // Split heading text for letter animation
  const headingText = "Ready to revolutionize your freelance experience?";
  const headingWords = headingText.split(" ");
  
  const features = [
    {
      icon: Shield,
      title: "Secure Smart Contracts",
      description: "All agreements are backed by transparent, immutable smart contracts that automatically release payments when conditions are met."
    },
    {
      icon: Zap,
      title: "Zero Platform Fees",
      description: "Our decentralized model eliminates middlemen, ensuring freelancers keep more of what they earn while clients pay only for value received."
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "As a platform member, you get voting rights on protocol upgrades, fee structures, and dispute resolution mechanisms."
    }
  ];

  return (
    <section ref={ref} id="cta" className="container mx-auto py-32 px-4 relative min-h-[800px]">
      {/* Animated background rays */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ opacity }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-full w-1 bg-gradient-to-t from-purple-500/0 via-purple-500/5 to-blue-500/0"
              style={{
                transformOrigin: 'center center',
                rotate: `${i * 30}deg`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center justify-center space-y-10 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Animated heading with word-by-word animation */}
        <div className="overflow-hidden">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl flex flex-wrap justify-center gap-x-3">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={headingVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>
        
        <motion.p 
          className="max-w-[700px] text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 50 }}
        >
          Join our decentralized platform and experience the future of freelancing with secure payments, transparent
          processes, and community governance.
        </motion.p>
        
        {/* Key features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center p-6 rounded-lg bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
            >
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 mb-4">
                <feature.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Token benefits */}
        <motion.div 
          className="w-full max-w-4xl rounded-lg border border-zinc-800 p-6 bg-gradient-to-r from-purple-500/5 to-blue-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <h3 className="text-xl font-bold mb-4">$DFREE Token Benefits</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <li className="flex items-center gap-2 text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Stake to access premium job postings</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Earn rewards for platform contributions</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Participate in protocol governance</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Reduced fees for token holders</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.3, type: "spring", stiffness: 50 }}
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden"
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            style={{
              background: "linear-gradient(90deg, rgba(124, 58, 237, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              borderImage: "linear-gradient(90deg, rgba(124, 58, 237, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%)",
              borderImageSlice: 1,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Link href="/dashboard" className="flex items-center">
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                initial={{ opacity: 0, scale: 1 }}
                animate={buttonHovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-zinc-800 text-white hover:text-white hover:bg-zinc-900"
          >
            <Link href="/jobs" className="flex items-center">
              Browse Jobs
              <motion.span 
                animate={buttonHovered ? 
                  { x: [0, 5, 0] } : 
                  { x: 0 }
                }
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight className="ml-2 h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}