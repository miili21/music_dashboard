import { motion } from "framer-motion";
import { artists } from "../data/artists";
import { albums } from "../data/albums";

interface TopCloudAlbumsProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function TopCloudAlbums({ selectedId, onSelect }: TopCloudAlbumsProps) {
  // We use Bad Bunny (ID 4), Sabrina Carpenter (ID 1), Tyler, The Creator (ID 5)
  const items = [
    {
      id: 4,
      artist: artists.find(a => a.id === 4),
      album: albums.find(a => a.artistId === 4),
      glowColor: "rgba(239, 68, 68, 0.6)", // Red glow
      borderColor: "border-red-500",
    },
    {
      id: 1,
      artist: artists.find(a => a.id === 1),
      album: albums.find(a => a.artistId === 1),
      glowColor: "rgba(234, 179, 8, 0.7)", // Gold/Yellow glow (Center/Primary)
      borderColor: "border-yellow-500",
      isCenter: true,
    },
    {
      id: 5,
      artist: artists.find(a => a.id === 5),
      album: albums.find(a => a.artistId === 5),
      glowColor: "rgba(249, 115, 22, 0.6)", // Orange glow
      borderColor: "border-orange-500",
    }
  ];

  return (
    <div className="w-full flex flex-col items-center py-6 relative select-none">
      <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2">
        top songs of the moment
      </div>

      {/* The CLOUD word visual structure */}
      <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-8 relative max-w-full">
        {/* Left 'cl' prefix */}
        <div className="font-serif italic font-light text-6xl sm:text-7xl md:text-9xl text-white/90 pr-2 select-none">
          cl
        </div>

        {/* 3 Circular Albums / Artists */}
        <div className="flex items-center -space-x-4 sm:-space-x-8 md:-space-x-12 relative">
          {items.map((item) => {
            const artist = item.artist;
            const album = item.album;
            if (!artist || !album) return null;

            const isSelected = selectedId === item.id;
            const isCenter = item.isCenter;

            return (
              <motion.div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`relative rounded-full cursor-pointer transition-all duration-300 ${
                  isCenter ? "z-30 scale-105" : "z-10 opacity-85 hover:opacity-100"
                }`}
                whileHover={{
                  scale: isCenter ? 1.1 : 1.05,
                  zIndex: 40,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glowing Aura back */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-60 transition duration-300"
                  style={{
                    backgroundColor: item.glowColor,
                    boxShadow: isSelected ? `0 0 30px 10px ${item.glowColor}` : `0 0 15px 2px ${item.glowColor}`
                  }}
                ></div>

                {/* Main Circle (Using artist photo / avatar or cover art) */}
                <div
                  className={`relative overflow-hidden rounded-full border-2 sm:border-4 ${item.borderColor} shadow-2xl bg-neutral-900 flex items-center justify-center transition-all ${
                    isCenter 
                      ? "w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48" 
                      : "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
                  } ${isSelected ? "ring-4 ring-white" : ""}`}
                >
                  <img
                    src={artist.id === 1 ? artist.avatarUrl : artist.avatarUrl} // Fallbacks are solid URL images
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Information Layer */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-2">
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">{artist.name}</span>
                    <span className="text-[8px] md:text-[10px] text-neutral-300 italic truncate max-w-full font-mono mt-0.5">{album.titleAlbum}</span>
                  </div>
                </div>

                {/* Year Badge */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/25 text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-300 shadow">
                  {artist.year}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Right 'd' suffix */}
        <div className="font-serif italic font-light text-6xl sm:text-7xl md:text-9xl text-white/90 pl-2 select-none">
          d
        </div>
      </div>
    </div>
  );
}
