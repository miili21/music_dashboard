export interface Album {
    id:number;
    artistId:number;
    year:number;
    titleAlbum:string;
    coverUrl:string;
    description:string;
    revenue:number;
    productionCost:number;
    breakEven:number;
    roi:number;
    graphics:{
      offlineProfits:number;
      onlineProfits:number;
    };
  }
  
  export const albums: Album[] = [
  {id:1,artistId:1,year:2024,titleAlbum:"Short n' Sweet",coverUrl:"https://picsum.photos/seed/album1/600",description:"Sixth studio album by Sabrina Carpenter.",revenue:38000000,productionCost:11500000,breakEven:766667,roi:230.43,graphics:{offlineProfits:9000000,onlineProfits:29000000}},
  {id:2,artistId:2,year:2024,titleAlbum:"Eternal Sunshine",coverUrl:"https://picsum.photos/seed/album2/600",description:"Seventh studio album by Ariana Grande.",revenue:46000000,productionCost:12000000,breakEven:800000,roi:283.33,graphics:{offlineProfits:12000000,onlineProfits:34000000}},
  {id:3,artistId:3,year:2021,titleAlbum:"An Evening with Silk Sonic",coverUrl:"https://picsum.photos/seed/album3/600",description:"Collaboration album by Silk Sonic.",revenue:35000000,productionCost:10000000,breakEven:666667,roi:250.00,graphics:{offlineProfits:11000000,onlineProfits:24000000}},
  {id:4,artistId:4,year:2023,titleAlbum:"nadie sabe lo que va a pasar mañana",coverUrl:"https://picsum.photos/seed/album4/600",description:"Bad Bunny's chart-topping release.",revenue:54000000,productionCost:14000000,breakEven:933334,roi:285.71,graphics:{offlineProfits:10000000,onlineProfits:44000000}},
  {id:5,artistId:5,year:2025,titleAlbum:"Chromakopia",coverUrl:"https://picsum.photos/seed/album5/600",description:"Tyler, The Creator studio album.",revenue:29000000,productionCost:9000000,breakEven:600000,roi:222.22,graphics:{offlineProfits:7000000,onlineProfits:22000000}},
  {id:6,artistId:6,year:2023,titleAlbum:"GUTS",coverUrl:"https://picsum.photos/seed/album6/600",description:"Olivia Rodrigo second studio album.",revenue:34000000,productionCost:10000000,breakEven:666667,roi:240.00,graphics:{offlineProfits:9000000,onlineProfits:25000000}},
  {id:7,artistId:7,year:2024,titleAlbum:"Radical Optimism",coverUrl:"https://picsum.photos/seed/album7/600",description:"Third studio album by Dua Lipa.",revenue:36000000,productionCost:11000000,breakEven:733334,roi:227.27,graphics:{offlineProfits:9000000,onlineProfits:27000000}},
  {id:8,artistId:8,year:2022,titleAlbum:"Proof",coverUrl:"https://picsum.photos/seed/album8/600",description:"BTS anthology album.",revenue:60000000,productionCost:15000000,breakEven:1000000,roi:300.00,graphics:{offlineProfits:18000000,onlineProfits:42000000}},
  {id:9,artistId:9,year:2025,titleAlbum:"MAYHEM",coverUrl:"https://picsum.photos/seed/album9/600",description:"Lady Gaga studio album.",revenue:43000000,productionCost:12000000,breakEven:800000,roi:258.33,graphics:{offlineProfits:12000000,onlineProfits:31000000}}
  ];
  