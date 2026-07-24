import { motion } from "framer-motion";
import { Artist, artists } from "../data/artists";

interface TopArtistsProps {
  selectedArtistId: number | null;
  onSelectArtist: (id: number) => void;
}

export default function TopArtists({ selectedArtistId, onSelectArtist }: TopArtistsProps) {
  // Let's filter or select 5 representative artists for our Top 5
  // We'll use Olivia Rodrigo (ID 6), Ariana Grande (ID 2), Bad Bunny (ID 4), Dua Lipa (ID 7), Bruno Mars (ID 3)
  const top5Ids = [6, 2, 4, 7, 3];
  const topArtists = top5Ids
    .map(id => artists.find(a => a.id === id))
    .filter((a): a is Artist => !!a);

  return (
    <div className="w-full flex flex-col items-center py-4 select-none">
      <div className="w-full flex items-center justify-between px-2 mb-3">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Top 5 Artists of the Moment
        </span>
        <span className="text-[10px] font-mono text-pink-500 uppercase tracking-widest bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
          Ranked Live
        </span>
      </div>

      {/* Row of 5 Circular Artists */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full py-2">
        {topArtists.map((artist, index) => {
          const isSelected = selectedArtistId === artist.id;
          const rank = index + 1;

          return (
            <motion.div
              key={artist.id}
              onClick={() => onSelectArtist(artist.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Circular Avatar Container with dynamic hover glow */}
              <div className="relative">
                {/* Ranking Pill */}
                <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-linear-to-tr from-pink-500 to-orange-500 text-white font-mono font-black text-[10px] flex items-center justify-center z-10 border border-neutral-900 shadow">
                  {rank}
                </span>

                {/* Circle Glow */}
                <div
                  className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition duration-300 ${
                    isSelected ? "opacity-75 bg-pink-500/50 scale-105" : "bg-white/10"
                  }`}
                ></div>

                {/* Main Circular Image */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-pink-500 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.5)] ring-2 ring-white/10"
                      : "border-white/10 hover:border-white/40"
                  }`}
                >
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Artist Name */}
              <span
                className={`text-[10px] sm:text-xs font-semibold tracking-wide transition duration-300 ${
                  isSelected ? "text-pink-400 font-bold" : "text-neutral-400 group-hover:text-neutral-200"
                }`}
              >
                {artist.name.split(" ")[0]} {/* Just show first name to keep it compact and clean */}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
