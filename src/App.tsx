"use client";



/**

 * @license

 * SPDX-License-Identifier: Apache-2.0

 */

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import TopNavBar from "./components/TopNavBar";
import TopCloudAlbums from "./components/TopCloudAlbums";
import TopArtists from "./components/TopArtists";
import AnalyticsCharts from "./components/AnalyticsCharts";
import NewReleases from "./components/NewReleases";
import ArtistProfileView from "./components/ArtistProfileView";
import AlbumProfileView from "./components/AlbumProfileView";
import AlbumSongsSidebar from "./components/AlbumSongsSidebar";
import SongProfileView from "./components/SongProfileView";
import SongsOverview from "./components/SongsOverview";
import { artists, Artist } from "./data/artists";
import { songs, Song } from "./data/songs";
import { albums, Album } from "./data/albums";
import { AlertCircle, Trophy, Globe, Heart, Play, Pause, ChevronRight, Eye, Star, Info, User } from "lucide-react";

export default function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Navigation & View states
  const [viewMode, setViewMode] = useState<"dashboard" | "artist" | "songs" | "song_detail" | "albums" | "album_detail">("dashboard");
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null); // No artist selected by default
  const [selectedAlbumId, setSelectedAlbumId] = useState<number>(1); // Default to Album 1 (Short n' Sweet)
  const [selectedSongId, setSelectedSongId] = useState<number>(1); // Default to Song 1 (Espresso)
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"es" | "en">("es"); // Default to Spanish as requested/shown

  // User-specific states (favorites & recently viewed lists)
  const [favorites, setFavorites] = useState<number[]>([1, 2, 4, 8]); // Default initial favorites
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([3, 5, 6]);

  // Audio player mock indicator for the active artist
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll to dashboard
  const handleScrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to change artist and automatically track recently viewed & switch view to artist detail
  const handleSelectArtist = (id: number) => {
    setSelectedArtistId(id);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((x) => x !== id);
      return [id, ...filtered].slice(0, 5);
    });
    setViewMode("artist");
    setSearchQuery(""); // Clear search bar
  };

  // Helper to switch to detailed album view
  const handleSelectAlbum = (id: number) => {
    setSelectedAlbumId(id);
    const targetAlbum = albums.find((al) => al.id === id);
    if (targetAlbum) {
      setSelectedArtistId(targetAlbum.artistId);
    }
    setViewMode("album_detail");
    setSearchQuery(""); // Clear search bar
  };

  // Helper to switch to detailed song view
  const handleSelectSong = (id: number) => {
    setSelectedSongId(id);
    const targetSong = songs.find((s) => s.id === id);
    if (targetSong) {
      setSelectedArtistId(targetSong.artistId);
      setSelectedAlbumId(targetSong.albumId);
    }
    setViewMode("song_detail");
    setSearchQuery(""); // Clear search bar
  };

  // Add/remove favorite toggle
  const handleToggleFavorite = (id: number | null) => {
    if (!id) return;
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Live Search Filtering for Artists, Songs, and Albums
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matchedArtists = artists.filter((a) => a.name.toLowerCase().includes(query));
    const matchedSongs = songs.filter((s) => s.titleSong.toLowerCase().includes(query));
    const matchedAlbums = albums.filter((al) => al.titleAlbum.toLowerCase().includes(query));

    return {
      artists: matchedArtists,
      songs: matchedSongs,
      albums: matchedAlbums,
      hasResults: matchedArtists.length > 0 || matchedSongs.length > 0 || matchedAlbums.length > 0,
    };
  }, [searchQuery]);

  // Selected Artist complete object
  const currentArtist = useMemo(() => {
    if (!selectedArtistId) return null;
    return artists.find((a) => a.id === selectedArtistId) || null;
  }, [selectedArtistId]);

  // Get current artist's albums
  const currentArtistAlbums = useMemo(() => {
    if (!selectedArtistId) return albums;
    return albums.filter((al) => al.artistId === selectedArtistId);
  }, [selectedArtistId]);

  // Active selected album
  const activeAlbum = useMemo(() => {
    const found = albums.find((al) => al.id === selectedAlbumId);
    if (found && selectedArtistId && found.artistId === selectedArtistId) return found;
    return currentArtistAlbums[0] || albums[0];
  }, [currentArtistAlbums, selectedAlbumId, selectedArtistId]);

  // Get current artist's songs
  const currentArtistSongs = useMemo(() => {
    if (!selectedArtistId) return songs;
    return songs.filter((s) => s.artistId === selectedArtistId);
  }, [selectedArtistId]);

  // Active selected song
  const activeSong = useMemo(() => {
    return songs.find((s) => s.id === selectedSongId) || songs[0];
  }, [selectedSongId]);

  // Translation mapping for dashboard elements
  const t = {
    en: {
      breadcrumbHome: "Home",
      breadcrumbArtist: "Artist",
      breadcrumbDashboard: "Dashboard",
      rankedLive: "Ranked Live",
      keyMetrics: "Key Metrics",
      conversionRate: "Conversion Rate",
      subscriptionEarning: "Subscription Earning",
      netBenefits: "Net Benefits",
      topSongsTitle: "Top songs of the moment",
      top5Title: "Top 5 Artists of the Moment",
      newReleases: "New Releases",
      edition: "2026 Edition",
      searchHint: "Search artist, song, or album...",
      tracksTabHeader: "Detailed Track Analytics",
      albumsTabHeader: "Albums",
      pausePreview: "PAUSE PREVIEW",
      totalViews: "Total Views",
      earnings: "Earnings",
      roi: "ROI",
      cost: "Production Cost",
    },
    es: {
      breadcrumbHome: "Inicio",
      breadcrumbArtist: "Artista",
      breadcrumbDashboard: "Consola",
      rankedLive: "Clasificado en Vivo",
      keyMetrics: "Métricas Clave",
      conversionRate: "Conversión de Oyentes",
      subscriptionEarning: "Ingresos por Suscripción",
      netBenefits: "Beneficio Neto",
      topSongsTitle: "Canciones populares del momento",
      top5Title: "Los 5 mejores artistas del momento",
      newReleases: "Nuevos Lanzamientos",
      edition: "Edición 2026",
      searchHint: "Buscar artista, canción o álbum...",
      tracksTabHeader: "Análisis Detallado de Canciones",
      albumsTabHeader: "Álbumes",
      playPreview: "REPRODUCIR PREVIA",
      pausePreview: "PAUSAR PREVIA",
      totalViews: "Vistas Totales",
      earnings: "Ganancias",
      roi: "Retorno (ROI)",
      cost: "Costo de Producción",
    },
  }[language];

  // Sync menu active tab selection with our viewModes
  const handleMenuTabChange = (tab: string) => {
    if (tab === "artist") {
      setViewMode("artist");
    } else if (tab === "songs") {
      setViewMode("songs");
    } else if (tab === "albums") {
      setViewMode("albums");
    } else {
      setViewMode("dashboard");
    }
  };

  // Convert viewMode string back to LeftMenu tab identifier
  const activeMenuTab = useMemo(() => {
    if (viewMode === "artist") return "artist";
    if (viewMode === "songs" || viewMode === "song_detail") return "songs";
    if (viewMode === "albums" || viewMode === "album_detail") return "albums";
    return "";
  }, [viewMode]);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden text-white font-sans selection:bg-pink-500 selection:text-white">

      {/* SECTION 1: Welcome/Hero View - Visible exclusively on Dashboard Global */}
      {viewMode === "dashboard" && (
        <WelcomeScreen onExplore={handleScrollToDashboard} />
      )}

      {/* SECTION 2: Dashboard Container with Top Navigation Bar */}
      <div
        ref={dashboardRef}
        className="min-h-screen w-full relative bg-[#060606] flex flex-col items-center border-t border-white/5 pb-16"
      >
        {/* Sticky Top Navigation Bar spanning full width */}
        <TopNavBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentArtist={currentArtist}
          currentAlbum={activeAlbum}
          currentSong={activeSong}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          favorites={favorites}
          toggleFavorite={handleToggleFavorite}
          recentlyViewed={recentlyViewed}
          onSelectArtist={handleSelectArtist}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Glow ambient spots behind dashboard to replicate beautiful high contrast overlay glow */}
        <div className="absolute top-20 left-1/3 w-[30vw] h-[30vw] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-1/4 w-[30vw] h-[30vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>

        {/* Main Content Area Container */}
        <div className="max-w-7xl w-full px-3 sm:px-6 md:px-8 pt-6 relative z-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-20">

            {/* CENTRAL CONTENT CONTAINER */}
            <div className={`flex flex-col gap-6 transition-all duration-300 ${(viewMode === "songs" || viewMode === "song_detail") ? "lg:col-span-12" : "lg:col-span-9"}`}>

              {/* Live Search Overlay Results */}
              <AnimatePresence>
                {searchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full rounded-2xl border border-white/10 glass-panel-heavy p-5 shadow-2xl space-y-4 relative z-50"
                    id="search-results-panel"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400 border-b border-white/5 pb-2">
                      <span>Search results</span>
                      <span>Click to view profile</span>
                    </div>

                    {!searchResults.hasResults ? (
                      <div className="flex items-center gap-2 text-neutral-500 text-xs py-4 justify-center">
                        <AlertCircle className="w-4 h-4 text-pink-500" />
                        <span>No matching songs, albums, or artists found.</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Artists Results */}
                        {searchResults.artists.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-pink-500 uppercase tracking-widest font-mono">Artists</span>
                            <div className="space-y-1">
                              {searchResults.artists.map((a) => (
                                <button
                                  key={a.id}
                                  onClick={() => handleSelectArtist(a.id)}
                                  className="w-full flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.02] hover:bg-pink-500/10 border border-transparent hover:border-pink-500/20 text-xs text-left text-neutral-200 transition"
                                >
                                  <img src={a.avatarUrl} className="w-5 h-5 rounded-full object-cover" />
                                  <span className="truncate">{a.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Songs Results */}
                        {searchResults.songs.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest font-mono">Songs</span>
                            <div className="space-y-1">
                              {searchResults.songs.map((s) => (
                                <button
                                  key={s.id}
                                  onClick={() => handleSelectSong(s.id)}
                                  className="w-full flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.02] hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 text-xs text-left text-neutral-200 transition"
                                >
                                  <img src={s.coverUrl} className="w-5 h-5 rounded object-cover" />
                                  <span className="truncate">{s.titleSong}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Albums Results */}
                        {searchResults.albums.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-purple-500 uppercase tracking-widest font-mono">Albums</span>
                            <div className="space-y-1">
                              {searchResults.albums.map((al) => (
                                <button
                                  key={al.id}
                                  onClick={() => handleSelectAlbum(al.id)}
                                  className="w-full flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.02] hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 text-xs text-left text-neutral-200 transition"
                                >
                                  <img src={al.coverUrl} className="w-5 h-5 rounded object-cover" />
                                  <span className="truncate">{al.titleAlbum}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DYNAMIC CONTENT SWITCHER */}
              <AnimatePresence mode="wait">
                {/* VIEW 1: HOME/DASHBOARD VIEW */}
                {viewMode === "dashboard" && (
                  <motion.div
                    key="dashboard-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Top Cloud Album Logo ("cl" + Circles + "d" = CLOUD) */}
                    <TopCloudAlbums selectedId={selectedArtistId} onSelect={handleSelectArtist} />

                    {/* Carousel list of Top 5 Artists of the Moment */}
                    <div className="rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-lg p-6 shadow-2xl space-y-6">
                      <TopArtists selectedArtistId={selectedArtistId} onSelectArtist={handleSelectArtist} />

                      {/* Divider */}
                      <div className="h-px bg-white/5 w-full"></div>

                      {/* Detailed stats with key metrics */}
                      {currentArtist && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 flex items-center gap-1.5">
                              <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                              {t.keyMetrics}: {currentArtist.name}
                            </span>
                          </div>

                        </div>
                      )}
                    </div>

                    {/* General analytics trends */}
                    <AnalyticsCharts selectedArtistId={selectedArtistId} />
                  </motion.div>
                )}

                {/* VIEW 2: DETAILED ARTIST PROFILE VIEW (The second screen in mockups) */}
                {viewMode === "artist" && (
                  <motion.div
                    key="artist-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentArtist ? (
                      <ArtistProfileView
                        artist={currentArtist}
                        isFavorite={favorites.includes(currentArtist.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ) : (
                      <div className="text-center py-20 font-mono text-neutral-400">
                        <p className="text-lg font-bold mb-2">
                          {language === "es" ? "Sin artista seleccionado" : "No artist selected"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {language === "es"
                            ? "Selecciona un artista desde la consola principal o la búsqueda."
                            : "Select an artist from the main dashboard or search bar."}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* VIEW 3: SONGS OVERVIEW CATALOG */}
                {viewMode === "songs" && (
                  <motion.div
                    key="songs-overview-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SongsOverview
                      onSelectSong={handleSelectSong}
                      onPlaySong={() => setIsPlaying(true)}
                      language={language}
                      currentArtistId={selectedArtistId ?? undefined}
                    />
                  </motion.div>
                )}

                {/* VIEW 3.5: DETAILED SONG PROFILE VIEW */}
                {viewMode === "song_detail" && (
                  <motion.div
                    key="song-detail-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SongProfileView
                      song={activeSong}
                      onSelectSong={handleSelectSong}
                      onPlaySong={() => setIsPlaying(true)}
                      onBackToCatalog={() => setViewMode("songs")}
                      language={language}
                    />
                  </motion.div>
                )}

                {/* VIEW 4: DETAILED ALBUMS TAB */}
                {viewMode === "albums" && (
                  <motion.div
                    key="albums-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    <div className="rounded-3xl border border-white/10 glass-panel p-6 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <Trophy className="w-4 h-4 text-purple-500" />
                          </div>
                          <h2 className="text-lg font-bold text-white tracking-wide uppercase font-mono">
                            {t.albumsTabHeader}
                          </h2>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">
                          {currentArtist ? currentArtist.name : (language === "es" ? "Todos los álbumes" : "All albums")}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {currentArtistAlbums.map((album) => {
                          const isSelected = album.id === activeAlbum.id;
                          return (
                            <div
                              key={album.id}
                              onClick={() => setSelectedAlbumId(album.id)}
                              className={`p-4 rounded-2xl border transition duration-300 cursor-pointer space-y-4 ${isSelected
                                ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-950/20"
                                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/30"
                                }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <img src={album.coverUrl} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-sm font-bold text-white">{album.titleAlbum}</h4>
                                      {isSelected && (
                                        <span className="text-[9px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40 font-bold">
                                          {language === "es" ? "Seleccionado" : "Selected"}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-neutral-400 italic max-w-xs">{album.description}</p>
                                  </div>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="text-[9px] text-neutral-500 block uppercase">{t.roi}</span>
                                  <span className="text-sm font-black text-pink-500">{album.roi}%</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 font-mono text-center">
                                <div>
                                  <span className="text-[9px] text-neutral-500 block uppercase">{t.earnings}</span>
                                  <span className="text-xs font-bold text-neutral-200">${(album.revenue / 1000000).toFixed(1)}M</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-neutral-500 block uppercase">{t.cost}</span>
                                  <span className="text-xs font-bold text-neutral-400">${(album.productionCost / 1000000).toFixed(1)}M</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-neutral-500 block uppercase">Break Even</span>
                                  <span className="text-xs font-bold text-neutral-400">{album.breakEven.toLocaleString()} units</span>
                                </div>
                              </div>

                              <div className="flex justify-end pt-2 border-t border-white/5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectAlbum(album.id);
                                  }}
                                  className="text-[10px] font-mono font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
                                >
                                  <span>{language === "es" ? "Ver perfil del álbum" : "View album profile"}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* VIEW 5: ENRICHED DETAILED ALBUM VIEW */}
                {viewMode === "album_detail" && (
                  <motion.div
                    key="album-detail-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <AlbumProfileView
                      album={albums.find((a) => a.id === selectedAlbumId) || albums[0]}
                      language={language}
                      onSongSelect={(songId) => {
                        // Selecting a track can highlight or play
                        setIsPlaying(true);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AREA 3: STATIC RIGHT SIDEBAR / PORTRAIT COLUMN */}
            {viewMode !== "songs" && viewMode !== "song_detail" && (
              <div className="lg:col-span-3">
                {viewMode === "albums" ? (
                  /* Specialized side list for the Albums screen: Songs of the selected album */
                  <div className="sticky top-12">
                    <AlbumSongsSidebar
                      album={activeAlbum}
                      artist={currentArtist || artists[0]}
                      language={language}
                      allArtistAlbums={currentArtistAlbums}
                      onSelectAlbum={(id) => setSelectedAlbumId(id)}
                      onSelectSong={() => setIsPlaying(true)}
                    />
                  </div>
                ) : viewMode === "album_detail" ? (
                  /* If we are on detailed album view: render the static Big Album Cover on the right side of the screen */
                  <div className="hidden lg:block fixed top-0 right-0 h-screen w-[26vw] z-10 pointer-events-none overflow-hidden select-none">
                    {/* Horizontal black mask to blend photo cleanly into the middle content column */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-transparent to-transparent z-20"></div>
                    {/* Vertical black mask to blend photo cleanly into the bottom floor */}
                    <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>

                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedAlbumId}
                        src={(albums.find((a) => a.id === selectedAlbumId) || albums[0]).coverUrl}
                        alt={(albums.find((a) => a.id === selectedAlbumId) || albums[0]).titleAlbum}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.88, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                  </div>
                ) : viewMode !== "artist" ? (
                  /* If we are on general dashboard: render the scrollable list of new releases */
                  <div className="sticky top-12">
                    <NewReleases onSelectArtist={handleSelectArtist} selectedArtistId={selectedArtistId} />
                  </div>
                ) : currentArtist ? (
                  /* If we are on detailed artist view: render the static Big Artist Portrait (keeps fixed/static as requested) */
                  <div className="hidden lg:block fixed top-0 right-0 h-screen w-[26vw] z-10 pointer-events-none overflow-hidden select-none">
                    {/* Horizontal black mask to blend photo cleanly into the middle content column */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-transparent to-transparent z-20"></div>
                    {/* Vertical black mask to blend photo cleanly into the bottom floor */}
                    <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>

                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentArtist.id}
                        src={currentArtist.artistPhoto}
                        alt={currentArtist.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.88, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                  </div>
                ) : null}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
