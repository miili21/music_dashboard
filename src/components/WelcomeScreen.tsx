import { ChevronDown, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface WelcomeScreenProps {
  onExplore: () => void;
}

export default function WelcomeScreen({ onExplore }: WelcomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between bg-linear-to-tr from-[#ff9a9e] via-[#fecfef] to-[#a1c4fd]">
      {/* Wave Background Pattern (Vector lines to replicate the image waves) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 450 C 300 250, 700 650, 1100 350 C 1300 200, 1500 300, 1600 250 L 1600 800 L -100 800 Z"
            fill="url(#wave-grad)"
          />
          <path
            d="M-50 400 C 400 150, 650 600, 1050 300 C 1250 150, 1450 250, 1550 200"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M-20 420 C 380 180, 680 580, 1080 320 C 1280 170, 1480 270, 1580 220"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="10,15"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-24 select-none relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-0"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-extrabold tracking-tight text-white leading-none text-glow font-sans">
            power
          </h1>
          <h1 className="text-[12vw] md:text-[8vw] font-extrabold tracking-tight text-white leading-none text-glow font-sans -mt-4 md:-mt-8">
            cloud
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-white text-lg md:text-xl font-medium tracking-wide max-w-md mt-6 font-sans opacity-80"
        >
          Your lovely music artist dashboard. Have fun!
        </motion.p>
      </div>

      {/* Vinyl Trio at Bottom */}
      <div className="relative w-full h-[35vh] md:h-[45vh] flex justify-center items-end select-none">
        {/* Left Vinyl (smaller, background) */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -45 }}
          animate={{ opacity: 1, x: 0, rotate: isPlaying ? 315 : -15 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            x: { duration: 1, delay: 0.3, type: "spring", stiffness: 50 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 15, ease: "linear" } 
              : { duration: 1 }
          }}
          whileHover={{ y: -20, scale: 1.05, transition: { duration: 0.3 } }}
          className="absolute left-[5%] sm:left-[20%] md:left-[25%] bottom-[-5%] w-[45vw] h-[45vw] max-w-[280px] max-h-[280px] rounded-full shadow-2xl z-10 cursor-pointer"
          style={{
            background: `conic-gradient(from 0deg, #0d0d0d 0deg, #262626 40deg, #0d0d0d 80deg, #333333 120deg, #0d0d0d 160deg, #262626 200deg, #0d0d0d 240deg, #333333 280deg, #0d0d0d 320deg, #262626 360deg)`,
            border: "4px solid #111"
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-4 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-8 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-16 rounded-full border border-neutral-800 opacity-60"></div>
          {/* Record Label */}
          <div className="absolute inset-[33%] rounded-full bg-[#fce3e4] border-2 border-[#111] flex flex-col items-center justify-center p-1 text-center shadow-inner">
            <span className="text-[8px] font-mono font-bold text-neutral-800 uppercase tracking-widest scale-75">Side A</span>
            <span className="text-[9px] font-bold text-neutral-950 font-sans leading-none scale-90 mt-1">POWER</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#ebd4fc] border border-neutral-800 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
          </div>
        </motion.div>

        {/* Right Vinyl (smaller, background) */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 45 }}
          animate={{ opacity: 1, x: 0, rotate: isPlaying ? 375 : 15 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            x: { duration: 1, delay: 0.3, type: "spring", stiffness: 50 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 18, ease: "linear" } 
              : { duration: 1 }
          }}
          whileHover={{ y: -20, scale: 1.05, transition: { duration: 0.3 } }}
          className="absolute right-[5%] sm:right-[20%] md:right-[25%] bottom-[-5%] w-[45vw] h-[45vw] max-w-[280px] max-h-[280px] rounded-full shadow-2xl z-10 cursor-pointer"
          style={{
            background: `conic-gradient(from 0deg, #0d0d0d 0deg, #262626 45deg, #0d0d0d 90deg, #333333 135deg, #0d0d0d 180deg, #262626 225deg, #0d0d0d 270deg, #333333 315deg, #0d0d0d 360deg)`,
            border: "4px solid #111"
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-4 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-8 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-16 rounded-full border border-neutral-800 opacity-60"></div>
          {/* Record Label */}
          <div className="absolute inset-[33%] rounded-full bg-[#ebd4fc] border-2 border-[#111] flex flex-col items-center justify-center p-1 text-center shadow-inner">
            <span className="text-[8px] font-mono font-bold text-neutral-800 uppercase tracking-widest scale-75">Side B</span>
            <span className="text-[9px] font-bold text-neutral-950 font-sans leading-none scale-90 mt-1">CLOUD</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#fce3e4] border border-neutral-800 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
          </div>
        </motion.div>

        {/* Center Vinyl (Larger, Foreground, partially covering the two on the sides) */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0, rotate: isPlaying ? 360 : 0 }}
          transition={{
            opacity: { duration: 1 },
            y: { duration: 1, type: "spring", stiffness: 60 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 12, ease: "linear" } 
              : { duration: 1 }
          }}
          whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
          className="absolute bottom-[-10%] w-[55vw] h-[55vw] max-w-[340px] max-h-[340px] rounded-full shadow-2xl z-20 cursor-pointer border-[5px] border-[#0c0c0c] flex items-center justify-center"
          style={{
            background: `conic-gradient(from 0deg, #080808 0deg, #222222 30deg, #080808 60deg, #2e2e2e 90deg, #080808 120deg, #222222 150deg, #080808 180deg, #2e2e2e 210deg, #080808 240deg, #222222 270deg, #080808 300deg, #2e2e2e 330deg, #080808 360deg)`
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-4 rounded-full border border-neutral-800 opacity-70"></div>
          <div className="absolute inset-8 rounded-full border border-neutral-800 opacity-70"></div>
          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-70"></div>
          <div className="absolute inset-16 rounded-full border border-neutral-800 opacity-70"></div>
          <div className="absolute inset-20 rounded-full border border-neutral-800 opacity-70"></div>
          <div className="absolute inset-24 rounded-full border border-neutral-800 opacity-70"></div>
          {/* Record Label */}
          <div className="absolute inset-[33%] rounded-full bg-white border-2 border-[#111] flex flex-col items-center justify-center p-2 text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest scale-75">CLOUD</span>
            <span className="text-[12px] font-black text-neutral-900 font-sans tracking-tight mt-1 leading-none">MUSIC</span>
            <span className="text-[8px] text-neutral-500 font-semibold tracking-wide">DASHBOARD</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#ff9a9e] border border-neutral-800 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900"></div>
          </div>
        </motion.div>

        {/* Dynamic Controls / Play badge */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer text-white text-xs hover:bg-black/60 transition"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
          <span className="font-medium tracking-wider">{isPlaying ? "PAUSE PREVIEW" : "PLAY VINYL"}</span>
        </div>
      </div>

      {/* Footer / Scroll hint */}
      <div className="pb-8 flex flex-col items-center justify-center z-10">
        <motion.button
          onClick={onExplore}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          whileHover={{ y: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-sm font-semibold uppercase tracking-widest group-hover:opacity-100 opacity-80 transition duration-300">
            Scroll to Dashboard
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}