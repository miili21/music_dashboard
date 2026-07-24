import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Album } from "../data/albums";
import { artists } from "../data/artists";
import { songs } from "../data/songs";
import {
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface AlbumProfileViewProps {
  album: Album;
  language: "es" | "en";
  onSongSelect?: (songId: number) => void;
}

export default function AlbumProfileView({ album, language, onSongSelect }: AlbumProfileViewProps) {
  // Find the artist of this album
  const artist = useMemo(() => {
    return artists.find((a) => a.id === album.artistId) || artists[0];
  }, [album]);

  // Find all songs belonging to this album
  const albumSongs = useMemo(() => {
    return songs.filter((s) => s.albumId === album.id);
  }, [album]);

  // Lead song is the one with the highest views
  const leadSong = useMemo(() => {
    if (albumSongs.length === 0) return null;
    return [...albumSongs].sort((a, b) => b.totalViews - a.totalViews)[0];
  }, [albumSongs]);

  // Remaining songs of the album
  const otherSongs = useMemo(() => {
    if (albumSongs.length === 0) return [];
    const lead = leadSong;
    return albumSongs.filter((s) => s.id !== lead?.id);
  }, [albumSongs, leadSong]);

  // Gauge Progress Calculations (Revenue / Production Cost)
  const breakEvenProgress = useMemo(() => {
    const ratio = album.revenue / album.productionCost;
    return Math.min(ratio * 100, 150); // cap visual representation at 150% for gauge spacing
  }, [album]);

  const breakEvenStatus = useMemo(() => {
    const recovered = album.revenue;
    const cost = album.productionCost;
    const difference = cost - recovered;
    const isProfitable = difference <= 0;

    return {
      isProfitable,
      difference: Math.abs(difference),
      percentage: Math.round((recovered / cost) * 100),
    };
  }, [album]);

  // Pie chart data for Revenue Stream Mix
  const revenueMixData = useMemo(() => {
    const { streaming, physical, merch, licensing } = album.revenueMix;
    return [
      { name: language === "es" ? "Streaming Digital" : "Digital Streaming", value: streaming, color: "#a855f7" }, // Purple
      { name: language === "es" ? "Vinilos y CDs" : "Vinyl & CDs", value: physical, color: "#60a5fa" }, // Blue
      { name: language === "es" ? "Merchandising" : "Official Merch", value: merch, color: "#10b981" }, // Emerald
      { name: language === "es" ? "Licencias / Sinc" : "Licensing & Sync", value: licensing, color: "#fbbf24" }, // Gold
    ];
  }, [album, language]);

  // Beautiful formatter for dollar values
  const formatDollar = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${val.toLocaleString()}`;
  };

  // Translations
  const t = {
    es: {
      roiLabel: "ROI Alcanzado",
      breakPointLabel: "Break-Point",
      completionRateLabel: "Album Completion",
      completionDesc: "Usuarios que escuchan el álbum completo",
      unitsNeeded: "unidades para recuperar costo",
      mostPlayed: "Canción Más Reproducida",
      tracklistTitle: "Otras canciones del álbum",
      gaugeTitle: "Indicador del Punto de Equilibrio",
      gaugeSubtitle: "Progreso de recuperación vs costo de producción",
      profitable: "¡Álbum Rentable!",
      deficitText: "Faltan {amount} para recuperar inversión",
      surplusText: "Ganancia positiva / Retorno excelente",
      streamMixTitle: "Matriz de Combinación de Ingresos",
      streamMixSubtitle: "Desglose por canales de monetización",
      views: "visualizaciones",
    },
    en: {
      roiLabel: "ROI Achieved",
      breakPointLabel: "Break-Point",
      completionRateLabel: "Album Completion",
      completionDesc: "Users who listen to the entire album",
      unitsNeeded: "units needed to break even",
      mostPlayed: "Most Streamed Track",
      tracklistTitle: "Other Album Tracks",
      gaugeTitle: "Break-Even Progress Gauge",
      gaugeSubtitle: "Cost recovery vs production investment",
      profitable: "Profitable Album!",
      deficitText: "{amount} remaining to break even",
      surplusText: "Net positive profit / Outstanding ROI",
      streamMixTitle: "Revenue Stream Mix",
      streamMixSubtitle: "Monetization channel breakdown",
      views: "views",
    },
  }[language];

  // Semicircular Gauge SVG Math (Radius 60, center 70,70)
  const gaugePathString = useMemo(() => {
    // Semicircular path from left (180deg) to right (0deg)
    // Radius = 50, stroke width = 12
    return "M 20 70 A 50 50 0 0 1 120 70";
  }, []);

  const strokeDashoffset = useMemo(() => {
    // Semicircle perimeter is PI * R = 3.14159 * 50 = 157
    const perimeter = 157;
    const percentage = Math.min(breakEvenStatus.percentage, 100);
    return perimeter - (perimeter * percentage) / 100;
  }, [breakEvenStatus]);

  return (
    <div className="w-full space-y-6 pb-20 relative">

      {/* TWO COLUMNS WRAPPER (Content left/center, Spinning Vinyl right on desktop) */}
      {/* MAIN ALBUM CONTENT COLUMN */}
      <div className="w-full space-y-6">

        {/* Header containing lowercased light italic Inter title & Artist name */}
        <div className="space-y-1">
          <span className="text-[10px] tracking-widest font-mono uppercase text-pink-400 bg-pink-500/5 px-2.5 py-1 rounded border border-pink-500/15 mb-2 inline-block">
            {artist.name} &bull; {album.year}
          </span>
          {/* Title in lowercase, light italic display as shown in mockup */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-light italic text-white tracking-tight leading-none lowercase"
          >
            {album.titleAlbum}
          </motion.h1>
        </div>

        {/* 3 KPIs exactly styled like the ones in the prompt mockup (dark rounded cards, white values) */}
        <div className="grid grid-cols-3 gap-3">
          {/* KPI 1: ROI */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 text-center shadow-lg hover:border-pink-500/50 hover:shadow-[0_0_18px_rgba(236,72,153,0.2)] transition duration-300">
            <span className="text-[10px] font-body text-neutral-400 block mb-1 uppercase tracking-wider">
              {t.roiLabel}
            </span>
            <span className="text-sm md:text-base font-black font-mono tracking-wide text-neon-gradient">
              {album.roi}%
            </span>
          </div>

          {/* KPI 2: Break-Point */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 text-center shadow-lg hover:border-orange-500/50 hover:shadow-[0_0_18px_rgba(249,115,22,0.2)] transition duration-300">
            <span className="text-[10px] font-body text-neutral-400 block mb-1 uppercase tracking-wider">
              {t.breakPointLabel}
            </span>
            <span className="text-sm md:text-base font-black font-mono tracking-wide truncate block text-neon-gradient">
              {album.breakEven.toLocaleString()}$
            </span>
          </div>

          {/* KPI 3: Album Completion Rate */}
          <div className="rounded-2xl border border-white/20 bg-neutral-950/60 p-4 text-center shadow-lg hover:border-pink-500/50 hover:shadow-[0_0_18px_rgba(236,72,153,0.15)] transition duration-300">
            <span className="text-[9px] md:text-[10px] font-body text-neutral-400 block mb-1 uppercase tracking-wider leading-tight">
              Completion Rate
            </span>
            <span className="text-sm md:text-base font-black font-mono tracking-wide text-neon-gradient">
              {album.completionRate}%
            </span>
          </div>
        </div>

        {/* Most Played Card + Tracklist Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* Left Card: Most Played Song Card (replicates Sabrina's "Last Album Espresso" style card) */}
          {leadSong && (
            <div className="md:col-span-6 flex flex-col justify-between rounded-3xl border border-white/10 glass-panel shadow-2xl p-5 relative overflow-hidden group min-h-[260px]">
              {/* Radiant Glow Behind */}
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-2xl pointer-events-none"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                    {t.mostPlayed}
                  </span>
                  <span className="text-[9px] font-mono text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    Popularity Peak
                  </span>
                </div>

                {/* Title and descriptions */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-heading font-extrabold italic text-white leading-tight tracking-wide">
                      {leadSong.titleSong}
                    </h2>
                    <p className="text-[11px] text-neutral-400 max-w-[200px] font-body leading-relaxed">
                      Top active single with massive dynamic streams.
                    </p>
                  </div>

                  {/* Round card cover */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 flex-shrink-0 bg-neutral-900 group-hover:scale-105 transition duration-500 shadow-xl">
                    <img
                      src={leadSong.coverUrl}
                      alt={leadSong.titleSong}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated Platform likes */}
              <div className="pt-4 border-t border-white/5 space-y-2 relative z-10">
                <div className="grid grid-cols-3 gap-1.5 font-mono text-center">
                  <div className="bg-neutral-950/40 border border-white/[0.04] rounded-lg p-1.5">
                    <span className="text-[8px] text-neutral-500 block uppercase">Spotify</span>
                    <span className="text-[10px] font-bold text-green-400">{(leadSong.spotifyLikes / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="bg-neutral-950/40 border border-white/[0.04] rounded-lg p-1.5">
                    <span className="text-[8px] text-neutral-500 block uppercase">YouTube</span>
                    <span className="text-[10px] font-bold text-red-500">{(leadSong.youtubeLikes / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="bg-neutral-950/40 border border-white/[0.04] rounded-lg p-1.5">
                    <span className="text-[8px] text-neutral-500 block uppercase">Apple</span>
                    <span className="text-[10px] font-bold text-cyan-400">{(leadSong.appleMusicLikes / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 pt-1">
                  <span className="font-bold flex items-center gap-1 text-pink-500">
                    <Sparkles className="w-3 h-3 text-pink-500 animate-pulse" />
                    {(leadSong.totalLikes / 1000000).toFixed(1)}M Likes
                  </span>
                  <span>{(leadSong.totalViews / 1000000).toFixed(1)}M Views</span>
                </div>
              </div>
            </div>
          )}

          {/* Right List: Tracklist of other songs of the album with view count */}
          <div className="md:col-span-6 flex flex-col justify-between rounded-3xl border border-white/10 glass-panel shadow-2xl p-5 min-h-[260px]">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-1">
                {t.tracklistTitle}
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono mb-4">
                Streams & list counts per secondary track.
              </p>
            </div>

            {/* Tracks List with scrollbar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1.5 space-y-2 max-h-[140px]">
              {otherSongs.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-500 italic">
                  No secondary tracks in mock list
                </div>
              ) : (
                otherSongs.map((song, i) => (
                  <div
                    key={song.id}
                    onClick={() => onSongSelect?.(song.id)}
                    className="flex items-center justify-between p-2 rounded-xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-900/60 transition duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-4 font-mono font-bold text-neutral-500 text-[10px] text-center">
                        {i + 2}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {song.titleSong}
                        </span>
                        <span className="text-[8px] text-neutral-500 uppercase font-mono">
                          Release Track
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                      <span>{(song.totalViews / 1000000).toFixed(1)}M {t.views}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-white/5 mt-3 text-[9px] font-mono text-neutral-500 text-right">
              Total Album Tracks: {albumSongs.length}
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: Two Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* CHART 1: Break-Even Progress Gauge */}
        <div className="rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-0.5">
              {t.gaugeTitle}
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono mb-4">
              {t.gaugeSubtitle}
            </p>
          </div>

          {/* Semicircular Gauge Stage */}
          <div className="flex flex-col items-center justify-center flex-1 relative min-h-[140px] pt-4 select-none">
            <svg width="180" height="110" viewBox="0 0 140 85" className="relative">
              {/* Outer background arc */}
              <path
                d={gaugePathString}
                fill="none"
                stroke="#171717"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Dynamic filled progress arc with custom glow drop-shadow */}
              <motion.path
                d={gaugePathString}
                fill="none"
                stroke={breakEvenStatus.isProfitable ? "#10b981" : "#f43f5e"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="157"
                initial={{ strokeDashoffset: 157 }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`${breakEvenStatus.isProfitable ? "shadow-[0_0_12px_#10b981]" : "shadow-[0_0_12px_#f43f5e]"}`}
              />

              {/* Start 0% marker label */}
              <text x="14" y="80" fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle">0%</text>
              {/* Center 100% target break-even marker label */}
              <text x="120" y="80" fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle">100%</text>
            </svg>

            {/* Gauge overlay text */}
            <div className="absolute bottom-2 text-center">
              <span className="text-2xl font-black font-mono tracking-tight block text-white">
                {breakEvenStatus.percentage}%
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded ${breakEvenStatus.isProfitable ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
                }`}>
                {breakEvenStatus.isProfitable ? t.profitable : `$${(album.revenue / 1000000).toFixed(1)}M Recov.`}
              </span>
            </div>
          </div>

          {/* Status text or deficit callout */}
          <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between font-mono text-[10px]">
            <span className="text-neutral-500">Break-Even Point: {formatDollar(album.productionCost)}</span>
            {breakEvenStatus.isProfitable ? (
              <span className="text-emerald-400 font-bold">{t.surplusText}</span>
            ) : (
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {t.deficitText.replace("{amount}", formatDollar(breakEvenStatus.difference))}
              </span>
            )}
          </div>
        </div>

        {/* CHART 2: Revenue Stream Mix */}
        <div className="rounded-3xl border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-0.5">
              {t.streamMixTitle}
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono mb-2">
              {t.streamMixSubtitle}
            </p>
          </div>

          {/* Minimalist segmented donut chart */}
          <div className="h-36 w-full relative select-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {revenueMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => formatDollar(Number(value))}
                  contentStyle={{
                    backgroundColor: "rgba(10,10,10,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "10px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Total value label in center of donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-neutral-500 uppercase font-mono">Total</span>
              <span className="text-sm font-bold text-neutral-100 font-mono">
                {formatDollar(album.revenue)}
              </span>
            </div>
          </div>

          {/* Custom structured responsive legend mapping */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-3 border-t border-white/5 mt-3">
            {revenueMixData.map((stream) => (
              <div key={stream.name} className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: stream.color }}
                  ></span>
                  <span className="text-neutral-400 truncate">{stream.name}</span>
                </div>
                <span className="text-neutral-200 font-bold">{formatDollar(stream.value)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
