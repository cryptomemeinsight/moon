import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Coins, Zap, Flame } from 'lucide-react';

const Tokenomics = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "DZ1fC3aiobpYEe621jaCHX4Dr83n4Pv44fiikZY2pump";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: <PieChart size={32} strokeWidth={2.5} />, value: "1 Billion", label: "Total Supply", color: "bg-blue-100 text-scribble-blue" },
    { icon: <Coins size={32} strokeWidth={2.5} />, value: "894M", label: "Circulating Supply", color: "bg-green-100 text-scribble-green" },
    { icon: <Zap size={32} strokeWidth={2.5} />, value: "0%", label: "Buy/Sell Tax", color: "bg-yellow-100 text-yellow-600" },
    { icon: <Flame size={32} strokeWidth={2.5} />, value: "Burnt", label: "10.6%", color: "bg-pink-100 text-scribble-pink" },
  ];

  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-marker mb-4 text-ink"
          >
            Moon <span className="text-scribble-green decoration-double underline">Tokenomics</span>
          </motion.h2>
          <p className="text-xl font-hand text-ink/70 max-w-2xl mx-auto">
            No funny business, just pure moon potential. Look at these numbers!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`p-8 border-sketch shadow-sketch text-center bg-white transform ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} transition-all`}
            >
              <div className={`inline-flex p-4 rounded-full border-2 border-black mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-marker text-ink mb-2">{stat.value}</h3>
              <p className="text-xl font-hand text-ink/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contract Address */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-white border-sketch-2 shadow-sketch p-6 flex flex-col md:flex-row items-center justify-between gap-4 transform rotate-1">
            <span className="text-ink font-hand text-xl md:text-2xl break-all hidden md:block">
              {contractAddress}
            </span>
            <span className="text-ink font-hand text-xl md:text-2xl break-all md:hidden">
              {contractAddress.slice(0, 6)}....{contractAddress.slice(-6)}
            </span>
            <button 
              onClick={handleCopy}
              className={`px-6 py-2 ${copied ? 'bg-scribble-green' : 'bg-scribble-blue'} text-white font-marker border-2 border-black shadow-sketch hover:shadow-sketch-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all min-w-[140px]`}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
