export interface Album {
  id: number;
  artistId: number;
  year: number;
  titleAlbum: string;
  coverUrl: string;
  description: string;
  revenue: number;
  productionCost: number;
  breakEven: number;
  roi: number;
  completionRate: number; // Percentage of users listening to the full album
  revenueMix: {
    streaming: number;
    physical: number; // Vinyl and CDs sales
    merch: number; // T-shirts, posters, etc.
    licensing: number; // Sync licensing for movies, TV, games
  };
  discColor: string; // Tailored visual color for the spinning vinyl record
  graphics: {
    offlineProfits: number;
    onlineProfits: number;
  };
}

export const albums: Album[] = [
  {
    id: 1,
    artistId: 1,
    year: 2024,
    titleAlbum: "Short n' Sweet",
    coverUrl: "https://picsum.photos/seed/album1/600",
    description: "Sixth studio album by Sabrina Carpenter featuring hit singles Espresso and Please Please Please.",
    revenue: 38000000,
    productionCost: 11500000,
    breakEven: 766667,
    roi: 230.43,
    completionRate: 74.8,
    revenueMix: {
      streaming: 18000000,
      physical: 12000000,
      merch: 5500000,
      licensing: 2500000
    },
    discColor: "#60a5fa", // Sky Blue vinyl record as shown in Sabrina's mockup
    graphics: { offlineProfits: 9000000, onlineProfits: 29000000 }
  },
  {
    id: 2,
    artistId: 2,
    year: 2024,
    titleAlbum: "Eternal Sunshine",
    coverUrl: "https://picsum.photos/seed/album2/600",
    description: "Ariana Grande's critically acclaimed album reflecting themes of self-discovery, love, and growth.",
    revenue: 46000000,
    productionCost: 12000000,
    breakEven: 800000,
    roi: 283.33,
    completionRate: 81.2,
    revenueMix: {
      streaming: 24000000,
      physical: 13000000,
      merch: 6000000,
      licensing: 3000000
    },
    discColor: "#fca5a5", // Peach/Rose vinyl record for Ariana Grande
    graphics: { offlineProfits: 12000000, onlineProfits: 34000000 }
  },
  {
    id: 3,
    artistId: 3,
    year: 2021,
    titleAlbum: "An Evening with Silk Sonic",
    coverUrl: "https://picsum.photos/seed/album3/600",
    description: "The retro-soul collaboration masterpiece between Bruno Mars and Anderson .Paak.",
    revenue: 35000000,
    productionCost: 10000000,
    breakEven: 666667,
    roi: 250.00,
    completionRate: 68.5,
    revenueMix: {
      streaming: 15000000,
      physical: 11000000,
      merch: 5000000,
      licensing: 4000000
    },
    discColor: "#fbbf24", // Gold/Amber retro vinyl record
    graphics: { offlineProfits: 11000000, onlineProfits: 24000000 }
  },
  {
    id: 4,
    artistId: 4,
    year: 2023,
    titleAlbum: "nadie sabe lo que va a pasar mañana",
    coverUrl: "https://picsum.photos/seed/album4/600",
    description: "Bad Bunny's record-breaking trap and experimental synth studio album.",
    revenue: 54000000,
    productionCost: 14000000,
    breakEven: 933334,
    roi: 285.71,
    completionRate: 85.6,
    revenueMix: {
      streaming: 32000000,
      physical: 8000000,
      merch: 10000000,
      licensing: 4000000
    },
    discColor: "#ef4444", // Royal Red vinyl record for Bad Bunny
    graphics: { offlineProfits: 10000000, onlineProfits: 44000000 }
  },
  {
    id: 5,
    artistId: 5,
    year: 2025,
    titleAlbum: "Chromakopia",
    coverUrl: "https://picsum.photos/seed/album5/600",
    description: "Tyler, The Creator's futuristic conceptual audio journey.",
    revenue: 29000000,
    productionCost: 9000000,
    breakEven: 600000,
    roi: 222.22,
    completionRate: 78.4,
    revenueMix: {
      streaming: 16000000,
      physical: 6000000,
      merch: 5000000,
      licensing: 2000000
    },
    discColor: "#10b981", // Emerald Green vinyl record for Tyler
    graphics: { offlineProfits: 7000000, onlineProfits: 22000000 }
  },
  {
    id: 6,
    artistId: 6,
    year: 2023,
    titleAlbum: "GUTS",
    coverUrl: "https://picsum.photos/seed/album6/600",
    description: "Olivia Rodrigo's sophomore pop-punk masterpiece filled with raw lyricism.",
    revenue: 34000000,
    productionCost: 10000000,
    breakEven: 666667,
    roi: 240.00,
    completionRate: 72.3,
    revenueMix: {
      streaming: 19000000,
      physical: 8000000,
      merch: 5000000,
      licensing: 2000000
    },
    discColor: "#a855f7", // Deep Purple vinyl record for Olivia GUTS
    graphics: { offlineProfits: 9000000, onlineProfits: 25000000 }
  },
  {
    id: 7,
    artistId: 7,
    year: 2024,
    titleAlbum: "Radical Optimism",
    coverUrl: "https://picsum.photos/seed/album7/600",
    description: "Dua Lipa's psychedelic pop-infused energetic third studio album.",
    revenue: 36000000,
    productionCost: 11000000,
    breakEven: 733334,
    roi: 227.27,
    completionRate: 69.1,
    revenueMix: {
      streaming: 20000000,
      physical: 9000000,
      merch: 4500000,
      licensing: 2500000
    },
    discColor: "#06b6d4", // Cyan vinyl record for Dua Lipa
    graphics: { offlineProfits: 9000000, onlineProfits: 27000000 }
  },
  {
    id: 8,
    artistId: 8,
    year: 2022,
    titleAlbum: "Proof",
    coverUrl: "https://picsum.photos/seed/album8/600",
    description: "BTS's anthology compilation tracing their legendary careers and massive hits.",
    revenue: 60000000,
    productionCost: 15000000,
    breakEven: 1000000,
    roi: 300.00,
    completionRate: 88.9,
    revenueMix: {
      streaming: 28000000,
      physical: 20000000,
      merch: 8000000,
      licensing: 4000000
    },
    discColor: "#3b82f6", // Royal Blue custom vinyl record for BTS
    graphics: { offlineProfits: 18000000, onlineProfits: 42000000 }
  },
  {
    id: 9,
    artistId: 9,
    year: 2025,
    titleAlbum: "MAYHEM",
    coverUrl: "https://picsum.photos/seed/album9/600",
    description: "Lady Gaga's upcoming heavy synth and dark pop-rock extravaganza.",
    revenue: 43000000,
    productionCost: 12000000,
    breakEven: 800000,
    roi: 258.33,
    completionRate: 76.5,
    revenueMix: {
      streaming: 23000000,
      physical: 11000000,
      merch: 6000000,
      licensing: 3000000
    },
    discColor: "#ec4899", // Magenta pink custom vinyl record for Gaga
    graphics: { offlineProfits: 12000000, onlineProfits: 31000000 }
  }
];
