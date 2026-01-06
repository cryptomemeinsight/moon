import React from 'react';
import { motion } from 'framer-motion';

const Roadmap = () => {
  const phases = [
    {
      title: "Phase 1: Liftoff",
      items: ["Website Launch", "Community Building", "Social Media Setup", "Fair Launch"],
      icon: "🚀",
      color: "bg-blue-100"
    },
    {
      title: "Phase 2: Orbit",
      items: ["CoinGecko Listing", "CMC Listing", "Marketing Campaign", "5,000 Holders"],
      icon: "🛰️",
      color: "bg-yellow-100"
    },
    {
      title: "Phase 3: The Moon",
      items: ["CEX Listings", "Moon Cow Merch", "NFT Collection", "To The Moon!"],
      icon: "🌕",
      color: "bg-pink-100"
    }
  ];

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-marker mb-4 text-ink"
          >
            Map to <span className="text-scribble-pink">Glory</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
           {/* Dotted Line for Desktop */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 border-t-4 border-dashed border-black/20 -z-10 transform -translate-y-1/2"></div>

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`h-full ${phase.color} border-sketch shadow-sketch p-8 transform hover:-translate-y-2 transition-transform duration-300 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center text-4xl shadow-sketch z-10">
                   {phase.icon}
                </div>
                
                <h3 className="text-3xl font-marker mb-6 text-ink mt-8 text-center border-b-2 border-black/10 pb-2">{phase.title}</h3>
                <ul className="space-y-4">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start text-ink font-hand text-lg">
                      <span className="w-5 h-5 mr-3 flex items-center justify-center text-scribble-blue font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
