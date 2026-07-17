export interface Artist {
  id:number;
  year:number;
  name:string;
  avatarUrl:string;
  artistPhoto:string;
  bannerSong:{
    songId:number;
    titleSong:string;
    albumId:number;
    album:string;
    coverUrl:string;
    totalLikes:number;
    description:string;
  };
  kpis:{
    conversionRate:number;
    subscriptionEarning:number;
    netBenefits:number;
  };
  profitableTracks:string[];
  globalReach:string[];
  graphics:{
    albumEarning:number;
    merchEarning:number;
    showsEarning:number;
    streamingEarning:number;
    youtubeFollows:number;
    spotifyFollows:number;
    appleMusicFollows:number;
  };
}

export const artists: Artist[] = [
{
id:1,year:2024,name:"Sabrina Carpenter",
avatarUrl:"https://picsum.photos/seed/sabrina-avatar/200",
artistPhoto:"https://picsum.photos/seed/sabrina-photo/1200/800",
bannerSong:{songId:1,titleSong:"Espresso",albumId:1,album:"Short n' Sweet",coverUrl:"https://picsum.photos/seed/espresso/600",totalLikes:128000000,description:"Global hit single from Short n' Sweet."},
kpis:{conversionRate:4.9,subscriptionEarning:1800000,netBenefits:26500000},
profitableTracks:["Espresso","Please Please Please","Taste","Feather","Nonsense"],
globalReach:["USA","UK","Canada","Australia","Germany","Brazil","Mexico","France","Japan","Spain"],
graphics:{albumEarning:31000000,merchEarning:8200000,showsEarning:47000000,streamingEarning:22500000,youtubeFollows:2100000,spotifyFollows:3600000,appleMusicFollows:1200000}
},
{
id:2,year:2024,name:"Ariana Grande",
avatarUrl:"https://picsum.photos/seed/ariana-avatar/200",
artistPhoto:"https://picsum.photos/seed/ariana-photo/1200/800",
bannerSong:{songId:2,titleSong:"we can't be friends",albumId:2,album:"Eternal Sunshine",coverUrl:"https://picsum.photos/seed/ariana/600",totalLikes:119000000,description:"Lead single from Eternal Sunshine."},
kpis:{conversionRate:5.2,subscriptionEarning:2400000,netBenefits:34200000},
profitableTracks:["we can't be friends","yes, and?","7 rings","positions","Into You"],
globalReach:["USA","UK","Brazil","Canada","Mexico","Japan","France","Germany","Italy","Australia"],
graphics:{albumEarning:36000000,merchEarning:9100000,showsEarning:58000000,streamingEarning:28000000,youtubeFollows:1900000,spotifyFollows:3200000,appleMusicFollows:1300000}
},
{
id:3,year:2021,name:"Bruno Mars",
avatarUrl:"https://picsum.photos/seed/bruno-avatar/200",
artistPhoto:"https://picsum.photos/seed/bruno-photo/1200/800",
bannerSong:{songId:3,titleSong:"Leave The Door Open",albumId:3,album:"An Evening with Silk Sonic",coverUrl:"https://picsum.photos/seed/bruno/600",totalLikes:110000000,description:"Award-winning Silk Sonic single."},
kpis:{conversionRate:5.6,subscriptionEarning:1700000,netBenefits:30100000},
profitableTracks:["Leave The Door Open","Smokin Out The Window","24K Magic","That's What I Like","Locked Out of Heaven"],
globalReach:["USA","Japan","Brazil","UK","Philippines","Canada","Australia","France","Germany","Mexico"],
graphics:{albumEarning:28000000,merchEarning:7200000,showsEarning:61000000,streamingEarning:26000000,youtubeFollows:1600000,spotifyFollows:2800000,appleMusicFollows:950000}
},
{
id:4,year:2023,name:"Bad Bunny",
avatarUrl:"https://picsum.photos/seed/badbunny-avatar/200",
artistPhoto:"https://picsum.photos/seed/badbunny-photo/1200/800",
bannerSong:{songId:4,titleSong:"Monaco",albumId:4,album:"nadie sabe lo que va a pasar mañana",coverUrl:"https://picsum.photos/seed/monaco/600",totalLikes:98000000,description:"Hit track from the 2023 album."},
kpis:{conversionRate:5.8,subscriptionEarning:2900000,netBenefits:39000000},
profitableTracks:["Monaco","Moscow Mule","Tití Me Preguntó","WHERE SHE GOES","Dakiti"],
globalReach:["Mexico","USA","Spain","Colombia","Argentina","Chile","Peru","Brazil","Canada","Italy"],
graphics:{albumEarning:42000000,merchEarning:11000000,showsEarning:99000000,streamingEarning:35000000,youtubeFollows:2400000,spotifyFollows:4200000,appleMusicFollows:1600000}
},
{
id:5,year:2025,name:"Tyler, The Creator",
avatarUrl:"https://picsum.photos/seed/tyler-avatar/200",
artistPhoto:"https://picsum.photos/seed/tyler-photo/1200/800",
bannerSong:{songId:5,titleSong:"Sticky",albumId:5,album:"Chromakopia",coverUrl:"https://picsum.photos/seed/sticky/600",totalLikes:42000000,description:"Featured single."},
kpis:{conversionRate:3.8,subscriptionEarning:900000,netBenefits:18400000},
profitableTracks:["Sticky","EARFQUAKE","See You Again","Noid","NEW MAGIC WAND"],
globalReach:["USA","Canada","UK","Australia","Germany","France","Japan","Mexico","Netherlands","Brazil"],
graphics:{albumEarning:22000000,merchEarning:5300000,showsEarning:33000000,streamingEarning:17000000,youtubeFollows:800000,spotifyFollows:1700000,appleMusicFollows:500000}
},
{
id:6,year:2023,name:"Olivia Rodrigo",avatarUrl:"https://picsum.photos/seed/olivia-avatar/200",artistPhoto:"https://picsum.photos/seed/olivia-photo/1200/800",
bannerSong:{songId:6,titleSong:"vampire",albumId:6,album:"GUTS",coverUrl:"https://picsum.photos/seed/vampire/600",totalLikes:93000000,description:"Lead single from GUTS."},
kpis:{conversionRate:4.6,subscriptionEarning:1400000,netBenefits:23000000},
profitableTracks:["vampire","drivers license","good 4 u","traitor","bad idea right?"],
globalReach:["USA","UK","Canada","Australia","Philippines","Japan","Germany","France","Brazil","Mexico"],
graphics:{albumEarning:26000000,merchEarning:6000000,showsEarning:39000000,streamingEarning:21000000,youtubeFollows:1200000,spotifyFollows:2300000,appleMusicFollows:850000}
},
{
id:7,year:2024,name:"Dua Lipa",avatarUrl:"https://picsum.photos/seed/dua-avatar/200",artistPhoto:"https://picsum.photos/seed/dua-photo/1200/800",
bannerSong:{songId:7,titleSong:"Houdini",albumId:7,album:"Radical Optimism",coverUrl:"https://picsum.photos/seed/houdini/600",totalLikes:85000000,description:"Dance-pop hit."},
kpis:{conversionRate:4.7,subscriptionEarning:1600000,netBenefits:25100000},
profitableTracks:["Houdini","Levitating","Dance The Night","Training Season","Don't Start Now"],
globalReach:["UK","USA","Germany","France","Italy","Spain","Brazil","Australia","Canada","Japan"],
graphics:{albumEarning:29000000,merchEarning:6800000,showsEarning:48000000,streamingEarning:24000000,youtubeFollows:1500000,spotifyFollows:2900000,appleMusicFollows:950000}
},
{
id:8,year:2022,name:"BTS",avatarUrl:"https://picsum.photos/seed/bts-avatar/200",artistPhoto:"https://picsum.photos/seed/bts-photo/1200/800",
bannerSong:{songId:8,titleSong:"Yet To Come",albumId:8,album:"Proof",coverUrl:"https://picsum.photos/seed/proof/600",totalLikes:102000000,description:"Anthology title track."},
kpis:{conversionRate:6.1,subscriptionEarning:3500000,netBenefits:45000000},
profitableTracks:["Yet To Come","Butter","Dynamite","Run BTS","Permission to Dance"],
globalReach:["South Korea","Japan","USA","Philippines","Indonesia","Brazil","Mexico","India","UK","Thailand"],
graphics:{albumEarning:47000000,merchEarning:14000000,showsEarning:120000000,streamingEarning:38000000,youtubeFollows:3100000,spotifyFollows:5100000,appleMusicFollows:1900000}
},
{
id:9,year:2025,name:"Lady Gaga",avatarUrl:"https://picsum.photos/seed/gaga-avatar/200",artistPhoto:"https://picsum.photos/seed/gaga-photo/1200/800",
bannerSong:{songId:9,titleSong:"Disease",albumId:9,album:"MAYHEM",coverUrl:"https://picsum.photos/seed/gaga/600",totalLikes:74000000,description:"Lead single from MAYHEM."},
kpis:{conversionRate:5.1,subscriptionEarning:2100000,netBenefits:32000000},
profitableTracks:["Disease","Shallow","Poker Face","Bad Romance","Rain On Me"],
globalReach:["USA","UK","Brazil","Germany","France","Italy","Canada","Australia","Japan","Spain"],
graphics:{albumEarning:34000000,merchEarning:8300000,showsEarning:70000000,streamingEarning:27000000,youtubeFollows:1800000,spotifyFollows:3100000,appleMusicFollows:1100000}
}
];
