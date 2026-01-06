import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Palette, ChevronLeft, ChevronRight, RefreshCw, X } from 'lucide-react';

// Import all meme images
import meme1 from '../assets/meme1_moon.png';
import meme2 from '../assets/meme2_moon.png';
import meme3 from '../assets/meme3_moon.png';
import meme4 from '../assets/meme4_moon.png';
import meme5 from '../assets/meme5_moon.png';
import meme6 from '../assets/meme6_moon.png';
import meme7 from '../assets/meme7_moon.png';
import meme8 from '../assets/meme8_moon.png';
import meme9 from '../assets/meme9_moon.png';
import meme10 from '../assets/meme10_moon.png';
import meme11 from '../assets/meme11_moon.png';
import meme12 from '../assets/meme12_moon.png';
import meme13 from '../assets/meme13_moon.png';
import meme14 from '../assets/meme14_moon.png';
import meme15 from '../assets/meme15_moon.png';

const MoonPFPMaker = () => {
  const memes = [
    meme1, meme2, meme3, meme4, meme5, 
    meme6, meme7, meme8, meme9, meme10, 
    meme11, meme12, meme13, meme14, meme15
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [bgType, setBgType] = useState('solid'); // 'solid' or 'gradient'
  const [solidColor, setSolidColor] = useState('#ffffff');
  const [gradientStart, setGradientStart] = useState('#4d79ff');
  const [gradientEnd, setGradientEnd] = useState('#ffeb3b');
  const canvasRef = useRef(null);

  const colors = [
    '#ffffff', '#fdfbf7', '#ffeb3b', '#4d79ff', '#ff4d94', 
    '#4caf50', '#9c27b0', '#ff9800', '#795548', '#607d8b',
    '#000000', '#2d2d2d'
  ];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? memes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === memes.length - 1 ? 0 : prev + 1));
  };

  const downloadPFP = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 1080; // High res for PFP
    canvas.width = size;
    canvas.height = size;

    // Background
    if (!isEditing) {
        // Default plain white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
    } else {
        if (bgType === 'solid') {
            ctx.fillStyle = solidColor;
            ctx.fillRect(0, 0, size, size);
        } else {
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, gradientStart);
            gradient.addColorStop(1, gradientEnd);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
        }
    }

    // Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = memes[selectedIndex];
    
    img.onload = () => {
        // Calculate aspect ratio fit
        const scale = Math.min(size / img.width, size / img.height) * 0.9; // 90% size
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (size - w) / 2;
        const y = (size - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);

        // Watermark
        ctx.font = 'bold 40px "Patrick Hand", sans-serif'; // Fallback font
        ctx.fillStyle = '#2d2d2d'; // Ink color
        ctx.textAlign = 'right';
        ctx.fillText('moonthecow.com', size - 30, size - 30);

        // Trigger Download
        const link = document.createElement('a');
        link.download = `moon-cow-pfp-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
  };

  return (
    <section className="py-20 bg-paper border-t-4 border-ink relative text-ink">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-marker text-ink mb-4">
            Moon <span className="text-scribble-blue">PFP Maker</span>
          </h2>
          <p className="font-hand text-xl text-ink/80">
            Create your own Moon Cow identity!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Preview Area */}
            <div className="relative">
                <div 
                    className="aspect-square rounded-2xl border-4 border-ink shadow-sketch overflow-hidden relative transition-colors duration-300"
                    style={{ 
                        background: !isEditing 
                            ? '#ffffff' 
                            : bgType === 'solid' 
                                ? solidColor 
                                : `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
                    }}
                >
                    <motion.img
                        key={selectedIndex}
                        src={memes[selectedIndex]}
                        alt="Moon PFP"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full h-full object-contain p-8"
                    />
                    <div className="absolute bottom-4 right-4 font-hand text-ink/50 font-bold select-none">
                        moonthecow.com
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={handlePrev} className="p-2 bg-white border-2 border-ink rounded-full hover:bg-gray-100 transition-colors text-ink">
                        <ChevronLeft size={24} />
                    </button>
                    <span className="font-marker text-xl text-ink">
                        {selectedIndex + 1} / {memes.length}
                    </span>
                    <button onClick={handleNext} className="p-2 bg-white border-2 border-ink rounded-full hover:bg-gray-100 transition-colors text-ink">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Controls Area */}
            <div className="space-y-6">
                {!isEditing ? (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="font-marker text-2xl mb-2">Simple & Clean</h3>
                            <p className="font-hand text-lg mb-4">Get the classic look with a white background.</p>
                            <button 
                                onClick={downloadPFP}
                                className="w-full bg-scribble-blue text-white font-marker text-xl py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                <Download size={20} /> Download Default
                            </button>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                            <h3 className="font-marker text-2xl mb-2">Feeling Creative?</h3>
                            <p className="font-hand text-lg mb-4">Customize colors and gradients to match your vibe.</p>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-scribble-pink text-white font-marker text-xl py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                <Palette size={20} /> Customize Background
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-sketch relative">
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-ink/50 hover:text-ink"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="font-marker text-2xl mb-6">Customizer</h3>

                        <div className="flex gap-4 mb-6">
                            <button 
                                onClick={() => setBgType('solid')}
                                className={`flex-1 py-2 font-bold rounded-lg border-2 transition-all ${bgType === 'solid' ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-gray-200'}`}
                            >
                                Solid
                            </button>
                            <button 
                                onClick={() => setBgType('gradient')}
                                className={`flex-1 py-2 font-bold rounded-lg border-2 transition-all ${bgType === 'gradient' ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-gray-200'}`}
                            >
                                Gradient
                            </button>
                        </div>

                        {bgType === 'solid' ? (
                            <div className="grid grid-cols-6 gap-2 mb-6">
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSolidColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 ${solidColor === color ? 'border-black scale-110' : 'border-transparent hover:border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                                <input 
                                    type="color" 
                                    value={solidColor}
                                    onChange={(e) => setSolidColor(e.target.value)}
                                    className="w-8 h-8 rounded-full overflow-hidden border-0 p-0"
                                />
                            </div>
                        ) : (
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block font-hand text-sm mb-1">Start Color</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="color" 
                                            value={gradientStart}
                                            onChange={(e) => setGradientStart(e.target.value)}
                                            className="h-10 w-full rounded cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-hand text-sm mb-1">End Color</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="color" 
                                            value={gradientEnd}
                                            onChange={(e) => setGradientEnd(e.target.value)}
                                            className="h-10 w-full rounded cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={downloadPFP}
                            className="w-full bg-scribble-green text-white font-marker text-xl py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center justify-center gap-2"
                        >
                            <Download size={20} /> Download Custom PFP
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MoonPFPMaker;
