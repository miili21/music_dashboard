import { useMemo, useState } from "react";
import { Album } from "../data/albums";
import { Artist } from "../data/artists";
import { songs, Song } from "../data/songs";
import {
    Disc,
    Play,
    Pause,
    Music,
} from "lucide-react";

interface AlbumSongsSidebarProps {
    album: Album;
    artist: Artist;
    language: "es" | "en";
    allArtistAlbums?: Album[];
    onSelectAlbum?: (albumId: number) => void;
    onSelectSong?: (song: Song) => void;
}

export default function AlbumSongsSidebar({
    album,
    artist,
    language,
    allArtistAlbums = [],
    onSelectAlbum,
    onSelectSong
}: AlbumSongsSidebarProps) {
    const [playingSongId, setPlayingSongId] = useState<number | null>(null);

    // Filter songs belonging to this album
    const albumSongs = useMemo(() => {
        return songs.filter((s) => s.albumId === album.id);
    }, [album.id]);

    const handlePlayToggle = (song: Song) => {
        if (playingSongId === song.id) {
            setPlayingSongId(null);
        } else {
            setPlayingSongId(song.id);
        }
        onSelectSong?.(song);
    };

    const t = {
        es: {
            headerTitle: "Canciones del Álbum",
            tracksCount: "pistas",
            switchAlbum: "Cambiar Álbum",
            noSongs: "No hay canciones registradas para este álbum.",
        },
        en: {
            headerTitle: "Album Songs",
            tracksCount: "tracks",
            switchAlbum: "Switch Album",
            noSongs: "No songs registered for this album.",
        },
    }[language];

    return (
        <div className="rounded-3xl border border-white/10 glass-panel p-5 shadow-2xl space-y-5 relative overflow-hidden select-none">

            {/* Background Subtle Gradient Glow matching album disc color */}
            <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: album.discColor || "#a855f7" }}
            ></div>

            {/* HEADER: Album Header with Thumbnail & Title */}
            <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20 flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        {t.headerTitle}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                        {album.year}
                    </span>
                </div>

                {/* Selected Album Selector Card */}
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-950/60 border border-white/10 relative group">
                    {/* Cover thumbnail with spinning vinyl on hover */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                            src={album.coverUrl}
                            alt={album.titleAlbum}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <Disc className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "6s" }} />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-extrabold text-white truncate italic font-sans">
                            {album.titleAlbum}
                        </h3>
                        <p className="text-[11px] text-neutral-400 truncate">
                            {artist.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-500/30">
                                {albumSongs.length} {t.tracksCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Other Albums Quick Selector Tabs if multiple albums exist */}
                {allArtistAlbums.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase flex-shrink-0">
                            {t.switchAlbum}:
                        </span>
                        {allArtistAlbums.map((al) => (
                            <button
                                key={al.id}
                                onClick={() => onSelectAlbum?.(al.id)}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition flex-shrink-0 ${al.id === album.id
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {al.titleAlbum}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* TRACKLIST SECTION */}
            <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400 px-1">
                <span># &bull; {language === "es" ? "Título de la Canción" : "Song Title"}</span>
                </div>

                <div className="space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                    {albumSongs.length === 0 ? (
                        <div className="text-center py-8 text-xs text-neutral-500 italic font-mono">
                            {t.noSongs}
                        </div>
                    ) : (
                        albumSongs.map((song, index) => {
                            const isPlaying = playingSongId === song.id;
                            return (
                                <div
                                    key={song.id}
                                    onClick={() => handlePlayToggle(song)}
                                    className={`group flex items-center justify-between p-2.5 rounded-xl border transition duration-200 cursor-pointer ${isPlaying
                                            ? "bg-purple-950/50 border-purple-500/40 text-white shadow-lg shadow-purple-950/50"
                                            : "bg-neutral-950/40 border-white/5 hover:bg-neutral-900/80 hover:border-white/15 text-neutral-300"
                                        }`}
                                >
        <div className="space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                                        {/* Index or Play Icon */}
                                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-neutral-500 group-hover:text-purple-400">
                                            {isPlaying ? (
                                                <Pause className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                                            ) : (
                                                <span className="group-hover:hidden">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            )}
                                            {!isPlaying && (
                                                <Play className="w-3.5 h-3.5 hidden group-hover:block text-purple-400" />
                                            )}
                                        </div>

                                        {/* Small cover */}
                                        <img
                                            src={song.coverUrl}
                                            alt={song.titleSong}
                                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/10"
                                            referrerPolicy="no-referrer"
                                        />
                                        {/* Title */}
                                            <div className="min-w-0 flex-1">
                                            <h4 className={`text-xs font-bold truncate ${isPlaying ? "text-purple-300" : "text-white"}`}>
                                                {song.titleSong}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}