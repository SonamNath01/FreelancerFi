"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram, ChevronRight } from "lucide-react"

// Smooth scroll hook
function useScrollTo() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return scrollTo;
}

export function Footer() {
  const scrollTo = useScrollTo();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const socialIcons = [
    { name: "GitHub", icon: Github },
    { name: "Twitter", icon: Twitter },
    { name: "LinkedIn", icon: Linkedin },
    { name: "Instagram", icon: Instagram },
  ];

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-black py-12 relative">
      {/* Subtle animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-blue-900/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500">
                <motion.div 
                  className="absolute inset-0.5 rounded-full bg-black"
                  whileHover={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-80 group-hover:from-blue-500 group-hover:to-purple-500"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xl font-bold">FreelancerFi</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400">
              The future of freelancing is decentralized, secure, and community-governed.
            </p>
          </motion.div>

          {[
            {
              title: "Platform",
              links: [
                { href: "/jobs", label: "Browse Jobs" },
                { href: "/freelancers", label: "Find Freelancers" },
                { href: "/escrow", label: "Escrow System" },
                { href: "/dao", label: "DAO Governance" },
              ],
            },
            {
              title: "Company",
              links: [
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact" },
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">{section.title}</h3>
              <motion.ul 
                className="mt-4 space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {section.links.map((link, index) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                    }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-sm text-zinc-400 hover:text-white transition-colors group flex items-center"
                    >
                      <motion.span
                        className="w-0 h-px bg-purple-500 mr-0 group-hover:w-2 group-hover:mr-2"
                        transition={{ duration: 0.3 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-xs text-zinc-400">&copy; {new Date().getFullYear()} FreelancerFi. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.name}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors relative group">
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                  
                  {/* Pulse animation on hover */}
                  <motion.div
                    className="absolute -inset-2 rounded-full bg-purple-500/10 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Back to top button */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button
            onClick={() => scrollTo('hero')}
            className="text-sm text-zinc-500 hover:text-white flex items-center gap-1 group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-4 w-4 transform -rotate-90" />
            </motion.div>
            Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}