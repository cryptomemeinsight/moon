import React from 'react';
import { Twitter, Send, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="community" className="bg-ink text-white pt-20 pb-10 relative overflow-hidden">
       {/* Torn Paper Effect Top */}
       <div className="absolute top-0 left-0 w-full h-6 bg-paper" style={{clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)"}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <span className="font-marker text-3xl tracking-wider">$MOON: The Cow</span>
            </div>
            <p className="text-gray-300 font-hand text-xl max-w-sm">
              The most joyful community in crypto. Join us on our journey to the stars!
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { icon: <Twitter size={24} />, href: "#", color: "hover:bg-blue-400" },
              { icon: <Send size={24} />, href: "#", color: "hover:bg-blue-500" }, // Telegram
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`w-14 h-14 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:scale-110 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-white/20 pt-8 text-center font-hand text-lg text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={20} className="text-red-500 fill-red-500 animate-pulse" /> for the Moon Cow Community
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Moon Cow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
