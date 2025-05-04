"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Aurora from "./ui/Aurora/Aurora";
import ShinyText from "./ui/ShinyText/ShinyText";
import Particles from "./ui/Particles/Particles";

function useScrollTo() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return scrollTo;
}

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollTo = useScrollTo();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient) return null; // Prevent SSR issues

  const xOffset = (mousePosition.x - window.innerWidth / 2) / 50;
  const yOffset = (mousePosition.y - window.innerHeight / 2) / 50;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden bg-black h-screen w-full flex items-center"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#7F00FF", "#3A1CFF", "#00FFFF"]}
          blend={0.6}
          amplitude={1.0}
          speed={0.4}
        />
      </div>

      <motion.div
        className="absolute inset-0 z-10 opacity-20 bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30"
        style={{
          transform: `translate(${xOffset}px, ${yOffset}px)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          maskImage:
            "radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 z-30 pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={150}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-40 pointer-events-none"></div>

      <div className="container relative z-40 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-5xl font-bold tracking-tight md:text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              {/* The Future of Freelancing is Decentralized */}
              <ShinyText
                text="The Future of Freelancing is Decentralized"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-zinc-400"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 50,
            }}
          >
            Secure. Transparent. Community-governed.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              type: "spring",
              stiffness: 50,
            }}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
            >
              <Link href="/jobs">
                <span className="relative z-10">Start Freelancing</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
