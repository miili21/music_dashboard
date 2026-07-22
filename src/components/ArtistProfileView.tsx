import { motion} from "framer-motion";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { Artist } from "../data/artists";
import { songs } from "../data/songs";
import WorldHeatMap from "./WorldHeatMap";
import { Heart } from "lucide-react";

interface ArtistProfileViewProps {
  artist: Artist;
  onSongSelect?: (songId: number) => void;
}

export default function ArtistProfileView({ artist, onSongSelect }: ArtistProfileViewProps) {
  // -------------------------------------------------------------------------
  // 1. EARNINGS OVER THE LAST 3 YEARS (Categories: merch, shows, albums, streaming)
  // -------------------------------------------------------------------------
  const earningsChartData = useMemo(() => {
    const { merchEarning, showsEarning, albumEarning, streamingEarning } = artist.graphics;

    // Distributing the current earnings over the last 3 years with incremental growth
    return [
      {
        year: "2024",
        "Merch": Math.round((merchEarning * 0.75) / 1000000), // In Millions
        "Giras / Shows": Math.round((showsEarning * 0.70) / 1000000),
        "Álbumes": Math.round((albumEarning * 0.80) / 1000000),
        "Streaming": Math.round((streamingEarning * 0.72) / 1000000),
      },
      {
        year: "2025",
        "Merch": Math.round((merchEarning * 0.88) / 1000000),
        "Giras / Shows": Math.round((showsEarning * 0.85) / 1000000),
        "Álbumes": Math.round((albumEarning * 0.90) / 1000000),
        "Streaming": Math.round((streamingEarning * 0.86) / 1000000),
      },
      {
        year: "2026",
        "Merch": Math.round(merchEarning / 1000000),
        "Giras / Shows": Math.round(showsEarning / 1000000),
        "Álbumes": Math.round(albumEarning / 1000000),
        "Streaming": Math.round(streamingEarning / 1000000),
      },
    ];
  }, [artist]);

  // Find other tracks of this artist from mock database to populate the bottom list
  const artistSongs = useMemo(() => {
    return songs.filter((s) => s.artistId === artist.id);
  }, [artist]);

  // Combine `artist.profitableTracks` (usually names list) with detailed data from songs DB
  const displayProfitableTracks = useMemo(() => {
    return artist.profitableTracks.map((trackName, idx) => {
      // Try to find full song object in database
      const fullSong = songs.find(
        (s) => s.titleSong.toLowerCase() === trackName.toLowerCase() && s.artistId === artist.id
      );

      return {
        id: fullSong?.id || idx + 100,
        titleSong: trackName,
        year: fullSong?.year || artist.year,
        earnings: fullSong?.kpis.earnings || (artist.graphics.streamingEarning / 5) * (1 - idx * 0.15),
        popularity: 100 - idx * 12, // For custom visual scrollbar/bar
      };
    });
  }, [artist]);

  // Formatting large values beautifully
  const formatValue = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="w-full space-y-6 pb-20 relative">
      {/* Name and KPIs row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Artist Name in Inter Light Italic */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl select-none"
        >
          <span className="text-[10px] tracking-widest font-mono uppercase text-pink-500/80 bg-pink-500/5 px-2.5 py-1 rounded border border-pink-500/15 mb-2 inline-block">
            Artist Spotlight
          </span>
          <h1 className="text-5xl md:text-7xl font-sans font-light italic text-white tracking-tight leading-none text-glow uppercase sm:normal-case">
            {artist.name}
          </h1>
        </motion.div>

        {/* Spanish KPIs styled as rounded boxes with white texts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 xl:justify-end"
        >
          {/* Conversion rate */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 min-w-[120px] text-center shadow-lg hover:border-pink-500/50 transition duration-300">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">Conversión Oyentes</span>
            <span className="text-base font-black text-white font-mono tracking-wide">
              {artist.kpis.conversionRate}%
            </span>
          </div>

          {/* Subscription Monthly Earning */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 min-w-[140px] text-center shadow-lg hover:border-purple-500/50 transition duration-300">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">Ingresos suscripciones</span>
            <span className="text-base font-black text-white font-mono tracking-wide">
              {formatValue(artist.kpis.subscriptionEarning)}
            </span>
          </div>

          {/* Last Album net benefits */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 min-w-[130px] text-center shadow-lg hover:border-orange-500/50 transition duration-300">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">Beneficio Neto</span>
            <span className="text-base font-black text-white font-mono tracking-wide">
              {formatValue(artist.kpis.netBenefits)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Row 1: Last Album Note Card + Total Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Featured Release / Last Album Note Card */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 relative overflow-hidden group min-h-[300px]">
          {/* Back Glowing Aura */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-linear-to-tr from-pink-500/10 to-orange-500/10 blur-3xl pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                Last Album
              </span>
              <span className="text-[9px] font-mono text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                {artist.bannerSong.album}
              </span>
            </div>

            {/* Title / Cover info */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-extrabold italic text-white leading-tight font-sans tracking-wide">
                  {artist.bannerSong.titleSong}
                </h2>
                <p className="text-xs text-neutral-400 max-w-xs font-sans leading-relaxed">
                  {artist.bannerSong.description}
                </p>
              </div>

              {/* Album Cover preview on the right */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden relative border border-white/10 shrink-0 bg-neutral-900 group-hover:scale-105 transition duration-500 shadow-xl">
                <img
                  src={artist.bannerSong.coverUrl}
                  alt={artist.bannerSong.titleSong}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Platform Likes counts as requested */}
          <div className="pt-4 border-t border-white/5 space-y-3 font-mono">
            {/* Multi-platform indicators */}
            <div className="grid grid-cols-3 gap-2">
              {/* YouTube Likes */}
              <div className="bg-neutral-950/40 border border-white/4 rounded-xl p-2 text-center">
                <span className="text-[9px] text-neutral-500 block uppercase font-mono">YouTube</span>
                <span className="text-xs font-bold text-red-500">{(artist.bannerSong.totalLikes * 0.4 / 1000000).toFixed(1)}M</span>
              </div>
              {/* Spotify Saves */}
              <div className="bg-neutral-950/40 border border-white/4 rounded-xl p-2 text-center">
                <span className="text-[9px] text-neutral-500 block uppercase font-mono">Spotify</span>
                <span className="text-xs font-bold text-green-500">{(artist.bannerSong.totalLikes * 0.55 / 1000000).toFixed(1)}M</span>
              </div>
              {/* Apple Likes */}
              <div className="bg-neutral-950/40 border border-white/4 rounded-xl p-2 text-center">
                <span className="text-[9px] text-neutral-500 block uppercase font-mono">Apple</span>
                <span className="text-xs font-bold text-cyan-500">{(artist.bannerSong.totalLikes * 0.25 / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                {(artist.bannerSong.totalLikes / 1000000).toFixed(1)}M Total Likes
              </span>
              <span className="text-[9px] text-neutral-500">Released 2026</span>
            </div>
          </div>
        </div>

        {/* Right Card: Dynamic neon-glowing Line Chart of total earnings divided by categories */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                3-Year Total Revenue Streams
              </h3>
              <span className="text-[9px] text-neutral-500 uppercase font-mono tracking-wider">
                Category Split
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed font-sans">
              Performance breakdown of shows, merch, physical albums, and digital streaming (in Millions USD).
            </p>
          </div>

          {/* Line Chart */}
          <div className="h-44 w-full select-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="glowShows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="glowStreaming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 10, 10, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "11px",
                    color: "#fff",
                  }}
                />
                <Area type="monotone" dataKey="Giras / Shows" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#glowShows)" />
                <Area type="monotone" dataKey="Streaming" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#glowStreaming)" />
                <Area type="monotone" dataKey="Álbumes" stroke="#2563eb" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="Merch" stroke="#10b981" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-mono uppercase text-neutral-400 pt-3 border-t border-white/5 mt-3">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#a855f7] inline-block rounded-full"></span>
              <span>Giras / Gigs</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#f97316] inline-block rounded-full"></span>
              <span>Streaming</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#2563eb] inline-block rounded-full"></span>
              <span>Álbumes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#10b981] inline-block rounded-full"></span>
              <span>Merch</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: World Heat Map + Top Profitable Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: World Dot Map representing globalReach */}
        <div className="lg:col-span-6">
          <WorldHeatMap globalReach={artist.globalReach} />
        </div>

        {/* Right: Top Profitable Tracks */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                Top Profitable Tracks
              </h3>
              <span className="text-[10px] text-pink-500 font-mono">
                Streaming + Downloads
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-mono mb-4">
              Real-time calculations based on multi-platform monetization.
            </p>
          </div>

          {/* Tracks List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1.5 space-y-2.5 max-h-[170px]">
            {displayProfitableTracks.map((track, i) => {
              const rank = i + 1;
              return (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-900/60 transition duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 font-mono font-bold text-neutral-500 text-xs text-center">
                      {rank}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white tracking-wide truncate">
                        {track.titleSong}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {artist.name}
                      </span>
                    </div>
                  </div>

                  {/* Performance Indicators / Custom styled progress bars */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 sm:w-24 bg-neutral-900 h-1.5 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${track.popularity}%` }}
                      ></div>
                    </div>

                    <div className="flex flex-col items-end font-mono">
                      <span className="text-[10px] font-bold text-emerald-400">
                        {formatValue(track.earnings)}
                      </span>
                      <span className="text-[8px] text-neutral-500 uppercase">
                        {track.year}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer stats summary */}
          <div className="pt-3 border-t border-white/5 mt-3 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
            <span>Total Catalog Tracks: {artistSongs.length || 5}</span>
            <span>Refreshed July 2026</span>
          </div>
        </div>

      </div>

    </div>
  );
}