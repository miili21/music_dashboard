import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Song, songs } from "../data/songs";
import { Album, albums } from "../data/albums";
import { Artist, artists } from "../data/artists";
import { Music, Play, ChevronRight, Filter, Sparkles, Disc } from "lucide-react";

interface SongsOverviewProps {
    onSelectSong: (songId: number) => void;
    onPlaySong?: (song: Song) => void;
    language?: "es" | "en";
    currentArtistId?: number;
}

export default function SongsOverview({
    onSelectSong,
    onPlaySong,
    language = "es",
    currentArtistId,
}: SongsOverviewProps) {
    // State filters
    const [selectedArtistFilter, setSelectedArtistFilter] = useState<number | "all">(currentArtistId || "all");
    const [selectedAlbumFilter, setSelectedAlbumFilter] = useState<number | "all">("all");
    const [sortBy, setSortBy] = useState<"views_desc" | "views_asc">("views_desc");

    // Translations
    const t = {
        es: {
            title: "Catálogo de Canciones",
            subtitle: "Explora y selecciona cualquier canción por álbum para analizar su retención, engagement y rendimiento en plataformas.",
            filterArtist: "Artista:",
            filterAlbum: "Álbum:",
            sortBy: "Ordenar por:",
            allArtists: "Todos los Artistas",
            allAlbums: "Todos los Álbumes",
            viewsDesc: "Más Vistas",
            viewsAsc: "Menos Vistas",
            tracksInAlbum: "canciones en este álbum",
            viewProfile: "Ver Perfil de Canción",
            totalViewsLabel: "Vistas Totales",
        },
        en: {
            title: "Songs Catalog",
            subtitle: "Browse and select any track by album to analyze retention, engagement, and platform performance.",
            filterArtist: "Artist:",
            filterAlbum: "Album:",
            sortBy: "Sort by:",
            allArtists: "All Artists",
            allAlbums: "All Albums",
            viewsDesc: "Most Views",
            viewsAsc: "Least Views",
            tracksInAlbum: "tracks in this album",
            viewProfile: "View Song Profile",
            totalViewsLabel: "Total Views",
        },
    }[language];

    // Options available for the album filter based ON strictly selected artist
    const availableAlbumsForFilter = useMemo(() => {
        if (selectedArtistFilter === "all") return albums;
        return albums.filter((al) => al.artistId === selectedArtistFilter);
    }, [selectedArtistFilter]);

    // Filtered albums list for rendering
    const filteredAlbums = useMemo(() => {
        let result = availableAlbumsForFilter;
        if (selectedAlbumFilter !== "all") {
            result = result.filter((al) => al.id === selectedAlbumFilter);
        }
        return result;
    }, [availableAlbumsForFilter, selectedAlbumFilter]);

    // Handle Artist change safely
    const handleArtistChange = (val: number | "all") => {
        setSelectedArtistFilter(val);
        setSelectedAlbumFilter("all"); // Reset album selection to avoid empty states
    };

    return (
        <div className="w-full space-y-6 pb-16" id="songs-overview-container">

            {/* 1. HEADER BANNER */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 glass-panel p-4 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                                <Music className="w-4 h-4 text-pink-500" />
                            </div>
                            <h1 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-wide">
                                {t.title}
                            </h1>
                        </div>
                        <p className="text-xs text-neutral-400 max-w-xl font-body">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-white/80 bg-black/40 px-3.5 py-2 rounded-2xl border border-white/10 self-start md:self-auto">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span>{songs.length} Canciones Disponibles</span>
                    </div>
                </div>

                {/* FILTERS AND SORT BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 relative z-10 text-xs font-mono">

                    {/* Left Side: Artist and Album Dropdowns */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-white/10">
                            <span className="text-neutral-500">{t.filterArtist}</span>
                            <select
                                value={selectedArtistFilter}
                                onChange={(e) => {
                                    const val = e.target.value === "all" ? "all" : Number(e.target.value);
                                    handleArtistChange(val);
                                }}
                                className="bg-transparent text-white outline-none cursor-pointer font-bold"
                            >
                                <option value="all" className="bg-neutral-900 text-white">{t.allArtists}</option>
                                {artists.map((a) => (
                                    <option key={a.id} value={a.id} className="bg-neutral-900 text-white">
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-white/10">
                            <span className="text-neutral-500">{t.filterAlbum}</span>
                            <select
                                value={selectedAlbumFilter}
                                onChange={(e) => setSelectedAlbumFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
                                className="bg-transparent text-white outline-none cursor-pointer font-bold max-w-[160px] truncate"
                            >
                                <option value="all" className="bg-neutral-900 text-white">{t.allAlbums}</option>
                                {availableAlbumsForFilter.map((al) => (
                                    <option key={al.id} value={al.id} className="bg-neutral-900 text-white">
                                        {al.titleAlbum}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Side: Sorting Dropdown */}
                    <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-white/10 ml-auto sm:ml-0">
                        <Filter className="w-3.5 h-3.5 text-pink-400" />
                        <span className="text-neutral-500">{t.sortBy}</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as "views_desc" | "views_asc")}
                            className="bg-transparent text-pink-400 font-bold outline-none cursor-pointer"
                        >
                            <option value="views_desc" className="bg-neutral-900 text-white">{t.viewsDesc}</option>
                            <option value="views_asc" className="bg-neutral-900 text-white">{t.viewsAsc}</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* 2. ALBUMS AND SONGS CATALOG GRID */}
            <div className="space-y-8">
                {filteredAlbums.map((album) => {
                    const albumArtist = artists.find((a) => a.id === album.artistId) || artists[0];
                    const albumSongs = songs.filter((s) => s.albumId === album.id);
                    
                    const sortedSongs = [...albumSongs].sort((a, b) => {
                        if (sortBy === "views_asc") return a.totalViews - b.totalViews;
                        return b.totalViews - a.totalViews;
                    });

                    if (sortedSongs.length === 0) return null;

                    return (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-3xl border border-white/10 glass-panel p-6 shadow-xl space-y-5 relative overflow-hidden"
                        >
                            {/* ALBUM HEADER SECTION */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shadow-md flex-shrink-0">
                                        <img src={album.coverUrl} alt={album.titleAlbum} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest font-mono">
                                                {albumArtist.name}
                                            </span>
                                            <span className="text-[10px] text-neutral-500 font-mono">&bull; {album.year}</span>
                                        </div>
                                        <h2 className="text-lg font-heading font-bold text-white tracking-tight">
                                            {album.titleAlbum}
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                                    <Disc className="w-4 h-4 text-purple-400" />
                                    <span>{albumSongs.length} {t.tracksInAlbum}</span>
                                </div>
                            </div>

                            {/* SONGS GRID FOR THIS ALBUM */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {sortedSongs.map((song) => (
                                    <motion.div
                                        key={song.id}
                                        whileHover={{ scale: 1.01, y: -2 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => onSelectSong(song.id)}
                                        className="group relative rounded-2xl border border-white/10 bg-neutral-900/60 hover:bg-neutral-900/95 p-4 transition duration-300 cursor-pointer shadow-md hover:shadow-2xl overflow-hidden flex flex-col justify-between"
                                        style={{
                                            borderColor: `${song.cardColor}40`,
                                        }}
                                    >
                                        {/* Hover Glow Effect using card color */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-15 transition duration-500 pointer-events-none"
                                            style={{ backgroundColor: song.cardColor }}
                                        />

                                        {/* TOP HALF: Song Info & Artwork */}
                                        <div className="flex items-start gap-3.5 relative z-10 mb-3">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 group-hover:border-white/40 transition">
                                                <img src={song.coverUrl} alt={song.titleSong} className="w-full h-full object-cover" />
                                                {/* Play button overlay */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onPlaySong) onPlaySong(song);
                                                    }}
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow">
                                                        <Play className="w-4 h-4 fill-black translate-x-0.5" />
                                                    </div>
                                                </button>
                                            </div>

                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="text-base font-subtitle font-bold text-white truncate group-hover:text-pink-300 transition">
                                                        {song.titleSong}
                                                    </h3>
                                                    <span className="text-[10px] font-mono font-bold text-neutral-400 bg-black/40 px-2 py-0.5 rounded border border-white/10 flex-shrink-0">
                                                        {song.likesFormatted} likes
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                                                    <span className="text-neutral-300 font-bold">{(song.totalViews / 1000000).toFixed(0)}M vistas</span>
                                                    <span>&bull;</span>
                                                    <span className="text-emerald-400 font-bold">${(song.kpis.earnings / 1000000).toFixed(1)}M</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BOTTOM: ACTION BUTTON */}
                                        <div className="pt-2 border-t border-white/5 flex items-center justify-between relative z-10">
                                            <span className="text-[10px] font-mono text-neutral-500">
                                                {albumArtist.name} &bull; {song.year}
                                            </span>

                                            <div className="flex items-center gap-1 text-xs font-mono font-bold text-pink-400 group-hover:text-pink-300 transition">
                                                <span>{t.viewProfile}</span>
                                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-300" />
                                            </div>
                                        </div>

                                    </motion.div>
                                ))}
                            </div>

                        </motion.div>
                    );
                })}
            </div>

        </div>
    );
}