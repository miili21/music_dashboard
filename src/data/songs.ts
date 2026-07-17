
export interface Song {
    id:number;
    artistId:number;
    albumId:number;
    year:number;
    titleSong:string;
    coverUrl:string;
    spotifyLikes:number;
    youtubeLikes:number;
    appleMusicLikes:number;
    spotifyViews:number;
    youtubeViews:number;
    appleMusicViews:number;
    totalLikes:number;
    totalViews:number;
    kpis:{
      earnings:number;
      microMonetization:number;
      conversionRate:number;
    };
  }
  
  export const songs: Song[] = [
  {id:1,artistId:1,albumId:1,year:2024,titleSong:"Espresso",coverUrl:"https://picsum.photos/seed/song1/600",spotifyLikes:52000000,youtubeLikes:43000000,appleMusicLikes:33000000,spotifyViews:980000000,youtubeViews:710000000,appleMusicViews:420000000,totalLikes:128000000,totalViews:2110000000,kpis:{earnings:22500000,microMonetization:3200000,conversionRate:4.9}},
  {id:2,artistId:2,albumId:2,year:2024,titleSong:"we can't be friends",coverUrl:"https://picsum.photos/seed/song2/600",spotifyLikes:50000000,youtubeLikes:39000000,appleMusicLikes:30000000,spotifyViews:920000000,youtubeViews:650000000,appleMusicViews:390000000,totalLikes:119000000,totalViews:1960000000,kpis:{earnings:20800000,microMonetization:2800000,conversionRate:5.2}},
  {id:3,artistId:3,albumId:3,year:2021,titleSong:"Leave The Door Open",coverUrl:"https://picsum.photos/seed/song3/600",spotifyLikes:46000000,youtubeLikes:36000000,appleMusicLikes:28000000,spotifyViews:880000000,youtubeViews:640000000,appleMusicViews:360000000,totalLikes:110000000,totalViews:1880000000,kpis:{earnings:19400000,microMonetization:2400000,conversionRate:5.6}},
  {id:4,artistId:4,albumId:4,year:2023,titleSong:"Monaco",coverUrl:"https://picsum.photos/seed/song4/600",spotifyLikes:42000000,youtubeLikes:31000000,appleMusicLikes:25000000,spotifyViews:790000000,youtubeViews:540000000,appleMusicViews:330000000,totalLikes:98000000,totalViews:1660000000,kpis:{earnings:18700000,microMonetization:2600000,conversionRate:5.8}},
  {id:5,artistId:5,albumId:5,year:2025,titleSong:"Sticky",coverUrl:"https://picsum.photos/seed/song5/600",spotifyLikes:18000000,youtubeLikes:14000000,appleMusicLikes:10000000,spotifyViews:350000000,youtubeViews:210000000,appleMusicViews:150000000,totalLikes:42000000,totalViews:710000000,kpis:{earnings:9800000,microMonetization:1100000,conversionRate:3.8}},
  {id:6,artistId:6,albumId:6,year:2023,titleSong:"vampire",coverUrl:"https://picsum.photos/seed/song6/600",spotifyLikes:39000000,youtubeLikes:30000000,appleMusicLikes:24000000,spotifyViews:760000000,youtubeViews:520000000,appleMusicViews:310000000,totalLikes:93000000,totalViews:1590000000,kpis:{earnings:17600000,microMonetization:2200000,conversionRate:4.6}},
  {id:7,artistId:7,albumId:7,year:2024,titleSong:"Houdini",coverUrl:"https://picsum.photos/seed/song7/600",spotifyLikes:35000000,youtubeLikes:28000000,appleMusicLikes:22000000,spotifyViews:680000000,youtubeViews:470000000,appleMusicViews:280000000,totalLikes:85000000,totalViews:1430000000,kpis:{earnings:16500000,microMonetization:2100000,conversionRate:4.7}},
  {id:8,artistId:8,albumId:8,year:2022,titleSong:"Yet To Come",coverUrl:"https://picsum.photos/seed/song8/600",spotifyLikes:43000000,youtubeLikes:34000000,appleMusicLikes:25000000,spotifyViews:820000000,youtubeViews:600000000,appleMusicViews:350000000,totalLikes:102000000,totalViews:1770000000,kpis:{earnings:20100000,microMonetization:2900000,conversionRate:6.1}},
  {id:9,artistId:9,albumId:9,year:2025,titleSong:"Disease",coverUrl:"https://picsum.photos/seed/song9/600",spotifyLikes:30000000,youtubeLikes:25000000,appleMusicLikes:19000000,spotifyViews:610000000,youtubeViews:430000000,appleMusicViews:240000000,totalLikes:74000000,totalViews:1280000000,kpis:{earnings:14900000,microMonetization:1800000,conversionRate:5.1}}
  ];
  