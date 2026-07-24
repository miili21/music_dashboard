import { ChevronDown, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface WelcomeScreenProps {
  onExplore: () => void;
}

export default function WelcomeScreen({ onExplore }: WelcomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/bg1.jpeg')" }}>
      {/* Wave Background Pattern */}
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

  <stop offset="0%" stopColor="#0B0B0E" />

  <stop offset="50%" stopColor="#FF6B00" />

  <stop offset="100%" stopColor="#FF007A" />
</linearGradient>
          </defs>
        </svg>
      </div>

     {/* Hero Content - Centered Horizontally & Vertically */}
     <div className="flex-1 w-full flex flex-col items-center justify-center text-center px-6 md:px-12 select-none relative z-20 pt-10 pb-36 md:pb-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
         className="flex flex-col items-center justify-center text-center"
        >
          <h1
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tight text-white leading-none drop-shadow-md text-center"
          >
            power cloud
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            className="text-white text-base sm:text-lg md:text-xl font-body font-medium tracking-wide max-w-lg mt-4 opacity-90 text-center"
          >
            Your lovely music artist dashboard. Enjoy it!
          </motion.p>
        </motion.div>
        
        {/* Play Control Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 flex items-center gap-2.5 cursor-pointer text-white text-xs sm:text-sm hover:bg-black/60 transition shadow-lg"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            {isPlaying ? "PAUSE PREVIEW" : "PLAY VINYL"}
          </span>
        </motion.div>
      </div>

      {/* Vinyl Trio at Bottom - Scaled Up & Cropped at Bottom Overflow */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center items-end select-none pointer-events-none z-10 translate-y-[45%] sm:translate-y-[40%] md:translate-y-[38%]">
        <div className="relative w-full max-w-6xl flex justify-center items-end pointer-events-auto h-[350px] sm:h-[450px] md:h-[550px] lg:h-[620px]">
          {/* Left Vinyl */}
        <motion.div
           initial={{ opacity: 0, x: -120, rotate: -45 }}
          animate={{ opacity: 1, x: 0, rotate: isPlaying ? 315 : -15 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            x: { duration: 1, delay: 0.3, type: "spring", stiffness: 50 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 15, ease: "linear" } 
              : { duration: 1 }
          }}
      whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
            className="absolute left-1/2 -translate-x-[110%] sm:-translate-x-[100%] md:-translate-x-[95%] w-[60vw] sm:w-[48vw] md:w-[40vw] lg:w-[36vw] max-w-[500px] aspect-square rounded-full shadow-2xl z-10 cursor-pointer"
          style={{
            background: `conic-gradient(from 0deg, #0d0d0d 0deg, #262626 40deg, #0d0d0d 80deg, #333333 120deg, #0d0d0d 160deg, #262626 200deg, #0d0d0d 240deg, #333333 280deg, #0d0d0d 320deg, #262626 360deg)`,
          border: "5px solid #111"
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-6 rounded-full border border-neutral-800 opacity-60"></div>
          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-60"></div>
            <div className="absolute inset-20 rounded-full border border-neutral-800 opacity-60"></div>
            <div className="absolute inset-28 rounded-full border border-neutral-800 opacity-60"></div>
          {/* Record Label */}
          <div className="absolute inset-[33%] rounded-full bg-[#fce3e4] border-2 border-[#111] flex flex-col items-center justify-center p-1 text-center shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-neutral-800 uppercase tracking-widest">Side A</span>
          <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="text-[10px] sm:text-[12px] font-bold text-neutral-950 leading-none mt-1">POWER CLOUD</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#ebd4fc] border border-neutral-800 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
          </div>
        </motion.div>

          {/* Right Vinyl */}
        <motion.div
          initial={{ opacity: 0, x: 120, rotate: 45 }}
          animate={{ opacity: 1, x: 0, rotate: isPlaying ? 375 : 15 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            x: { duration: 1, delay: 0.3, type: "spring", stiffness: 50 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 18, ease: "linear" } 
              : { duration: 1 }
          }}
         whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
            className="absolute left-1/2 translate-x-[10%] sm:translate-x-[0%] md:translate-x-[-5%] w-[60vw] sm:w-[48vw] md:w-[40vw] lg:w-[36vw] max-w-[500px] aspect-square rounded-full shadow-2xl z-10 cursor-pointer"
          style={{
            background: `conic-gradient(from 0deg, #0d0d0d 0deg, #262626 45deg, #0d0d0d 90deg, #333333 135deg, #0d0d0d 180deg, #262626 225deg, #0d0d0d 270deg, #333333 315deg, #0d0d0d 360deg)`,
              border: "5px solid #111"
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-6 rounded-full border border-neutral-800 opacity-60"></div>

          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-60"></div>
            <div className="absolute inset-20 rounded-full border border-neutral-800 opacity-60"></div>
            <div className="absolute inset-28 rounded-full border border-neutral-800 opacity-60"></div>
          {/* Record Label */}
          <div className="absolute inset-[33%] rounded-full bg-[#ebd4fc] border-2 border-[#111] flex flex-col items-center justify-center p-1 text-center shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-neutral-800 uppercase tracking-widest">Side B</span>
          <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="text-[10px] sm:text-[12px] font-bold text-neutral-950 leading-none mt-1">CLOUD</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#fce3e4] border border-neutral-800 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-neutral-900"></div>
          </div>
        </motion.div>

          {/* Center Vinyl (Dominant size, Foreground) */}
        <motion.div
         initial={{ opacity: 0, y: 180 }}
          animate={{ opacity: 1, y: 0, rotate: isPlaying ? 360 : 0 }}
          transition={{
            opacity: { duration: 1 },
            y: { duration: 1, type: "spring", stiffness: 60 },
            rotate: isPlaying 
              ? { repeat: Infinity, duration: 12, ease: "linear" } 
              : { duration: 1 }
          }}
          whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
            className="absolute left-1/2 -translate-x-1/2 w-[72vw] sm:w-[58vw] md:w-[48vw] lg:w-[44vw] max-w-[620px] aspect-square rounded-full shadow-2xl z-20 cursor-pointer border-[6px] border-[#0c0c0c] flex items-center justify-center"
          style={{
            background: `conic-gradient(from 0deg, #080808 0deg, #222222 30deg, #080808 60deg, #2e2e2e 90deg, #080808 120deg, #222222 150deg, #080808 180deg, #2e2e2e 210deg, #080808 240deg, #222222 270deg, #080808 300deg, #2e2e2e 330deg, #080808 360deg)`
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-6 rounded-full border border-neutral-800 opacity-70"></div>

          <div className="absolute inset-12 rounded-full border border-neutral-800 opacity-70"></div>
            <div className="absolute inset-20 rounded-full border border-neutral-800 opacity-70"></div>
            <div className="absolute inset-28 rounded-full border border-neutral-800 opacity-70"></div>
            <div className="absolute inset-36 rounded-full border border-neutral-800 opacity-70"></div>
          {/* Record Label */}
          <div className="absolute inset-[32%] rounded-full bg-white border-2 border-[#111] flex flex-col items-center justify-center p-2 text-center shadow-inner">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest">POWER CLOUD</span>
              <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="text-[13px] sm:text-[16px] font-black text-neutral-900 tracking-tight mt-1 leading-none">ARTIST</span>
              <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="text-[9px] sm:text-[10px] text-neutral-500 font-bold tracking-wide">DASHBOARD</span>
          </div>
          <div className="absolute inset-[46%] rounded-full bg-[#ff9a9e] border border-neutral-800 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-900"></div>
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

     {/* Floating Scroll Down Arrow Hint at Bottom Center */}
     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <motion.button
          onClick={onExplore}
          className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          whileHover={{ y: 3 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-sm font-semibold uppercase tracking-widest group-hover:opacity-100 opacity-80 transition duration-300">
            Scroll to Dashboard
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-white drop-shadow" />
          </motion.div>
        </motion.button>
      </div>
      </div>
      </div>
  );
}