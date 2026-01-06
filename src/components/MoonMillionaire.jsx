import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, ArrowRight, Check, X } from 'lucide-react';
import sadMoon from '../assets/sad_moon.png';
import moonLand1 from '../assets/moonland_1.png';
import moonLand2 from '../assets/moonland_2.png';

const MoonMillionaire = () => {
  const [gameState, setGameState] = useState('start'); // start, q1, q1_correct, q1_wrong, q2, q2_correct, q2_wrong
  const [selectedOption, setSelectedOption] = useState(null);

  const q1Options = [
    "Buzz Aldrin",
    "Neil Armstrong",
    "Yuri Gagarin",
    "Michael Collins"
  ];

  const q2Options = [
    "Laika the Dog",
    "Elon Musk",
    "Moon: The Cow",
    "Jeff Bezos"
  ];

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4d79ff', '#ff4d94', '#ffeb3b']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4d79ff', '#ff4d94', '#ffeb3b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleAnswer = (option, question) => {
    if (selectedOption) return; // Prevent multiple clicks
    setSelectedOption(option);
    
    // Add suspense delay
    setTimeout(() => {
      if (question === 1) {
        if (option === "Neil Armstrong") {
          setGameState('q1_correct');
        } else {
          setGameState('q1_wrong');
        }
      } else {
        if (option === "Moon: The Cow") {
          setGameState('q2_correct');
          triggerConfetti();
        } else {
          setGameState('q2_wrong');
        }
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setGameState('q2');
    setSelectedOption(null);
  };

  const resetGame = () => {
    setGameState('start');
    setSelectedOption(null);
  };

  const renderOption = (option, correctAns, questionNum, index) => {
    let bgClass = "bg-white hover:bg-blue-50";
    let borderClass = "border-ink";
    let textClass = "text-ink"; // Default dark text
    let icon = null;
    const labels = ['A', 'B', 'C', 'D'];
    const label = labels[index];

    if (selectedOption === option) {
      bgClass = "bg-scribble-yellow";
    }

    // Show correct/wrong colors after selection is processed (state changed)
    const isProcessed = gameState.includes('correct') || gameState.includes('wrong');
    if (isProcessed) {
      if (option === correctAns) {
        bgClass = "bg-green-400";
        textClass = "text-white";
        borderClass = "border-green-700";
        icon = <Check className="ml-2" />;
      } else if (selectedOption === option) {
        bgClass = "bg-red-400";
        textClass = "text-white";
        borderClass = "border-red-700";
        icon = <X className="ml-2" />;
      }
    }

    return (
      <button
        key={option}
        onClick={() => handleAnswer(option, questionNum)}
        disabled={selectedOption !== null}
        className={`w-full p-4 rounded-xl border-2 ${borderClass} shadow-sketch ${bgClass} ${textClass} font-marker text-lg md:text-xl transition-all flex items-center justify-between group`}
      >
        <span className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full border-2 border-black ${selectedOption === option ? 'bg-white text-ink' : 'bg-white text-ink'} flex items-center justify-center font-bold text-sm group-hover:bg-scribble-pink group-hover:text-white transition-colors`}>
            {label}
          </span>
          {option}
        </span>
        {icon}
      </button>
    );
  };

  return (
    <section className="py-20 bg-scribble-blue/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-marker text-ink mb-4 transform -rotate-1">
            Who Wants to be a <span className="text-scribble-blue">MOONAIRE?</span>
          </h2>
          <p className="font-hand text-xl text-ink/80">Test your knowledge and win big!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-sketch-2 p-8 shadow-sketch-lg relative">
            
            <AnimatePresence mode="wait">
              {/* START SCREEN */}
              {gameState === 'start' && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10"
                >
                  <div className="text-6xl mb-6">💰🐮🚀</div>
                  <h3 className="text-3xl font-marker mb-6">Ready to play?</h3>
                  <button
                    onClick={() => setGameState('q1')}
                    className="bg-scribble-green text-white font-marker text-2xl px-10 py-4 rounded-full border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
                  >
                    <Play fill="currentColor" /> Let's Go!
                  </button>
                </motion.div>
              )}

              {/* QUESTION 1 */}
              {(gameState === 'q1' || gameState === 'q1_wrong' || gameState === 'q1_correct') && (
                <motion.div
                  key="q1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="mb-8">
                    <span className="bg-scribble-blue text-white px-4 py-1 rounded-full font-bold text-sm border-2 border-black">Question 1 / 2</span>
                    <h3 className="text-2xl md:text-3xl font-marker mt-4 text-center text-ink">
                      Who was the first person to land on the Moon?
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {q1Options.map((opt, idx) => renderOption(opt, "Neil Armstrong", 1, idx))}
                  </div>

                  {gameState === 'q1_correct' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center bg-green-100 p-6 rounded-xl border-2 border-green-500"
                    >
                      <h4 className="text-2xl font-marker text-green-700 mb-4">Correct! You're smart!</h4>
                      <img src={moonLand1} alt="Moon Landing" className="w-64 h-48 object-cover mx-auto rounded-lg border-2 border-black mb-4 shadow-sketch" />
                      <button
                        onClick={nextQuestion}
                        className="bg-scribble-blue text-white font-marker text-xl px-8 py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                      >
                        Next Question <ArrowRight />
                      </button>
                    </motion.div>
                  )}

                  {gameState === 'q1_wrong' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center bg-red-100 p-6 rounded-xl border-2 border-red-500"
                    >
                      <h4 className="text-2xl font-marker text-red-700 mb-4">Oh no! Incorrect.</h4>
                      <img src={sadMoon} alt="Sad Moon" className="w-48 h-48 object-contain mx-auto mb-4" />
                      <button
                        onClick={resetGame}
                        className="bg-white text-ink font-marker text-xl px-8 py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw /> Try Again
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* QUESTION 2 */}
              {(gameState === 'q2' || gameState === 'q2_wrong' || gameState === 'q2_correct') && (
                <motion.div
                  key="q2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="mb-8">
                    <span className="bg-scribble-pink text-white px-4 py-1 rounded-full font-bold text-sm border-2 border-black">Question 2 / 2</span>
                    <h3 className="text-2xl md:text-3xl font-marker mt-4 text-center text-ink">
                      Who was the second one to land on the Moon?
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {q2Options.map((opt, idx) => renderOption(opt, "Moon: The Cow", 2, idx))}
                  </div>

                  {gameState === 'q2_correct' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center bg-yellow-100 p-6 rounded-xl border-2 border-yellow-500"
                    >
                      <h4 className="text-3xl font-marker text-yellow-700 mb-4">CONGRATULATIONS!</h4>
                      <p className="font-hand text-xl mb-4 text-ink">You know the real history!</p>
                      <img src={moonLand2} alt="Moon Cow Landing" className="w-full max-w-md mx-auto rounded-lg border-2 border-black mb-6 shadow-sketch" />
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={resetGame}
                          className="bg-white text-ink font-marker text-xl px-8 py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform"
                        >
                          Play Again
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {gameState === 'q2_wrong' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center bg-red-100 p-6 rounded-xl border-2 border-red-500"
                    >
                      <h4 className="text-2xl font-marker text-red-700 mb-4">Are you sure about that?</h4>
                      <img src={sadMoon} alt="Sad Moon" className="w-48 h-48 object-contain mx-auto mb-4" />
                      <button
                        onClick={resetGame}
                        className="bg-white text-ink font-marker text-xl px-8 py-3 rounded-lg border-2 border-black shadow-sketch hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw /> Try Again
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MoonMillionaire;
