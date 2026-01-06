import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import DrawToCow from './components/DrawToCow';
import MoonMillionaire from './components/MoonMillionaire';
import MoonPFPMaker from './components/MoonPFPMaker';
import Footer from './components/Footer';
import mooSound from './assets/moo.wav';

function App() {
  useEffect(() => {
    // Moo Sound Logic
    const audio = new Audio(mooSound);
    audio.volume = 0.4; // Set reasonable volume

    const handleGlobalClick = (e) => {
      // Check if click is on interactive elements (button, link, input, textarea)
      if (e.target.closest('button') || 
          e.target.closest('a') || 
          e.target.closest('input') || 
          e.target.closest('textarea') ||
          e.target.closest('[role="button"]')) {
        return;
      }
      
      // Play sound
      const sound = audio.cloneNode();
      sound.volume = 0.4;
      sound.play().catch(err => {
        // Auto-play policy might block this until first user interaction
        console.log("Audio playback failed:", err);
      });
    };

    window.addEventListener('click', handleGlobalClick);

    const lenis = new Lenis({
      autoRaf: true,
    });
    
    return () => {
      lenis.destroy();
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="bg-moon-dark min-h-screen text-white selection:bg-moon-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tokenomics />
        <MoonMillionaire />
        <MoonPFPMaker />
        <DrawToCow />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
}

export default App;
