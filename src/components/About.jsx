import React from 'react';
import { motion } from 'framer-motion';
import { Star, Moon, Rocket } from 'lucide-react';
import astronautImage from '../assets/moon_astronaut.png';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-marker mb-4 text-ink transform -rotate-2"
          >
            The Legend of <span className="text-scribble-pink underline decoration-wavy decoration-4">Moon Cow</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
             <div className="w-full transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={astronautImage}
                    alt="Moon Astronaut" 
                    className="w-full h-auto object-contain opacity-90"
                  />
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 border-sketch shadow-sketch rotate-1"
          >
            <div className="space-y-6 text-xl font-hand text-ink leading-relaxed">
              <p>
                Once upon a time, there was a cow named <strong className="text-scribble-blue text-2xl">Bessie</strong>. Unlike other cows who were content chewing grass, Bessie had a dream. She looked up at the night sky and saw a giant wheel of cheese... or so she thought.
              </p>
              <p>
                One fateful night, fueled by determination (and maybe some magical clover), she took a running start and jumped! She jumped so high, she cleared the barn, the clouds, and even the atmosphere.
              </p>
              <p>
                She didn't just jump over the moon; she landed on it! Now, she's the Queen of the Moon, inviting all her friends to join her in the most joyful, gravity-defying community in the crypto universe.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: <Star className="text-scribble-yellow" strokeWidth={3} />, label: "Dream Big" },
                { icon: <Rocket className="text-scribble-pink" strokeWidth={3} />, label: "Go Fast" },
                { icon: <Moon className="text-scribble-blue" strokeWidth={3} />, label: "Stay Moon" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 p-2 hover:scale-110 transition-transform cursor-pointer">
                  {item.icon}
                  <span className="font-marker text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
