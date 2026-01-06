import React from 'react';
import { motion } from 'framer-motion';
import coinImage from '../assets/coinimage_moon.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 pb-20">
      {/* Scribble Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Yellow Circle Scribble */}
        <svg className="absolute top-20 left-10 w-48 h-48 text-scribble-yellow opacity-50 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <path d="M43.6,1.4c-8.9,1.6-17.6,6.2-24.3,13.1C12.6,21.4,7.4,29.9,4.4,39.2c-3,9.3-4.1,19.2-3.1,28.9 c1,9.7,4.4,19.1,9.9,27.2c5.5,8.1,12.9,14.7,21.7,18.8c8.8,4.1,18.7,5.6,28.4,4.5c9.7-1.1,18.9-5.1,26.5-11.4 c7.6-6.3,13.3-14.7,16.2-24.2c2.9-9.5,2.9-19.8,0-29.4c-2.9-9.6-8.6-18.1-16.3-24.3C80.1,23.1,71,19,61.4,17.9" />
        </svg>
        
        {/* Pink Cross Scribble */}
        <svg className="absolute bottom-20 right-10 w-40 h-40 text-scribble-pink opacity-40" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="5" fill="none">
           <path d="M20,20 L80,80 M80,20 L20,80" strokeLinecap="round" />
        </svg>

        {/* Blue Squiggle */}
        <svg className="absolute top-1/2 right-20 w-32 h-32 text-scribble-blue opacity-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
           <path d="M10,50 Q25,25 40,50 T70,50 T100,50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block px-4 py-2 mb-6 bg-white border-sketch-2 shadow-sketch transform -rotate-3"
          >
            <span className="font-marker text-scribble-blue text-xl">🚀 The Next Moonshot!</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-marker mb-6 leading-tight text-ink drop-shadow-sm">
            To the <span className="text-scribble-blue relative inline-block">
              Moooon
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-scribble-yellow z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span> with <br />
            <span className="text-scribble-pink">Moon Cow</span>
          </h1>
          
          <p className="text-2xl font-hand text-ink/80 mb-8 max-w-lg leading-relaxed bg-white/50 p-4 rounded-blob backdrop-blur-sm border-2 border-ink/10">
            The most joyful memecoin in the galaxy. Join the herd and let's graze on the moon together! 🐮✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-scribble-blue text-white font-marker text-2xl border-2 border-black shadow-sketch rounded-lg hover:shadow-sketch-hover transition-all"
            >
              Buy $MOON
            </motion.button>
            <motion.a
              href="https://x.com/i/communities/2008211673136386315"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-ink font-marker text-2xl border-2 border-black shadow-sketch rounded-lg hover:shadow-sketch-hover transition-all inline-block cursor-pointer"
            >
              Join Community
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Hand-drawn Frame for Image */}
          <div className="relative bg-white p-4 border-sketch shadow-sketch-lg transform rotate-2 hover:rotate-0 transition-transform duration-500 w-4/5 mx-auto md:w-full">
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200 opacity-80 rotate-1 shadow-sm border border-black/10"></div>
            
            <div className="w-full aspect-square bg-gray-100 border-2 border-black overflow-hidden relative">
               <img 
                  src={coinImage}
                  alt="Moon Cow" 
                  className="w-full h-full object-cover filter contrast-125 hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="mt-4 text-center">
               <p className="font-hand text-3xl font-bold text-ink">"Moo-ving up!"</p>
            </div>

            {/* Sticker Elements */}
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-scribble-yellow rounded-full flex items-center justify-center border-2 border-black shadow-sketch text-4xl"
            >
              🧀
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
