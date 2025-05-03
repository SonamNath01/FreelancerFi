'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ShieldCheck, SearchCheck, Landmark } from 'lucide-react';

const features = [
  {
    title: 'Secure Escrow System',
    icon: ShieldCheck,
    description:
      'Our blockchain-based escrow system ensures your payments are secure and only released when work is completed to satisfaction.',
  },
  {
    title: 'Efficient Matching',
    icon: SearchCheck,
    description:
      'Advanced algorithms match freelancers with the perfect projects based on skills, experience, and preferences.',
  },
  {
    title: 'DAO Governance',
    icon: Landmark,
    description:
      'Community-driven dispute resolution and platform governance through our decentralized autonomous organization.',
  },
];

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-4 py-16 max-w-6xl mx-auto">
      {features.map(({ title, icon: Icon, description }, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
        >
          <Tilt
            glareEnable
            glareMaxOpacity={0.1}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
          >
            <div className="relative group p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 text-white transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              {/* Circle with icon */}
              <div className="absolute -top-6 left-6 flex items-center justify-center h-14 w-14 rounded-full bg-zinc-900 border border-zinc-700 shadow-md z-10">
                <Icon className="w-7 h-7 text-purple-400" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mt-8 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                {title}
              </h3>

              {/* Underline */}
              <div className="h-[2px] w-10 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-20 transition-all duration-500 mb-3" />

              {/* Description */}
              <p className="text-sm text-gray-300">{description}</p>
            </div>
          </Tilt>
        </motion.div>
      ))}
    </div>
  );
}
