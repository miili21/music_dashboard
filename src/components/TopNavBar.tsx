import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Clock, 
  User, 
  Disc, 
  Music, 
  Search, 
  X, 
  ChevronRight, 
  Home, 
  Globe, 
  Sparkles,
  Check
} from "lucide-react";
import { Artist, artists } from "../data/artists";
import { Album } from "../data/albums";
import { Song } from "../data/songs";

export type ViewMode = "dashboard" | "artist" | "songs" | "song_detail" | "albums" | "album_detail";

interface TopNavBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentArtist: Artist;
  currentAlbum?: Album;
  currentSong?: Song;
  searchQuery: string;
  onSearch: (query: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  recentlyViewed: number[];
  onSelectArtist: (id: number) => void;
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

export default function TopNavBar({
  viewMode,
  setViewMode,
  currentArtist,
  currentAlbum,
  currentSong,
  searchQuery,
  onSearch,
  favorites,
  toggleFavorite,
  recentlyViewed,
  onSelectArtist,
  language,
  setLanguage,
}: TopNavBarProps) {
  const [openPopover, setOpenPopover] = useState<"favorites" | "recents" | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter favorite artists objects
  const favoriteArtistsList = artists.filter((a) => favorites.includes(a.id));
  
  // Filter recently viewed artists objects
  const recentlyViewedArtistsList = artists.filter((a) => recentlyViewed.includes(a.id));

  // Determine if we are in a detail view (artist, albums, album_detail, songs, song_detail)
  const isDetailView = viewMode !== "dashboard";

  // Translations
  const t = {
    es: {
      home: "Inicio",
      dashboard: "Panel General",
      artist: "Artista",
      albums: "Álbumes",
      songs: "Canciones",
      searchPlaceholder: "Buscar artista, álbum o canción...",
      favsTitle: "Mis Favoritos",
      recentsTitle: "Vistos Recientemente",
      noFavs: "No tienes artistas en favoritos",
      noRecents: "Sin historial reciente",
    },
    en: {
      home: "Home",
      dashboard: "Dashboard",
      artist: "Artist",
      albums: "Albums",
      songs: "Songs",
      searchPlaceholder: "Search artist, album or track...",
      favsTitle: "My Favorites",
      recentsTitle: "Recently Viewed",
      noFavs: "No favorite artists added",
      noRecents: "No recent history",
    },
  }[language];

  // Active tab helper
  const isArtistActive = viewMode === "artist";
  const isAlbumsActive = viewMode === "albums" || viewMode === "album_detail";
  const isSongsActive = viewMode === "songs" || viewMode === "song_detail";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#060606]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3" ref={popoverRef}>
        
        {/* ROW 1 (or Left Section): BRAND + UBICACIÓN / BREADCRUMB */}
        <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto flex-shrink-0">
          
          {/* Brand Mark */}
          <button 
            onClick={() => setViewMode("dashboard")}
            className="flex items-center gap-2 group flex-shrink-0 focus:outline-none"
            title="Ir al Inicio"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
              <span className="text-white text-[10px] font-black tracking-tighter">PC</span>
            </div>
            <span className="text-white text-xs font-extrabold tracking-widest font-mono hidden sm:inline-block">
              POWER
            </span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* 1. UBICACIÓN / CONTEXTO DE LA PÁGINA (BREADCRUMB) */}
          <nav className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 overflow-x-auto custom-scrollbar py-0.5 max-w-[280px] sm:max-w-md">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`flex items-center gap-1 hover:text-white transition font-bold uppercase tracking-wider flex-shrink-0 ${
                viewMode === "dashboard" ? "text-pink-400" : "text-neutral-400"
              }`}
            >
              <Home className="w-3.5 h-3.5 text-pink-500" />
              <span>{t.home}</span>
            </button>

            {viewMode !== "dashboard" && (
              <>
                <ChevronRight className="w-3 h-3 text-neutral-600 flex-shrink-0" />

                {viewMode === "artist" && (
                  <span className="text-pink-400 font-bold uppercase truncate max-w-[120px]">
                    {currentArtist.name}
                  </span>
                )}

                {viewMode === "albums" && (
                  <span className="text-pink-400 font-bold uppercase">
                    {t.albums}
                  </span>
                )}

                {viewMode === "album_detail" && (
                  <>
                    <button
                      onClick={() => setViewMode("albums")}
                      className="hover:text-white transition uppercase text-neutral-400 flex-shrink-0"
                    >
                      {t.albums}
                    </button>
                    <ChevronRight className="w-3 h-3 text-neutral-600 flex-shrink-0" />
                    <span className="text-pink-400 font-bold uppercase truncate max-w-[120px]">
                      {currentAlbum?.titleAlbum || "Álbum"}
                    </span>
                  </>
                )}

                {viewMode === "songs" && (
                  <span className="text-pink-400 font-bold uppercase">
                    {t.songs}
                  </span>
                )}

                {viewMode === "song_detail" && (
                  <>
                    <button
                      onClick={() => setViewMode("songs")}
                      className="hover:text-white transition uppercase text-neutral-400 flex-shrink-0"
                    >
                      {t.songs}
                    </button>
                    <ChevronRight className="w-3 h-3 text-neutral-600 flex-shrink-0" />
                    <span className="text-pink-400 font-bold uppercase truncate max-w-[120px]">
                      {currentSong?.titleSong || "Canción"}
                    </span>
                  </>
                )}
              </>
            )}
          </nav>
        </div>

        {/* CENTER SECTION: BARRA DE BÚSQUEDA (SearchBar) */}
        <div className="w-full md:flex-1 max-w-md mx-auto md:mx-4">
          <div className="relative flex items-center w-full px-3 py-1.5 rounded-full border border-white/10 bg-neutral-900/80 shadow-inner focus-within:border-pink-500/50 transition duration-300">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent outline-none text-white placeholder-neutral-500 text-xs font-sans tracking-wide"
              id="top-nav-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="text-neutral-500 hover:text-white transition focus:outline-none ml-1.5"
                id="top-nav-search-clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: PESTAÑAS DE ENTIDADES (Condicional) + ACCESOS RÁPIDOS (Solo Iconos) */}
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto flex-shrink-0">
          
          {/* 3. NAVEGACIÓN POR ENTIDADES (PESTAÑAS: Artista, Álbumes, Canciones) */}
          {/* VISIBLE ONLY EN DETALLE (isDetailView === true), OCULTAS EN DASHBOARD GENERAL */}
          {isDetailView && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-full border border-white/10 shadow-lg text-xs font-mono"
            >
              <button
                onClick={() => setViewMode("artist")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition duration-300 ${
                  isArtistActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
                id="top-nav-tab-artist"
              >
                <User className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{t.artist}</span>
              </button>

              <button
                onClick={() => setViewMode("albums")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition duration-300 ${
                  isAlbumsActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
                id="top-nav-tab-albums"
              >
                <Disc className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{t.albums}</span>
              </button>

              <button
                onClick={() => setViewMode("songs")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition duration-300 ${
                  isSongsActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
                id="top-nav-tab-songs"
              >
                <Music className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{t.songs}</span>
              </button>
            </motion.div>
          )}

          {/* 4. ACCESOS RÁPIDOS (SOLO ICONOS: Favoritos, Recientes, Idioma) */}
          <div className="flex items-center gap-1.5 relative">
            
            {/* ICONO FAVORITOS */}
            <div className="relative">
              <button
                onClick={() => setOpenPopover(openPopover === "favorites" ? null : "favorites")}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition duration-300 relative ${
                  openPopover === "favorites"
                    ? "bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    : "bg-neutral-900 border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
                }`}
                title={t.favsTitle}
                id="quick-access-favorites-btn"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-pink-500 text-pink-500" : ""}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center font-mono shadow">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Popover Favoritos */}
              <AnimatePresence>
                {openPopover === "favorites" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-neutral-950 border border-white/10 rounded-2xl p-3 shadow-2xl z-50 space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-pink-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                        <Heart className="w-3 h-3 fill-pink-500" />
                        <span>{t.favsTitle}</span>
                      </span>
                      <span className="text-[10px] text-neutral-500">{favoriteArtistsList.length}</span>
                    </div>

                    <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar">
                      {favoriteArtistsList.length === 0 ? (
                        <p className="text-[11px] text-neutral-500 py-3 text-center italic">{t.noFavs}</p>
                      ) : (
                        favoriteArtistsList.map((artist) => (
                          <div
                            key={artist.id}
                            className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition group cursor-pointer"
                            onClick={() => {
                              onSelectArtist(artist.id);
                              setViewMode("artist");
                              setOpenPopover(null);
                            }}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <img src={artist.avatarUrl} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                              <span className="text-white text-xs truncate font-sans font-medium">{artist.name}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(artist.id);
                              }}
                              className="p-1 text-pink-500 hover:text-neutral-400 transition"
                              title="Remover de favoritos"
                            >
                              <Heart className="w-3.5 h-3.5 fill-pink-500" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ICONO RECIENTES */}
            <div className="relative">
              <button
                onClick={() => setOpenPopover(openPopover === "recents" ? null : "recents")}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition duration-300 relative ${
                  openPopover === "recents"
                    ? "bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                    : "bg-neutral-900 border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
                }`}
                title={t.recentsTitle}
                id="quick-access-recents-btn"
              >
                <Clock className="w-4 h-4 text-purple-400" />
              </button>

              {/* Popover Recientes */}
              <AnimatePresence>
                {openPopover === "recents" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-neutral-950 border border-white/10 rounded-2xl p-3 shadow-2xl z-50 space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-purple-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span>{t.recentsTitle}</span>
                      </span>
                    </div>

                    <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar">
                      {recentlyViewedArtistsList.length === 0 ? (
                        <p className="text-[11px] text-neutral-500 py-3 text-center italic">{t.noRecents}</p>
                      ) : (
                        recentlyViewedArtistsList.map((artist) => (
                          <div
                            key={artist.id}
                            className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition cursor-pointer"
                            onClick={() => {
                              onSelectArtist(artist.id);
                              setViewMode("artist");
                              setOpenPopover(null);
                            }}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <img src={artist.avatarUrl} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                              <span className="text-white text-xs truncate font-sans font-medium">{artist.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTÓN CAMBIO DE IDIOMA (ES / EN) */}
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="px-2 py-1 rounded-full bg-neutral-900 border border-white/10 text-[10px] font-mono text-pink-400 font-bold hover:border-pink-500/40 transition"
              title="Cambiar idioma / Switch language"
            >
              {language.toUpperCase()}
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}
