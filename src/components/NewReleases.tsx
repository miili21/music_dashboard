import { Flame, Volume2 } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { songs } from "../data/songs";import { artists } from "../data/artists";
import { albums } from "../data/albums";

interface NewReleasesProps {
  onSelectArtist: (id: number) => void;
  selectedArtistId: number | null;
}

export default function NewReleases({ onSelectArtist, selectedArtistId }: NewReleasesProps) {
  // Sort songs by year descending to get the newest releases first
  const sortedReleases = useMemo(() => {
    return [...songs].sort((a, b) => b.year - a.year);
  }, []);

  // Featured Release: BTS (Proof album) or similar from the image
  const featuredSong = useMemo(() => {
    return songs.find(s => s.artistId === 8) || songs[0];
  }, []);

  const featuredArtist = useMemo(() => {
    return artists.find(a => a.id === featuredSong.artistId);
  }, [featuredSong]);

  const featuredAlbum = useMemo(() => {
    return albums.find(a => a.id === featuredSong.albumId);
  }, [featuredSong]);

  return (
    <div className="w-full h-[85vh] rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between overflow-hidden">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
        <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-pink-500 fill-pink-500/20" />
          new releases
        </span>
        <span className="text-[10px] font-mono text-neutral-400">
          2026 Edition
        </span>
      </div>

      {/* Featured Card (Matches BTS Proof / Arirang visual representation with red vinyls) */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 group mb-4 shadow-xl">
        <div className="aspect-video w-full relative bg-neutral-900 overflow-hidden">
          {/* Cover Image */}
          <img
            src="https://picsum.photos/seed/bts-photo/600/400"
            alt={featuredSong.titleSong}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

          {/* Featured Badge */}
          <span className="absolute top-3 left-3 bg-pink-500 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
            Featured
          </span>

          {/* Three Red Overlapping Vinyl Records (Replicating the red discs at the bottom of the BTS Proof cover in the image) */}
          <div className="absolute bottom-3 right-3 flex items-center -space-x-2.5 select-none">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                className="w-6 h-6 rounded-full bg-red-600 border border-black/40 flex items-center justify-center shadow-lg relative"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6 + num, ease: "linear" }}
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-1 rounded-full border border-red-800 opacity-60"></div>
                {/* Center Label */}
                <div className="w-2 h-2 rounded-full bg-black flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text Details overlay */}
          <div className="absolute bottom-3 left-3 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-mono text-pink-400 font-bold">
              {featuredArtist?.name}
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              {featuredAlbum?.titleAlbum}
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Tracks List with glowing scrollbar */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1.5 space-y-2">
        {sortedReleases.map((song) => {
          const artist = artists.find(a => a.id === song.artistId);
          const isSelected = selectedArtistId === song.artistId;

          return (
            <motion.div
              key={song.id}
              onClick={() => onSelectArtist(song.artistId)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition duration-300 cursor-pointer ${
                isSelected
                  ? "bg-linear-to-r from-pink-500/10 to-orange-500/10 border-pink-500/40 shadow-inner"
                  : "bg-white/1 border-white/5 hover:border-white/20 hover:bg-white/4"
              }`}
              whileHover={{ x: 2 }}
              id={`release-item-${song.id}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Small Cover art */}
                <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 bg-neutral-900">
                  <img
                    src={song.coverUrl}
                    alt={song.titleSong}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-white animate-bounce" />
                    </div>
                  )}
                </div>

                {/* Song & Artist Names */}
                <div className="flex flex-col min-w-0">
                  <span className={`text-[12px] font-bold truncate tracking-wide ${
                    isSelected ? "text-pink-400" : "text-white"
                  }`}>
                    {song.titleSong}
                  </span>
                  <span className="text-[10px] text-neutral-400 truncate tracking-wide font-sans mt-0.5">
                    {artist?.name}
                  </span>
                </div>
              </div>

              {/* Year Indicator */}
              <div className="flex flex-col items-end shrink-0 ml-2 font-mono">
                <span className="text-[10px] font-bold text-neutral-300">
                  {song.year}
                </span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest mt-0.5">
                  RELEASE
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
