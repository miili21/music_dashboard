import { motion} from "framer-motion";
import { useMemo } from "react";

interface WorldHeatMapProps {
  globalReach: string[];
}

interface CountryCoords {
  name: string;
  x: number; // Percentage
  y: number; // Percentage
  color: string;
}

export default function WorldHeatMap({ globalReach }: WorldHeatMapProps) {
  // Mapping country names to coordinates on our SVG stage (0-100 scale)
  const countryLocations: Record<string, { x: number; y: number; color: string }> = {
    USA: { x: 22, y: 35, color: "from-orange-500 to-amber-400" },
    Canada: { x: 24, y: 22, color: "from-amber-500 to-yellow-400" },
    Mexico: { x: 20, y: 46, color: "from-red-500 to-orange-400" },
    Colombia: { x: 28, y: 56, color: "from-yellow-500 to-orange-400" },
    Brazil: { x: 33, y: 68, color: "from-pink-500 to-rose-400" },
    Peru: { x: 27, y: 64, color: "from-emerald-500 to-teal-400" },
    Chile: { x: 28, y: 80, color: "from-blue-500 to-indigo-400" },
    Argentina: { x: 32, y: 82, color: "from-purple-500 to-pink-400" },
    UK: { x: 46, y: 27, color: "from-cyan-500 to-blue-400" },
    France: { x: 48, y: 33, color: "from-blue-500 to-teal-400" },
    Germany: { x: 50, y: 29, color: "from-indigo-500 to-purple-400" },
    Spain: { x: 46, y: 38, color: "from-orange-500 to-yellow-400" },
    Italy: { x: 51, y: 35, color: "from-green-500 to-emerald-400" },
    Netherlands: { x: 49, y: 28, color: "from-cyan-500 to-teal-400" },
    "South Korea": { x: 79, y: 38, color: "from-pink-500 to-purple-400" },
    Japan: { x: 82, y: 38, color: "from-red-500 to-pink-400" },
    Philippines: { x: 78, y: 52, color: "from-amber-500 to-orange-400" },
    Indonesia: { x: 76, y: 61, color: "from-teal-500 to-emerald-400" },
    India: { x: 67, y: 46, color: "from-orange-500 to-yellow-400" },
    Thailand: { x: 74, y: 51, color: "from-yellow-500 to-amber-400" },
    Australia: { x: 84, y: 78, color: "from-purple-500 to-indigo-400" },
  };

  const activeLocations = useMemo(() => {
    return globalReach
      .map((country) => {
        const coords = countryLocations[country];
        if (coords) {
          return {
            name: country,
            ...coords,
          };
        }
        return null;
      })
      .filter((loc): loc is CountryCoords => loc !== null);
  }, [globalReach]);

  return (
    <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden h-[300px]">
      {/* Glow highlight */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none"></div>

      <div>
        <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-1">
          Global Audience Reach
        </h3>
        <p className="text-[10px] text-neutral-500 font-mono mb-4">
          Active markets identified by listener stream hotspots.
        </p>
      </div>

      {/* Styled Dot Map Stage */}
      <div className="relative w-full flex-1 min-h-[160px] bg-neutral-950/40 rounded-xl border border-white/3 overflow-hidden p-2 select-none">
        {/* World map background representation using an SVG pattern or abstract outline */}
        <svg
          className="w-full h-full opacity-20 text-neutral-600"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* North America */}
          <path d="M 5,20 C 12,18 20,15 28,25 C 32,29 25,45 18,48 C 15,40 8,30 5,20 Z" />
          {/* South America */}
          <path d="M 24,55 C 28,52 35,62 33,72 C 31,82 28,90 26,85 C 23,75 22,65 24,55 Z" />
          {/* Greenland */}
          <path d="M 28,12 C 32,10 38,15 35,18 C 30,22 26,18 28,12 Z" />
          {/* Africa */}
          <path d="M 45,45 C 52,42 58,48 56,58 C 54,68 48,78 45,72 C 42,65 40,55 45,45 Z" />
          {/* Eurasia */}
          <path d="M 42,25 C 50,20 70,18 85,25 C 88,32 78,48 68,45 C 58,42 48,35 42,25 Z" />
          {/* Australia */}
          <path d="M 78,72 C 84,70 88,74 86,80 C 82,84 76,82 78,72 Z" />
        </svg>

        {/* Dynamic Glowing Hotspot Overlays */}
        {activeLocations.map((loc, i) => (
          <div
            key={loc.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            {/* Pulsing light rings */}
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-pink-500 opacity-25 animate-ping"></span>
            
            {/* Steady Core Dot */}
            <div className={`relative w-2.5 h-2.5 rounded-full bg-linear-to-r ${loc.color} border border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-125 transition duration-200`}></div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-[9px] text-white px-1.5 py-0.5 rounded border border-white/15 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition duration-150 font-mono z-20">
              {loc.name}
            </div>
          </div>
        ))}
      </div>

      {/* Metric legend */}
      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 pt-3 border-t border-white/5 mt-3">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
          <span>Live Hotspot</span>
        </div>
        <span>Total Active Markets: {activeLocations.length}</span>
      </div>
    </div>
  );
}
