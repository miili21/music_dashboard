import { Heart, Globe, Disc, Music, User, Flame, Clock, Languages } from "lucide-react";
import { artists } from "../data/artists";
import { useState } from "react";

interface LeftMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  recentlyViewed: number[];
  onSelectArtist: (id: number) => void;
  selectedArtistId: number;
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

export default function LeftMenu({
  activeTab,
  setActiveTab,
  favorites,
  toggleFavorite,
  recentlyViewed,
  onSelectArtist,
  selectedArtistId,
  language,
  setLanguage,
}: LeftMenuProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Get favorite artists objects
  const favoriteArtistsList = artists.filter((a) => favorites.includes(a.id));

  // Get recently viewed artists objects (excluding the current one or keeping it in order)
  const recentlyViewedArtistsList = artists.filter((a) => recentlyViewed.includes(a.id) && a.id !== selectedArtistId).slice(0, 3);

  // Translations dictionary for Left Menu headers
  const t = {
    en: {
      library: "Library",
      artist: "Artist",
      songs: "Songs",
      albums: "Albums",
      myFavs: "My favs",
      recently: "Recently",
      lang: "Language",
    },
    es: {
      library: "Biblioteca",
      artist: "Artista",
      songs: "Canciones",
      albums: "Álbumes",
      myFavs: "Mis favoritos",
      recently: "Recientes",
      lang: "Idioma",
    }
  }[language];

  return (
    <div className="flex flex-col justify-between py-6 px-4 w-44 h-[85vh] rounded-[32px] border border-white/10 glass-panel shadow-[0_8px_32px_0_rgba(0,0,0,0.55)] select-none">
      
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-linear-to-tr from-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-[10px] font-black tracking-tighter">PC</span>
          </div>
          <span className="text-white text-xs font-extrabold tracking-widest font-mono">POWER</span>
        </div>

        {/* 1. LIBRARY CATEGORY */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 block">
            {t.library}
          </span>
          
          <div className="space-y-1">
            {/* Artist Tab */}
            <button
              onClick={() => setActiveTab("artist")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition duration-300 ${
                activeTab === "artist"
                  ? "bg-linear-to-r from-pink-500/20 to-orange-500/20 text-white border border-pink-500/30 shadow-[0_0_12px_rgba(236,72,153,0.15)] font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
              id="menu-tab-artist"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.artist}</span>
            </button>

            {/* Songs Tab */}
            <button
              onClick={() => setActiveTab("songs")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition duration-300 ${
                activeTab === "songs"
                  ? "bg-linear-to-r from-pink-500/20 to-orange-500/20 text-white border border-pink-500/30 shadow-[0_0_12px_rgba(236,72,153,0.15)] font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
              id="menu-tab-songs"
            >
              <Music className="w-3.5 h-3.5" />
              <span>{t.songs}</span>
            </button>

            {/* Albums Tab */}
            <button
              onClick={() => setActiveTab("albums")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition duration-300 ${
                activeTab === "albums"
                  ? "bg-linear-to-r from-pink-500/20 to-orange-500/20 text-white border border-pink-500/30 shadow-[0_0_12px_rgba(236,72,153,0.15)] font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
              id="menu-tab-albums"
            >
              <Disc className="w-3.5 h-3.5" />
              <span>{t.albums}</span>
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-px bg-white/5 mx-2"></div>

        {/* 2. MY FAVS */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 block items-center justify-between">
            <span>{t.myFavs}</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500/20" />
          </span>

          <div className="space-y-1 max-h-[100px] overflow-y-auto custom-scrollbar">
            {favoriteArtistsList.length === 0 ? (
              <span className="text-[9px] text-neutral-600 block px-2 italic">None yet</span>
            ) : (
              favoriteArtistsList.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onSelectArtist(a.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg text-[11px] text-left transition ${
                    selectedArtistId === a.id
                      ? "text-pink-400 font-bold bg-white/3"
                      : "text-neutral-400 hover:text-white hover:bg-white/2"
                  }`}
                  title={a.name}
                >
                  <img src={a.avatarUrl} className="w-4 h-4 rounded-full object-cover" />
                  <span className="truncate">{a.name.split(" ")[0]}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* 3. RECENTLY VIEWED */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 block items-center justify-between">
            <span>{t.recently}</span>
            <Clock className="w-3 h-3 text-neutral-500" />
          </span>

          <div className="space-y-1 max-h-[100px] overflow-y-auto custom-scrollbar">
            {recentlyViewedArtistsList.length === 0 ? (
              <span className="text-[9px] text-neutral-600 block px-2 italic">None yet</span>
            ) : (
              recentlyViewedArtistsList.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onSelectArtist(a.id)}
                  className="w-full flex items-center gap-2 px-2 py-1 rounded-lg text-[11px] text-left text-neutral-400 hover:text-white transition"
                  title={a.name}
                >
                  <img src={a.avatarUrl} className="w-4 h-4 rounded-full object-cover" />
                  <span className="truncate">{a.name.split(" ")[0]}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Language Trigger bottom */}
      <div className="relative pt-4 border-t border-white/5">
        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition"
          title="Switch Language"
          id="lang-selector-btn"
        >
          <Globe className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold">
            {language === "en" ? "EN" : "ES"}
          </span>
        </button>

        {/* Dropdown Languages list */}
        {showLangMenu && (
          <div className="absolute bottom-12 left-0 w-full bg-neutral-950 border border-white/10 rounded-xl p-1 shadow-2xl z-50 text-xs">
            <button
              onClick={() => {
                setLanguage("en");
                setShowLangMenu(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition flex items-center justify-between ${
                language === "en" ? "text-pink-500 font-bold" : "text-neutral-400"
              }`}
            >
              <span>English</span>
              {language === "en" && <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>}
            </button>
            <button
              onClick={() => {
                setLanguage("es");
                setShowLangMenu(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition flex items-center justify-between ${
                language === "es" ? "text-pink-500 font-bold" : "text-neutral-400"
              }`}
            >
              <span>Español</span>
              {language === "es" && <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
