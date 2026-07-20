"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import LeftMenu from "./components/LeftMenu";
import SearchBar from "./components/SearchBar";
import TopCloudAlbums from "./components/TopCloudAlbums";
import TopArtists from "./components/TopArtists";
import AnalyticsCharts from "./components/AnalyticsCharts";
import NewReleases from "./components/NewReleases";
import { artists } from "./data/artists";
import { songs } from "./data/songs";
import { albums } from "./data/albums";
import { AlertCircle, Trophy } from "lucide-react";

export default function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("favorites");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState<number>(1); // Default to Sabrina Carpenter (ID 1)

  // Scroll to dashboard smoothly
  const handleScrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Live Search Filtering for Artists, Songs, and Albums
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matchedArtists = artists.filter(a => a.name.toLowerCase().includes(query));
    const matchedSongs = songs.filter(s => s.titleSong.toLowerCase().includes(query));
    const matchedAlbums = albums.filter(al => al.titleAlbum.toLowerCase().includes(query));

    return {
      artists: matchedArtists,
      songs: matchedSongs,
      albums: matchedAlbums,
      hasResults: matchedArtists.length > 0 || matchedSongs.length > 0 || matchedAlbums.length > 0
    };
  }, [searchQuery]);

  // Selected Artist complete object
  const currentArtist = useMemo(() => {
    return artists.find(a => a.id === selectedArtistId) || artists[0];
  }, [selectedArtistId]);


  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden text-white font-sans selection:bg-pink-500 selection:text-white">
      
      {/* SECTION 1: Welcome/Hero View */}
      <WelcomeScreen onExplore={handleScrollToDashboard} />

      {/* SECTION 2: Dashboard Container */}
      <div
        ref={dashboardRef}
        className="min-h-screen w-full relative bg-[#060606] px-4 md:px-8 py-8 flex flex-col justify-start gap-6 border-t border-white/5"
      >
        {/* Glow ambient spots behind dashboard to replicate high contrast image glow */}
        <div className="absolute top-20 left-1/3 w-[30vw] h-[30vw] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-1/4 w-[30vw] h-[30vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>

        {/* 3-Column Layout: Left Menu (Pill), Center Area (Dashboard Content), Right Sidebar (New Releases) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          

          {/* COLUMN 2: CENTER AREA (8 Col span on large screen) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Breadcrumb & User Avatar Bar */}
            <div className="w-full flex items-center justify-between px-2 text-neutral-400 text-xs font-mono select-none">
              <div className="flex items-center gap-1.5 uppercase tracking-widest">
                <span>home</span>
                <span>&gt;</span>
                <span className="text-white">2026</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wide text-neutral-500 font-bold uppercase">My profile</span>
                <div className="w-8 h-8 rounded-full border border-pink-500/40 p-0.5 overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/user-avatar/100"
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />

            {/* Live Search Overlay Results */}
            <AnimatePresence>
              {searchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 glass-panel-heavy p-4 shadow-2xl space-y-3 relative z-30"
                  id="search-results-panel"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    <span>Search results</span>
                    <span>Type to filter</span>
                  </div>

                  {!searchResults.hasResults ? (
                    <div className="flex items-center gap-2 text-neutral-500 text-xs py-4 justify-center">
                      <AlertCircle className="w-4 h-4" />
                      <span>No matching songs, albums, or artists found.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Artists Results */}
                      {searchResults.artists.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-pink-500 uppercase tracking-widest font-mono">Artists</span>
                          <div className="space-y-1">
                            {searchResults.artists.map(a => (
                              <button
                                key={a.id}
                                onClick={() => {
                                  setSelectedArtistId(a.id);
                                  setSearchQuery("");
                                }}
                                className="w-full flex items-center gap-2 p-1.5 rounded bg-white/2 hover:bg-white/8 text-xs text-left text-neutral-200 transition"
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
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest font-mono">Songs</span>
                          <div className="space-y-1">
                            {searchResults.songs.map(s => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setSelectedArtistId(s.artistId);
                                  setSearchQuery("");
                                }}
                                className="w-full flex items-center gap-2 p-1.5 rounded bg-white/2 hover:bg-white/8 text-xs text-left text-neutral-200 transition"
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
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-purple-500 uppercase tracking-widest font-mono">Albums</span>
                          <div className="space-y-1">
                            {searchResults.albums.map(al => (
                              <button
                                key={al.id}
                                onClick={() => {
                                  setSelectedArtistId(al.artistId);
                                  setSearchQuery("");
                                }}
                                className="w-full flex items-center gap-2 p-1.5 rounded bg-white/2 hover:bg-white/8 text-xs text-left text-neutral-200 transition"
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

            {/* "cl" + Albums + "d" = CLOUD Top Ranked Element */}
            <TopCloudAlbums selectedId={selectedArtistId} onSelect={setSelectedArtistId} />

            {/* Glass Box containing Top 5 Artists + Key KPIs */}
            <div className="rounded-3xl border border-white/5 bg-white/1 backdrop-blur-lg p-6 shadow-2xl space-y-6">
              
              {/* Top 5 Row */}
              <TopArtists selectedArtistId={selectedArtistId} onSelectArtist={setSelectedArtistId} />
              
              {/* Divider */}
              <div className="h-px bg-white/5 w-full"></div>

          
            </div>

            {/* Two Analytics Graphs */}
            <AnalyticsCharts selectedArtistId={selectedArtistId} />
          </div>

          {/* COLUMN 3: RIGHT SIDEBAR (3 Col span on large screen) */}
          <div className="lg:col-span-3">
            <NewReleases onSelectArtist={setSelectedArtistId} selectedArtistId={selectedArtistId} />
          </div>

        </div>
      </div>
    </div>
  );
}