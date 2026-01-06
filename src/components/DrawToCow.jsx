import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Download, Wand2, RefreshCcw } from 'lucide-react';

const DrawToCow = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext('2d');
      context.scale(dpr, dpr);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 4;
      context.strokeStyle = '#2d2d2d'; // Drawing in ink color
      setCtx(context);
    }
  }, []);

  const startDrawing = (e) => {
    if (!ctx) return;
    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    const canvas = canvasRef.current;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setScore(null);
  };

  const analyzeDrawing = () => {
    setIsAnalyzing(true);
    
    // Analyze the drawing content
    setTimeout(() => {
      if (!ctx || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let drawnPixels = 0;
      
      // Count non-transparent pixels (ink)
      for (let i = 0; i < data.length; i += 4) {
        // Check alpha channel (opacity)
        if (data[i + 3] > 0) {
          drawnPixels++;
        }
      }
      
      const totalPixels = canvas.width * canvas.height;
      const coverageRatio = drawnPixels / totalPixels;
      
      let calculatedScore = 0;
      
      // Algorithm based on "ink coverage"
      if (coverageRatio === 0) {
        // Empty canvas
        calculatedScore = 0;
      } else if (coverageRatio < 0.005) {
        // Very little drawing (dots or lines)
        calculatedScore = Math.floor(Math.random() * 15) + 5; // 5-20%
      } else if (coverageRatio < 0.02) {
        // Simple sketch
        calculatedScore = Math.floor(Math.random() * 30) + 20; // 20-50%
      } else if (coverageRatio < 0.05) {
        // Decent drawing
        calculatedScore = Math.floor(Math.random() * 25) + 50; // 50-75%
      } else if (coverageRatio < 0.15) {
        // Detailed drawing
        calculatedScore = Math.floor(Math.random() * 20) + 75; // 75-95%
      } else {
        // Very heavy drawing (maybe too much ink?)
        calculatedScore = Math.floor(Math.random() * 10) + 85; // 85-95%
      }
      
      // Add a slight "AI Uncertainty" factor
      // This ensures the same drawing doesn't get the EXACT same score if clicked twice
      const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
      calculatedScore = Math.min(100, Math.max(0, calculatedScore + variation));
      
      setScore(calculatedScore);
      setIsAnalyzing(false);
    }, 1500);
  };

  const downloadDrawing = () => {
    if (!canvasRef.current || score === null) return;
    
    const sourceCanvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    const tCtx = tempCanvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    // Add more padding for a "polaroid" or "framed" look
    const padding = 40 * dpr;
    const headerHeight = 80 * dpr;
    const footerHeight = 100 * dpr;
    
    tempCanvas.width = sourceCanvas.width + (padding * 2);
    tempCanvas.height = sourceCanvas.height + headerHeight + footerHeight + padding; 
    
    // 1. Background (Paper Color)
    tCtx.fillStyle = '#fdfbf7'; 
    tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // 2. Add "Noise" or Texture (Optional simple noise simulation)
    // Skipping complex noise for performance, but adding a subtle grain could be nice.
    
    // 3. Sketchy Border
    tCtx.strokeStyle = '#2d2d2d';
    tCtx.lineWidth = 4 * dpr;
    tCtx.lineCap = 'round';
    tCtx.lineJoin = 'round';
    
    // Draw a "messy" border rect
    const borderPadding = 10 * dpr;
    tCtx.beginPath();
    tCtx.moveTo(borderPadding, borderPadding);
    tCtx.lineTo(tempCanvas.width - borderPadding, borderPadding + (2 * dpr));
    tCtx.lineTo(tempCanvas.width - (borderPadding + 2*dpr), tempCanvas.height - borderPadding);
    tCtx.lineTo(borderPadding + (3 * dpr), tempCanvas.height - (borderPadding + 2*dpr));
    tCtx.closePath();
    tCtx.stroke();
    
    // Second pass for sketch effect
    tCtx.beginPath();
    tCtx.moveTo(borderPadding + (2*dpr), borderPadding - (2*dpr));
    tCtx.lineTo(tempCanvas.width - borderPadding + (3*dpr), borderPadding + (1*dpr));
    tCtx.lineTo(tempCanvas.width - borderPadding, tempCanvas.height - borderPadding + (3*dpr));
    tCtx.lineTo(borderPadding - (2*dpr), tempCanvas.height - borderPadding);
    tCtx.closePath();
    tCtx.stroke();

    // 4. Header: "MY MOON COW"
    tCtx.fillStyle = '#2d2d2d';
    tCtx.font = `bold ${40 * dpr}px "Permanent Marker", cursive, Arial`;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText("MY MOON COW MASTERPIECE", tempCanvas.width / 2, padding + (headerHeight / 2));
    
    // 5. Draw the Drawing (Centered)
    // We draw it inside a "box" area
    const drawX = padding;
    const drawY = padding + headerHeight;
    
    // Draw a white background behind the drawing area to make it pop
    tCtx.fillStyle = '#ffffff';
    tCtx.fillRect(drawX, drawY, sourceCanvas.width, sourceCanvas.height);
    tCtx.strokeRect(drawX, drawY, sourceCanvas.width, sourceCanvas.height);
    
    tCtx.drawImage(sourceCanvas, drawX, drawY);
    
    // 6. Footer Content
    const footerCenterY = drawY + sourceCanvas.height + (footerHeight / 2);
    
    // Score Badge (Circle)
    const badgeX = tempCanvas.width - padding - (60 * dpr);
    const badgeY = footerCenterY;
    const badgeRadius = 50 * dpr;
    
    // Yellow scribble circle background
    tCtx.fillStyle = '#ffeb3b'; // scribble-yellow
    tCtx.beginPath();
    tCtx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
    tCtx.fill();
    tCtx.strokeStyle = '#2d2d2d';
    tCtx.stroke();
    
    // Score Text
    tCtx.fillStyle = '#2d2d2d';
    tCtx.font = `bold ${24 * dpr}px "Permanent Marker", cursive, Arial`;
    tCtx.fillText("MATCH", badgeX, badgeY - (15 * dpr));
    tCtx.font = `bold ${40 * dpr}px "Permanent Marker", cursive, Arial`;
    tCtx.fillText(`${score}%`, badgeX, badgeY + (20 * dpr));
    
    // Branding Text
    tCtx.textAlign = 'left';
    tCtx.fillStyle = '#2d2d2d';
    tCtx.font = `bold ${24 * dpr}px "Patrick Hand", cursive, Arial`;
    tCtx.fillText("Drawn on Moon Cow", padding + (20 * dpr), footerCenterY - (10 * dpr));
    tCtx.fillStyle = '#4d79ff'; // scribble-blue
    tCtx.fillText("moonthecow.com", padding + (20 * dpr), footerCenterY + (20 * dpr));

    // Download
    const link = document.createElement('a');
    link.download = `moon-cow-art-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-marker text-ink mb-6 transform -rotate-1">
            Draw a <span className="text-scribble-blue">Moon Cow</span>
          </h2>
          <p className="text-xl text-ink/80 font-hand max-w-2xl mx-auto">
            Test your artistic skills! Draw a cow and our "advanced" AI will rate your masterpiece.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative border-sketch bg-white overflow-hidden cursor-crosshair touch-none">
            <canvas
              ref={canvasRef}
              className="w-full h-80 md:h-96 block"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCanvas}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-ink shadow-sketch hover:shadow-sketch-hover text-ink font-marker text-lg transition-all"
            >
              <Trash2 size={20} />
              Clear
            </motion.button>

            {!score ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeDrawing}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-scribble-blue border-2 border-ink shadow-sketch hover:shadow-sketch-hover text-white font-marker text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCcw className="animate-spin" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    Analyze Drawing
                  </>
                )}
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-wrap gap-4 items-center justify-center"
              >
                <div className="px-6 py-3 bg-scribble-green text-white border-2 border-ink shadow-sketch font-marker text-xl transform -rotate-2">
                  Match: {score}%
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadDrawing}
                  className="flex items-center gap-2 px-6 py-3 bg-scribble-pink border-2 border-ink shadow-sketch hover:shadow-sketch-hover text-white font-marker text-lg transition-all"
                >
                  <Download size={20} />
                  Download Result
                </motion.button>
                <button
                  onClick={clearCanvas}
                  className="px-4 py-3 text-ink/60 font-hand hover:text-ink underline text-lg"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrawToCow;
