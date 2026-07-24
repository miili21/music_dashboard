import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";
import { songs } from "../data/songs";
import { albums } from "../data/albums";
import { artists } from "../data/artists";

interface AnalyticsChartsProps {
  selectedArtistId: number | null;
}

export default function AnalyticsCharts({ selectedArtistId }: AnalyticsChartsProps) {
  // -------------------------------------------------------------------------
  // 1. DATA PREPARATION FOR LEFT CHART: Active (Frontline) vs Deep Catalog
  // Frontline: songs from 2025 (less than 18 months from July 2026)
  // Deep Catalog: songs from 2024 and older
  // -------------------------------------------------------------------------
  const activeVsDeepData = useMemo(() => {
    // If an artist is selected, filter by that artist, otherwise group all
    const relevantSongs = selectedArtistId
      ? songs.filter((s) => s.artistId === selectedArtistId)
      : songs;

    // Grouping by year to show the trend of active vs deep catalog over years
    const years = [2021, 2022, 2023, 2024, 2025];
    
    return years.map((yr) => {
      const yearSongs = relevantSongs.filter((s) => s.year === yr);
      
      let frontlineEarnings = 0;
      let deepCatalogEarnings = 0;

      yearSongs.forEach((s) => {
        // In the context of July 2026, 2025 releases are frontline (< 18 months)
        if (s.year >= 2025) {
          frontlineEarnings += s.kpis.earnings;
        } else {
          deepCatalogEarnings += s.kpis.earnings;
        }
      });

      // If we are looking at the overall aggregate, let's make it look like a smooth timeline curve
      return {
        year: yr.toString(),
        "Frontline (Active)": frontlineEarnings / 1000000, // in Millions
        "Deep Catalog": deepCatalogEarnings / 1000000, // in Millions
      };
    });
  }, [selectedArtistId]);

  // Calculate percentages for summary display
  const LeftStats = useMemo(() => {
    const relevantSongs = selectedArtistId
      ? songs.filter((s) => s.artistId === selectedArtistId)
      : songs;

    let frontlineTotal = 0;
    let deepTotal = 0;

    relevantSongs.forEach((s) => {
      if (s.year >= 2025) {
        frontlineTotal += s.kpis.earnings;
      } else {
        deepTotal += s.kpis.earnings;
      }
    });

    const total = frontlineTotal + deepTotal || 1;
    return {
      frontlinePercent: Math.round((frontlineTotal / total) * 100),
      deepPercent: Math.round((deepTotal / total) * 100),
      frontlineVal: (frontlineTotal / 1000000).toFixed(1),
      deepVal: (deepTotal / 1000000).toFixed(1),
    };
  }, [selectedArtistId]);

  // -------------------------------------------------------------------------
  // 2. DATA PREPARATION FOR RIGHT CHART: Physical vs Streaming by Genre
  // -------------------------------------------------------------------------
  const artistGenres: Record<number, string> = {
    1: "Pop / Carpenter",
    2: "R&B / Grande",
    3: "Funk / Mars",
    4: "Latin / Bunny",
    5: "Hip-Hop / Tyler",
    6: "Pop-Rock / Rodrigo",
    7: "Dance / Lipa",
    8: "K-Pop / BTS",
    9: "Pop-Electronic / Gaga",
  };

  const genreData = useMemo(() => {
    // Group albums by genre
    const dataMap: Record<string, { offline: number; online: number; count: number }> = {};

    albums.forEach((album) => {
      const genre = artistGenres[album.artistId] || "Other";
      if (!dataMap[genre]) {
        dataMap[genre] = { offline: 0, online: 0, count: 0 };
      }
      dataMap[genre].offline += album.graphics.offlineProfits;
      dataMap[genre].online += album.graphics.onlineProfits;
      dataMap[genre].count += 1;
    });

    return Object.keys(dataMap).map((genre) => {
      const item = dataMap[genre];
      return {
        genre,
        "Physical Sales": Math.round(item.offline / item.count / 1000000), // average in Millions
        "Streaming Sales": Math.round(item.online / item.count / 1000000), // average in Millions
      };
    });
  }, []);

  const currentArtistName = useMemo(() => {
    const artist = artists.find((a) => a.id === selectedArtistId);
    return artist ? artist.name : "All Artists";
  }, [selectedArtistId]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      {/* LEFT CHART: Active vs Deep Catalog */}
      <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-pink-500 to-transparent"></div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Active vs Deep Catalog
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">
              {currentArtistName}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed font-sans">
            Revenue partition of Frontline releases (&lt;18 months) versus historical catalog.
          </p>
        </div>

        {/* Chart View */}
        <div className="h-56 w-full select-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeVsDeepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFrontline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="year"
                stroke="#888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `$${val}M`}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 10, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="Frontline (Active)"
                stroke="#ec4899"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorFrontline)"
              />
              <Area
                type="monotone"
                dataKey="Deep Catalog"
                stroke="#f97316"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorDeep)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mini stats footer */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 mt-4 font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 uppercase">Frontline (&lt;18m)</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-pink-500">{LeftStats.frontlinePercent}%</span>
              <span className="text-[10px] text-neutral-500">${LeftStats.frontlineVal}M</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 uppercase">Deep Catalog</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-orange-500">{LeftStats.deepPercent}%</span>
              <span className="text-[10px] text-neutral-500">${LeftStats.deepVal}M</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CHART: Physical vs Streaming by Audience Profile (Genre) */}
      <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-500 to-transparent"></div>
        
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
            Physical vs Streaming by Audience Profile
          </h3>
          <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed font-sans">
            Average revenue comparison of offline/physical sales vs digital streaming grouped by genre.
          </p>
        </div>

        {/* Chart View */}
        <div className="h-56 w-full select-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="genre"
                stroke="#888"
                fontSize={8}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: string) => val.split(" / ")[0]}
              />
              <YAxis
                stroke="#888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `$${val}M`}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 10, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="Physical Sales" fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Streaming Sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex justify-center gap-6 pt-3 border-t border-white/5 mt-4 text-[10px] font-mono uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 inline-block"></span>
            <span className="text-neutral-400">Physical (Offline)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block"></span>
            <span className="text-neutral-400">Streaming (Online)</span>
          </div>
        </div>
      </div>
    </div>
  );
}