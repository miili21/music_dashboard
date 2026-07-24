import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    CartesianGrid,
} from "recharts";
import { Song, songs } from "../data/songs";
import { artists } from "../data/artists";
import { albums } from "../data/albums";
import { Heart, Play, Eye, Share2, Sparkles, TrendingUp, Music, ShieldCheck, Zap, ArrowLeft } from "lucide-react";

interface SongProfileViewProps {
    song: Song;
    onSelectSong: (songId: number) => void;
    onPlaySong?: () => void;
    onBackToCatalog?: () => void;
    language?: "es" | "en";
}

export default function SongProfileView({
    song,
    onSelectSong,
    onPlaySong,
    onBackToCatalog,
    language = "es",
}: SongProfileViewProps) {
    // Find related artist and album objects
    const artist = useMemo(() => {
        return artists.find((a) => a.id === song.artistId) || artists[0];
    }, [song.artistId]);

    const album = useMemo(() => {
        return albums.find((al) => al.id === song.albumId) || albums[0];
    }, [song.albumId]);

    // All songs for selector dropdown
    const allSongs = songs;

    return (
        <div className="w-full space-y-6 pb-16 relative" id="song-profile-view">

            {/* Back button to catalog */}
            {onBackToCatalog && (
                <button
                    onClick={onBackToCatalog}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition shadow"
                    id="back-to-songs-catalog-btn"
                >
                    <ArrowLeft className="w-3.5 h-3.5 text-pink-400" />
                    <span>{language === "es" ? "Volver al Catálogo de Canciones" : "Back to Songs Catalog"}</span>
                </button>
            )}
            {/* ----------------------------------------------------------------- */}
            {/* 1. TOP HERO CARD (FULL WIDTH BANNER CARD WITH PREDOMINANT BG COLOR) */}
            {/* ----------------------------------------------------------------- */}
            <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[200px]"
                style={{
                    backgroundColor: song.cardColor || "#8da9c4",
                }}
            >
                {/* Soft radial overlay gradient for depth and readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-0" />

                {/* LEFT CONTENT AREA: Song Title, Metrics & Platform Pills */}
                <div className="relative z-10 space-y-2.5 max-w-xl text-left w-full md:w-2/3">
                 {/* Artist / Album metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-white/90">
                        <span className="bg-black/40 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold truncate max-w-[200px] sm:max-w-none">
                            {artist.name} &bull; {album.titleAlbum} ({song.year})
                        </span>

                    </div>

                    {/* LARGE SONG TITLE (ITALIC DISPLAY) */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black italic tracking-tight text-white drop-shadow-md leading-tight">
                        {song.titleSong}
                    </h1>

                    {/* METRICS OF VIEWS AND LIKES BELOW THE NAME */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/90 pt-0.5 font-sans">
                        <div className="text-lg sm:text-2xl font-light italic tracking-wide text-white/95">
                            {song.likesFormatted} likes
                        </div>

                        <div className="h-4 w-[1px] bg-white/30 hidden sm:block" />

                        {/* Platform metrics breakdown */}
                        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono">
                            <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                                Spotify: {(song.spotifyViews / 1000000).toFixed(0)}M
                            </span>
                            <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                                YT: {(song.youtubeViews / 1000000).toFixed(0)}M
                            </span>
                            <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                                APPLEM: {(song.appleMusicViews / 1000000).toFixed(0)}M
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: ALBUM COVER ARTWORK */}
                <div className="relative z-10 mt-4 md:mt-0 flex-shrink-0 self-center md:self-auto">
                    <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 group">
                        <img
                            src={song.coverUrl}
                            alt={song.titleSong}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                            referrerPolicy="no-referrer"
                        />
                        {/* Play overlay button */}
                        <button
                            onClick={onPlaySong}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center"
                            id="song-play-button-overlay"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition">
                                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black translate-x-0.5" />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>


            {/* ----------------------------------------------------------------- */}
            {/* 2. 4 KPIS ENCLOSED IN GLASS CARDS WITH VIBRANT NEON GLOW AURA */}
            {/* ----------------------------------------------------------------- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 py-1">

                {/* KPI 1: Save Rate (Amber / Gold Neon Glow) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    className="relative group rounded-xl p-3.5 border border-pink-500/25 glass-panel-heavy overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] transition duration-300"
                >
                    {/* Compact Glow aura */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-500/20 rounded-full blur-xl pointer-events-none group-hover:bg-pink-500/30 transition" />

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-body font-bold text-pink-300 uppercase tracking-wider truncate">
                                Save Rate
                            </span>
                            <div className="w-6 h-6 rounded-md bg-pink-500/20 flex items-center justify-center border border-pink-500/40 text-pink-300 flex-shrink-0">
                                <BookmarkIcon className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 pt-0.5">
                            <div className="text-2xl font-black text-white tracking-tight font-heading drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)]">
                                {song.saveRate}%
                            </div>
                            <p className="text-[9px] text-pink-200/70 font-body text-right truncate">
                                Tasa guardado / repro
                            </p>
                        </div>

                        {/* Glowing Accent Underline */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 via-orange-400 to-transparent rounded-full opacity-80" />
                    </div>
                </motion.div>

                {/* KPI 2: UGC - User Generated Content (Purple / Violet Neon Glow) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className="relative group rounded-xl p-3.5 border border-orange-500/25 glass-panel-heavy overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition duration-300"
                >
                    {/* Compact Glow aura */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-500/20 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/30 transition" />

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-body font-bold text-orange-300 uppercase tracking-wider truncate">
                                UGC (Ingresos / Videos)
                            </span>
                            <div className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center border border-orange-500/40 text-orange-300 flex-shrink-0">
                                <Zap className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 pt-0.5">
                            <div className="text-2xl font-black text-white tracking-tight font-heading drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)]">
                                ${song.ugcRevenue.toFixed(2)}
                            </div>
                            <p className="text-[9px] text-orange-200/70 font-body text-right truncate">
                                {song.ugcVideosCount} videos creados
                            </p>
                        </div>

                        {/* Glowing Accent Underline */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 via-pink-400 to-transparent rounded-full opacity-80" />
                    </div>
                </motion.div>

                {/* KPI 3: ePMR - Effective Pay Per Mille (Cyan / Teal Neon Glow) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="relative group rounded-xl p-3.5 border border-cyan-500/25 glass-panel-heavy overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition duration-300"
                >
                    {/* Compact Glow aura */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/30 transition" />

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider truncate">
                                ePMR (Pay Per Mille)
                            </span>
                            <div className="w-6 h-6 rounded-md bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40 text-cyan-300 flex-shrink-0">
                                <TrendingUp className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 pt-0.5">
                            <div className="text-2xl font-black text-white tracking-tight font-heading drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]">
                                ${song.epmr.toFixed(2)}
                            </div>
                            <p className="text-[9px] text-cyan-200/70 font-body text-right truncate">
                                Efectiva / 1k repros
                            </p>
                        </div>

                        {/* Glowing Accent Underline */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 via-orange-400 to-transparent rounded-full opacity-80" />
                    </div>
                </motion.div>

                {/* KPI 4: Track-to-Profile Rate (Rose / Magenta Neon Glow) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25, duration: 0.35 }}
                    className="relative group rounded-xl p-3.5 border border-pink-500/25 glass-panel-heavy overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition duration-300"
                >
                    {/* Compact Glow aura */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-500/20 rounded-full blur-xl pointer-events-none group-hover:bg-pink-500/30 transition" />

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono font-bold text-pink-300 uppercase tracking-wider truncate">
                                Track-to-Profile
                            </span>
                            <div className="w-6 h-6 rounded-md bg-pink-500/20 flex items-center justify-center border border-pink-500/40 text-pink-300 flex-shrink-0">
                                <Sparkles className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 pt-0.5">
                            <div className="text-2xl font-black text-white tracking-tight font-heading drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)]">
                                {song.trackToProfileRate}%
                            </div>
                            <p className="text-[9px] text-pink-200/70 font-body text-right truncate">
                                Conversión Fan Directo
                            </p>
                        </div>

                        {/* Glowing Accent Underline */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 via-rose-400 to-transparent rounded-full opacity-80" />
                    </div>
                </motion.div>

            </div>


            {/* ----------------------------------------------------------------- */}
            {/* 3. THREE ANALYTICS CHARTS FOR THE SONG */}
            {/* ----------------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

                {/* CHART 1: Ganancias Generadas por Plataforma (Line Chart) */}
                <div className="rounded-2xl border border-white/10 glass-panel p-5 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Ganancias por Plataforma
                            </h3>
                            <span className="text-[10px] font-mono text-neutral-400">(k USD)</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-body leading-tight">
                             Evolución mensual de ingresos distribuidos por plataforma.
                        </p>
                    </div>

                    <div className="h-52 w-full select-none pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={song.platformEarnings} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="#777" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#777" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                                <RechartsTooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(10, 10, 10, 0.95)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        borderRadius: "10px",
                                        fontSize: "11px",
                                        color: "#fff",
                                    }}
                                />
                                <Line type="monotone" dataKey="Spotify" stroke="#1db954" strokeWidth={2.5} dot={false} />
                                <Line type="monotone" dataKey="AppleMusic" stroke="#fa2d48" strokeWidth={2.5} dot={false} />
                                <Line type="monotone" dataKey="YouTube" stroke="#ff0000" strokeWidth={2.5} dot={false} />
                                <Line type="monotone" dataKey="TikTok" stroke="#00f2fe" strokeWidth={2.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#1db954]" /> Spotify
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#fa2d48]" /> Apple Music
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#ff0000]" /> YouTube
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#00f2fe]" /> TikTok
                        </span>
                    </div>
                </div>

                {/* CHART 2: Curva de Retención y Abandono (Audio Retention Chart) */}
                <div className="rounded-2xl border border-white/10 glass-panel p-5 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                Curva de Retención
                            </h3>
                            <span className="text-[10px] font-mono text-neutral-400">% Oyentes</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-body leading-tight">
                             Retención de audiencia a lo largo del tiempo de reproducción.
                        </p>
                    </div>

                    <div className="h-52 w-full select-none pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={song.retentionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="time" stroke="#777" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#777" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                <RechartsTooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(10, 10, 10, 0.95)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        borderRadius: "10px",
                                        fontSize: "11px",
                                        color: "#fff",
                                    }}
                                    formatter={(val: any) => [`${val}%`, "Oyentes Activos"]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="listeners"
                                    stroke="#c084fc"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRetention)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                        <span>Inicio: 100%</span>
                        <span className="text-purple-300 font-bold">Gancho Alto @ 1:30</span>
                        <span>Final: {song.retentionData[song.retentionData.length - 1]?.listeners}%</span>
                    </div>
                </div>

                {/* CHART 3: Radar de Compromiso del Fan (Engagement Scorecard) */}
                <div className="rounded-2xl border border-white/10 glass-panel p-5 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                Radar de Engagement
                            </h3>
                            <span className="text-[10px] font-mono text-cyan-400 font-bold">Scorecard</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-body leading-tight">
                             Gráfico de Araña con 6 métricas clave de engagement.
                        </p>
                    </div>

                    <div className="h-52 w-full select-none flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={song.radarData}>
                                <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                                <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" fontSize={8} tick={{ fill: "#a3a3a3" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="transparent" />
                                <Radar
                                    name={song.titleSong}
                                    dataKey="value"
                                    stroke="#06b6d4"
                                    fill="#06b6d4"
                                    fillOpacity={0.45}
                                    strokeWidth={2}
                                />
                                <RechartsTooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(10, 10, 10, 0.95)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        borderRadius: "10px",
                                        fontSize: "11px",
                                        color: "#fff",
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pt-2 border-t border-white/5">
                        <span>Engagement Global:</span>
                        <span className="font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                            {Math.round(song.radarData.reduce((acc, curr) => acc + curr.value, 0) / song.radarData.length)} / 100
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
}

// Simple Bookmark helper icon
function BookmarkIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
    );
}
