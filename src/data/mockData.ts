export const GENRES = ["Фонк", "Инди-рок", "Электроника", "Хип-хоп"] as const;

export type Genre = (typeof GENRES)[number];

export type UserProfile = {
  name: string;
  avatar: string;
  favoriteGenres: Genre[];
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  genre: Genre;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  genre: Genre;
  year: number;
  kind?: "Альбом" | "Сингл";
};

export type FeaturedRelease = {
  artist: string;
  artistAvatar: string;
  title: string;
  cover: string;
  kind: "Альбом" | "Сингл";
};

export type Stream = {
  id: string;
  title: string;
  cover: string;
  genre?: Genre;
};

export type WaveCard = {
  id: string;
  title: string;
  featured?: boolean;
  genre?: Genre;
  media?: "cover" | "avatar";
  image?: string;
};

export type Collection = {
  id: string;
  title: string;
  subtitle?: string;
  cover: string;
};

export const MOODS = ["тренировка", "работа", "грусть", "вечеринка"] as const;

export type Mood = (typeof MOODS)[number];

export type Playlist = {
  id: string;
  title: string;
  description: string;
  cover: string;
  genre: Genre;
  mood: Mood;
  trackIds: string[];
  editorial?: boolean;
};

export type TopArtist = {
  id: string;
  name: string;
  avatar: string;
  monthlyListeners: string;
  genre: Genre;
};

export type PlaylistShelf = {
  id: string;
  title: string;
  subtitle?: string;
  layout: "expanded" | "grid" | "banner" | "chart" | "rail";
  playlists: Playlist[];
};

export type PersonalizedFeed = {
  recentlyPlayed: Track[];
  featured: FeaturedRelease;
  forYou: Track[];
  newReleases: Track[];
  popularAlbums: Album[];
  decades: Collection[];
  russianRap: Album[];
  playlistTracks: Track[];
  tasteGenre: Genre;
  playlists: Playlist[];
  playlistShelves: PlaylistShelf[];
  moods: Mood[];
  topArtists: TopArtist[];
};

const unsplash = (photoId: string, size = 640) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;

const itunesCover = (path: string, size = 600) =>
  `https://is1-ssl.mzstatic.com/image/thumb/${path}/${size}x${size}bb.jpg`;

const wikiThumb = (hash: string, file: string) => {
  const encoded = encodeURIComponent(file)
    .replaceAll("%28", "(")
    .replaceAll("%29", ")");
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash}/${encoded}/330px-${encoded}`;
};

export const userProfile: UserProfile = {
  name: "Алекс Волков",
  avatar: unsplash("photo-1539571696357-5a69c17a67c6", 200),
  favoriteGenres: [...GENRES],
};

export const tracks: Track[] = [
  {
    id: "t1",
    title: "Midnight Drift",
    artist: "SHADOW//CITY",
    cover: unsplash("photo-1508700115892-45ecd05ae2ad"),
    duration: "2:18",
    genre: "Фонк",
  },
  {
    id: "t2",
    title: "Cowbell Dreams",
    artist: "NITE RUN",
    cover: unsplash("photo-1571330735066-03aaa9429d89"),
    duration: "2:41",
    genre: "Фонк",
  },
  {
    id: "t3",
    title: "Туман на трассе",
    artist: "KX WAVE",
    cover: unsplash("photo-1557672172-298e090bd0f1"),
    duration: "3:05",
    genre: "Фонк",
  },
  {
    id: "t4",
    title: "1988 Memphis",
    artist: "CRUISER",
    cover: unsplash("photo-1614613535308-eb5fbd3d2c17"),
    duration: "2:33",
    genre: "Фонк",
  },
  {
    id: "t5",
    title: "Phonk Lord",
    artist: "DVR ST.",
    cover: unsplash("photo-1598387993441-a364f854c3e1"),
    duration: "2:56",
    genre: "Фонк",
  },
  {
    id: "t6",
    title: "Окно",
    artist: "Северный Ветер",
    cover: unsplash("photo-1511671782779-c97d3d27a1d4"),
    duration: "3:42",
    genre: "Инди-рок",
  },
  {
    id: "t7",
    title: "Тихие комнаты",
    artist: "Атлас",
    cover: unsplash("photo-1471478331149-c72f17e33c73"),
    duration: "4:11",
    genre: "Инди-рок",
  },
  {
    id: "t8",
    title: "Последний поезд",
    artist: "Монохром",
    cover: unsplash("photo-1510915361894-db8b60106cb1"),
    duration: "3:28",
    genre: "Инди-рок",
  },
  {
    id: "t9",
    title: "Лето не кончится",
    artist: "Река",
    cover: unsplash("photo-1470225620780-dba8ba36b745"),
    duration: "3:55",
    genre: "Инди-рок",
  },
  {
    id: "t10",
    title: "Горизонт",
    artist: "Поляна",
    cover: unsplash("photo-1487180144351-b8472da7d491"),
    duration: "4:02",
    genre: "Инди-рок",
  },
  {
    id: "t11",
    title: "Neon Pulse",
    artist: "analog.room",
    cover: unsplash("photo-1511379938547-c1f69419868d"),
    duration: "3:17",
    genre: "Электроника",
  },
  {
    id: "t12",
    title: "Afterglow",
    artist: "NEON 04",
    cover: unsplash("photo-1574169208507-84376144848b"),
    duration: "4:24",
    genre: "Электроника",
  },
  {
    id: "t13",
    title: "Сигнал",
    artist: "Частота",
    cover: unsplash("photo-1507838153414-b4b713384a76"),
    duration: "3:09",
    genre: "Электроника",
  },
  {
    id: "t14",
    title: "Voltage",
    artist: "GRID",
    cover: unsplash("photo-1514525253161-7a46d19cd819"),
    duration: "2:58",
    genre: "Электроника",
  },
  {
    id: "t15",
    title: "Рассвет",
    artist: "орбита",
    cover: unsplash("photo-1618005182384-a83a8bd57fbe"),
    duration: "5:12",
    genre: "Электроника",
  },
  {
    id: "t16",
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    cover: itunesCover(
      "Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg",
    ),
    duration: "2:57",
    genre: "Хип-хоп",
  },
  {
    id: "t17",
    title: "SICKO MODE",
    artist: "Travis Scott",
    cover: itunesCover(
      "Music125/v4/e7/49/8f/e7498f65-df8f-bead-d6e3-2a8d4d642a79/886447235317.jpg",
    ),
    duration: "5:12",
    genre: "Хип-хоп",
  },
  {
    id: "t18",
    title: "God's Plan",
    artist: "Drake",
    cover: itunesCover(
      "Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg",
    ),
    duration: "3:18",
    genre: "Хип-хоп",
  },
  {
    id: "t19",
    title: "No Role Modelz",
    artist: "J. Cole",
    cover: itunesCover(
      "Music116/v4/ee/28/67/ee286794-6c33-a8c2-5c37-c04f1cb5e8a6/21UM1IM54415.rgb.jpg",
    ),
    duration: "4:52",
    genre: "Хип-хоп",
  },
  {
    id: "t20",
    title: "DNA.",
    artist: "Kendrick Lamar",
    cover: itunesCover(
      "Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg",
    ),
    duration: "3:05",
    genre: "Хип-хоп",
  },
  {
    id: "t21",
    title: "FE!N (feat. Playboi Carti)",
    artist: "Travis Scott",
    cover: itunesCover(
      "Music126/v4/7d/4f/94/7d4f9468-56e1-3a2d-7186-c8088170ef58/196871341899.jpg",
    ),
    duration: "3:11",
    genre: "Хип-хоп",
  },
  {
    id: "t22",
    title: "Super Bass",
    artist: "Nicki Minaj",
    cover: itunesCover(
      "Music116/v4/3f/6a/dc/3f6adcfb-4d27-303e-b964-3710c56800e3/11UMGIM13385.rgb.jpg",
    ),
    duration: "3:21",
    genre: "Хип-хоп",
  },
  {
    id: "t23",
    title: "XO TOUR Llif3",
    artist: "Lil Uzi Vert",
    cover: itunesCover(
      "Music211/v4/02/ed/6f/02ed6f77-7e89-ca9c-4d5a-83088113cbe8/075679887955.jpg",
    ),
    duration: "3:02",
    genre: "Хип-хоп",
  },
  {
    id: "t24",
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    cover: itunesCover(
      "Music221/v4/31/3a/3f/313a3fbc-bb8f-80c7-b5a2-e226869a38cd/24UMGIM51924.rgb.jpg",
    ),
    duration: "4:34",
    genre: "Хип-хоп",
  },
  {
    id: "t25",
    title: "Marvin's Room",
    artist: "Drake",
    cover: itunesCover(
      "Music124/v4/d2/53/62/d2536245-b94c-b3fd-7168-9512f655f6d4/00602527899091.rgb.jpg",
    ),
    duration: "5:47",
    genre: "Хип-хоп",
  },
  {
    id: "t26",
    title: "Love Yourz",
    artist: "J. Cole",
    cover: itunesCover(
      "Music116/v4/ee/28/67/ee286794-6c33-a8c2-5c37-c04f1cb5e8a6/21UM1IM54415.rgb.jpg",
    ),
    duration: "3:31",
    genre: "Хип-хоп",
  },
  {
    id: "t27",
    title: "Lucid Dreams",
    artist: "Juice WRLD",
    cover: itunesCover(
      "Music112/v4/f8/6c/2a/f86c2ae0-b4eb-578c-1f02-3acb8409b815/21UMGIM53733.rgb.jpg",
    ),
    duration: "3:59",
    genre: "Хип-хоп",
  },
  {
    id: "t28",
    title: "INDUSTRY BABY",
    artist: "Lil Nas X & Jack Harlow",
    cover: itunesCover(
      "Music115/v4/4b/42/21/4b422136-2cfd-222c-ca7c-7573bf23139c/886449537204.jpg",
    ),
    duration: "3:32",
    genre: "Хип-хоп",
  },
  {
    id: "t29",
    title: "goosebumps",
    artist: "Travis Scott",
    cover: itunesCover(
      "Music114/v4/b8/e5/27/b8e527c8-aaf4-c7b7-5562-c479458ed7d9/886446092645.jpg",
    ),
    duration: "4:03",
    genre: "Хип-хоп",
  },
  {
    id: "t30",
    title: "Bodak Yellow",
    artist: "Cardi B",
    cover: itunesCover(
      "Music115/v4/ca/58/e5/ca58e5e3-acb7-8ca3-6af9-ad63af3b71f1/075679873675.jpg",
    ),
    duration: "3:43",
    genre: "Хип-хоп",
  },
  {
    id: "t31",
    title: "Lose Yourself",
    artist: "Eminem",
    cover: itunesCover(
      "Music125/v4/08/23/fc/0823fcd9-cb44-695b-32bf-b3bf51d9f800/00606949351229.rgb.jpg",
    ),
    duration: "5:21",
    genre: "Хип-хоп",
  },
  {
    id: "t32",
    title: "Stronger",
    artist: "Kanye West",
    cover: itunesCover(
      "Music128/v4/39/25/2d/39252d65-2d50-b991-0962-f7a98a761271/00602517483507.rgb.jpg",
    ),
    duration: "5:12",
    genre: "Хип-хоп",
  },
  {
    id: "t33",
    title: "Mask Off",
    artist: "Future",
    cover: itunesCover(
      "Music111/v4/e1/fe/9d/e1fe9d22-2a74-cb1d-03c7-d804f471b160/886446376899.jpg",
    ),
    duration: "3:24",
    genre: "Хип-хоп",
  },
  {
    id: "t34",
    title: "a lot",
    artist: "21 Savage",
    cover: itunesCover(
      "Music124/v4/07/94/f7/0794f7c3-0042-6aa8-022e-ae008868eb75/886447365144.jpg",
    ),
    duration: "4:48",
    genre: "Хип-хоп",
  },
  {
    id: "t35",
    title: "IGOR'S THEME",
    artist: "Tyler, The Creator",
    cover: itunesCover(
      "Music125/v4/0c/06/05/0c060581-6242-6a2a-a677-20170f2cf8da/886447710180.jpg",
    ),
    duration: "3:20",
    genre: "Хип-хоп",
  },
];

export const albums: Album[] = [
  {
    id: "a1",
    title: "Night Shift",
    artist: "SHADOW//CITY",
    cover: unsplash("photo-1614149162883-504ce4d13909"),
    genre: "Фонк",
    year: 2024,
  },
  {
    id: "a2",
    title: "Drift Tape",
    artist: "NITE RUN",
    cover: unsplash("photo-1446057032654-9d8885db76c6"),
    genre: "Фонк",
    year: 2025,
  },
  {
    id: "a3",
    title: "Неоновая пыль",
    artist: "KX WAVE",
    cover: unsplash("photo-1558618666-fcd25c85cd64"),
    genre: "Фонк",
    year: 2023,
  },
  {
    id: "a4",
    title: "Север",
    artist: "Северный Ветер",
    cover: unsplash("photo-1484755560615-a4c64e778a6c"),
    genre: "Инди-рок",
    year: 2022,
  },
  {
    id: "a5",
    title: "Комнаты",
    artist: "Атлас",
    cover: unsplash("photo-1514320291840-2e0a9bf2a9ae"),
    genre: "Инди-рок",
    year: 2024,
  },
  {
    id: "a6",
    title: "Поезд на закат",
    artist: "Монохром",
    cover: unsplash("photo-1501612780327-45045538702b"),
    genre: "Инди-рок",
    year: 2021,
  },
  {
    id: "a7",
    title: "Afterhours",
    artist: "analog.room",
    cover: unsplash("photo-1579546929518-9e396f3cc809"),
    genre: "Электроника",
    year: 2025,
  },
  {
    id: "a8",
    title: "Частоты",
    artist: "NEON 04",
    cover: unsplash("photo-1514525253161-7a46d19cd819"),
    genre: "Электроника",
    year: 2024,
  },
  {
    id: "a9",
    title: "Орбита",
    artist: "GRID",
    cover: unsplash("photo-1598488035139-bdbb2231ce04"),
    genre: "Электроника",
    year: 2023,
  },
  {
    id: "a10",
    title: "DAMN.",
    artist: "Kendrick Lamar",
    cover: itunesCover(
      "Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg",
    ),
    genre: "Хип-хоп",
    year: 2017,
  },
  {
    id: "a11",
    title: "ASTROWORLD",
    artist: "Travis Scott",
    cover: itunesCover(
      "Music125/v4/e7/49/8f/e7498f65-df8f-bead-d6e3-2a8d4d642a79/886447235317.jpg",
    ),
    genre: "Хип-хоп",
    year: 2018,
  },
  {
    id: "a12",
    title: "Scorpion",
    artist: "Drake",
    cover: itunesCover(
      "Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg",
    ),
    genre: "Хип-хоп",
    year: 2018,
  },
  {
    id: "a13",
    title: "2014 Forest Hills Drive",
    artist: "J. Cole",
    cover: itunesCover(
      "Music116/v4/ee/28/67/ee286794-6c33-a8c2-5c37-c04f1cb5e8a6/21UM1IM54415.rgb.jpg",
    ),
    genre: "Хип-хоп",
    year: 2014,
  },
  {
    id: "a14",
    title: "UTOPIA",
    artist: "Travis Scott",
    cover: itunesCover(
      "Music126/v4/7d/4f/94/7d4f9468-56e1-3a2d-7186-c8088170ef58/196871341899.jpg",
    ),
    genre: "Хип-хоп",
    year: 2023,
  },
  {
    id: "a15",
    title: "GNX",
    artist: "Kendrick Lamar",
    cover: itunesCover(
      "Music221/v4/54/28/14/54281424-eece-0935-299d-fdd2ab403f92/24UM1IM28978.rgb.jpg",
    ),
    genre: "Хип-хоп",
    year: 2024,
  },
  {
    id: "a16",
    title: "Graduation",
    artist: "Kanye West",
    cover: itunesCover(
      "Music128/v4/39/25/2d/39252d65-2d50-b991-0962-f7a98a761271/00602517483507.rgb.jpg",
    ),
    genre: "Хип-хоп",
    year: 2007,
  },
  {
    id: "a17",
    title: "IGOR",
    artist: "Tyler, The Creator",
    cover: itunesCover(
      "Music125/v4/0c/06/05/0c060581-6242-6a2a-a677-20170f2cf8da/886447710180.jpg",
    ),
    genre: "Хип-хоп",
    year: 2019,
  },
];

export const waveCards: WaveCard[] = [
  {
    id: "foreign-hiphop",
    title: "Зарубежный\nхип-хоп",
    media: "cover",
    image: itunesCover(
      "Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg",
      400,
    ),
    genre: "Хип-хоп",
  },
  {
    id: "my-flow",
    title: "Мой поток",
    featured: true,
  },
  {
    id: "drake-mix",
    title: "Популярно\nDrake",
    media: "avatar",
    image: itunesCover(
      "Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg",
      400,
    ),
    genre: "Хип-хоп",
  },
  {
    id: "phonk-night",
    title: "Фонк ночью",
    media: "cover",
    image: unsplash("photo-1508700115892-45ecd05ae2ad", 400),
    genre: "Фонк",
  },
];

export const streams: Stream[] = [
  { id: "all", title: "Все мое", cover: userProfile.avatar },
  {
    id: "phonk",
    title: "Фонк",
    cover: unsplash("photo-1508700115892-45ecd05ae2ad", 200),
    genre: "Фонк",
  },
  {
    id: "indie",
    title: "Инди-рок",
    cover: unsplash("photo-1511671782779-c97d3d27a1d4", 200),
    genre: "Инди-рок",
  },
  {
    id: "electro",
    title: "Электроника",
    cover: unsplash("photo-1511379938547-c1f69419868d", 200),
    genre: "Электроника",
  },
  {
    id: "hiphop",
    title: "Хип-хоп",
    cover: itunesCover(
      "Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg",
      200,
    ),
    genre: "Хип-хоп",
  },
];

export const decades: Collection[] = [
  {
    id: "d2010",
    title: "2010-е",
    subtitle: "Хиты десятилетия",
    cover: unsplash("photo-1506157786151-b8491531f063"),
  },
  {
    id: "d2000",
    title: "2000-е",
    subtitle: "Ностальгия",
    cover: unsplash("photo-1485579149621-3123dd979885"),
  },
  {
    id: "d1990",
    title: "90-е",
    subtitle: "Классика",
    cover: unsplash("photo-1571330735066-03aaa9429d89"),
  },
  {
    id: "d1980",
    title: "80-е",
    subtitle: "Синты и гитары",
    cover: unsplash("photo-1510915361894-db8b60106cb1"),
  },
];

export const neuroPrompts = [
  "Расскажи мне, что происходит",
  "Еду в наушниках",
  "Нужна энергия",
  "Спокойный вечер",
];

export const playlists: Playlist[] = [
  {
    id: "pl-hh-gym",
    title: "Зал и басы",
    description: "Хип-хоп для тренировки",
    cover: unsplash("photo-1517836357463-d25dfeac3438"),
    genre: "Хип-хоп",
    mood: "тренировка",
    editorial: true,
    trackIds: ["t16", "t20", "t24", "t17", "t31", "t33"],
  },
  {
    id: "pl-hh-work",
    title: "В наушниках",
    description: "Фон для работы",
    cover: unsplash("photo-1486312338219-ce68d2c6f44d"),
    genre: "Хип-хоп",
    mood: "работа",
    editorial: true,
    trackIds: ["t19", "t32", "t34", "t23", "t29", "t20"],
  },
  {
    id: "pl-hh-sad",
    title: "Поздний район",
    description: "Когда накрывает тишина",
    cover: unsplash("photo-1493246507139-91e8fad9978e"),
    genre: "Хип-хоп",
    mood: "грусть",
    editorial: true,
    trackIds: ["t25", "t27", "t26", "t35", "t19", "t18"],
  },
  {
    id: "pl-hh-party",
    title: "Квартирник",
    description: "Хип-хоп на вечеринку",
    cover: unsplash("photo-1492684223066-81342ee5ff30"),
    genre: "Хип-хоп",
    mood: "вечеринка",
    editorial: true,
    trackIds: ["t18", "t22", "t30", "t28", "t21", "t17"],
  },
  {
    id: "pl-hh-night",
    title: "Город не спит",
    description: "Хип-хоп после полуночи",
    cover: unsplash("photo-1470229722913-7c0e2dbbafd3"),
    genre: "Хип-хоп",
    mood: "вечеринка",
    editorial: true,
    trackIds: ["t17", "t21", "t29", "t23", "t33", "t18"],
  },
  {
    id: "pl-hh-mic",
    title: "Микрофон",
    description: "Чистый флоу и панчи",
    cover: unsplash("photo-1511379938547-c1f69419868d"),
    genre: "Хип-хоп",
    mood: "работа",
    editorial: true,
    trackIds: ["t16", "t19", "t24", "t26", "t31", "t34"],
  },
  {
    id: "pl-hh-west",
    title: "Westside",
    description: "Побережье и 808",
    cover: unsplash("photo-1429962714451-bb934ecdc4ec"),
    genre: "Хип-хоп",
    mood: "тренировка",
    editorial: true,
    trackIds: ["t32", "t29", "t33", "t17", "t18", "t20"],
  },
  {
    id: "pl-hh-rain",
    title: "Дождь на асфальте",
    description: "Медленный хип-хоп",
    cover: unsplash("photo-1471478331149-c72f17e33c73"),
    genre: "Хип-хоп",
    mood: "грусть",
    editorial: true,
    trackIds: ["t25", "t27", "t35", "t26", "t19", "t23"],
  },
  {
    id: "pl-hh-court",
    title: "Площадка",
    description: "Баскет и басы",
    cover: unsplash("photo-1514525253161-7a46d19cd819"),
    genre: "Хип-хоп",
    mood: "тренировка",
    editorial: true,
    trackIds: ["t24", "t28", "t31", "t16", "t21", "t33"],
  },
  {
    id: "pl-hh-vinyl",
    title: "Кирпичи",
    description: "Классика без спешки",
    cover: unsplash("photo-1485579149621-3123dd979885"),
    genre: "Хип-хоп",
    mood: "работа",
    editorial: true,
    trackIds: ["t31", "t32", "t19", "t16", "t26", "t25"],
  },
  {
    id: "pl-hh-lights",
    title: "Неон",
    description: "Клубный хип-хоп",
    cover: unsplash("photo-1507838153414-b4b713384a76"),
    genre: "Хип-хоп",
    mood: "вечеринка",
    editorial: true,
    trackIds: ["t22", "t30", "t28", "t21", "t18", "t17"],
  },
  {
    id: "pl-hh-drive",
    title: "Ночная трасса",
    description: "В наушниках за рулём",
    cover: unsplash("photo-1614149162883-504ce4d13909"),
    genre: "Хип-хоп",
    mood: "грусть",
    editorial: true,
    trackIds: ["t29", "t23", "t27", "t35", "t34", "t20"],
  },
  {
    id: "pl-ph-gym",
    title: "Дрифт",
    description: "Фонк в темпе",
    cover: unsplash("photo-1508700115892-45ecd05ae2ad"),
    genre: "Фонк",
    mood: "тренировка",
    trackIds: ["t1", "t4", "t2", "t5", "t3", "t1"],
  },
  {
    id: "pl-ph-work",
    title: "Ночной код",
    description: "Фонк без отвлечения",
    cover: unsplash("photo-1614613535308-eb5fbd3d2c17"),
    genre: "Фонк",
    mood: "работа",
    trackIds: ["t2", "t3", "t1", "t5", "t4", "t2"],
  },
  {
    id: "pl-ph-sad",
    title: "Туман",
    description: "Медленный фонк",
    cover: unsplash("photo-1557672172-298e090bd0f1"),
    genre: "Фонк",
    mood: "грусть",
    trackIds: ["t3", "t5", "t1", "t2", "t4", "t3"],
  },
  {
    id: "pl-ph-party",
    title: "Afterparty",
    description: "Cowbell до утра",
    cover: unsplash("photo-1571330735066-03aaa9429d89"),
    genre: "Фонк",
    mood: "вечеринка",
    trackIds: ["t2", "t4", "t5", "t1", "t3", "t2"],
  },
  {
    id: "pl-in-gym",
    title: "Горизонт",
    description: "Инди для движения",
    cover: unsplash("photo-1487180144351-b8472da7d491"),
    genre: "Инди-рок",
    mood: "тренировка",
    trackIds: ["t10", "t9", "t6", "t8", "t7", "t10"],
  },
  {
    id: "pl-in-work",
    title: "Фокус",
    description: "Гитары на фоне задач",
    cover: unsplash("photo-1511671782779-c97d3d27a1d4"),
    genre: "Инди-рок",
    mood: "работа",
    trackIds: ["t6", "t8", "t7", "t10", "t9", "t6"],
  },
  {
    id: "pl-in-sad",
    title: "Тихие комнаты",
    description: "Когда хочется тише",
    cover: unsplash("photo-1471478331149-c72f17e33c73"),
    genre: "Инди-рок",
    mood: "грусть",
    trackIds: ["t7", "t8", "t6", "t9", "t10", "t7"],
  },
  {
    id: "pl-in-party",
    title: "Лето не кончится",
    description: "Инди на веранде",
    cover: unsplash("photo-1470225620780-dba8ba36b745"),
    genre: "Инди-рок",
    mood: "вечеринка",
    trackIds: ["t9", "t10", "t6", "t8", "t7", "t9"],
  },
  {
    id: "pl-el-gym",
    title: "Voltage",
    description: "Электроника для кардио",
    cover: unsplash("photo-1514525253161-7a46d19cd819"),
    genre: "Электроника",
    mood: "тренировка",
    trackIds: ["t14", "t11", "t13", "t12", "t15", "t14"],
  },
  {
    id: "pl-el-work",
    title: "Дип-фокус",
    description: "Пульс без слов",
    cover: unsplash("photo-1511379938547-c1f69419868d"),
    genre: "Электроника",
    mood: "работа",
    trackIds: ["t11", "t15", "t12", "t13", "t14", "t11"],
  },
  {
    id: "pl-el-sad",
    title: "Afterglow",
    description: "Ночь после клуба",
    cover: unsplash("photo-1574169208507-84376144848b"),
    genre: "Электроника",
    mood: "грусть",
    trackIds: ["t12", "t15", "t13", "t11", "t14", "t12"],
  },
  {
    id: "pl-el-party",
    title: "Сигнал",
    description: "Электроника на танцпол",
    cover: unsplash("photo-1507838153414-b4b713384a76"),
    genre: "Электроника",
    mood: "вечеринка",
    trackIds: ["t13", "t14", "t11", "t12", "t15", "t13"],
  },
];

export const topArtists: TopArtist[] = [
  {
    id: "ar-drake",
    name: "Drake",
    avatar: wikiThumb(
      "1/15",
      "Drake_at_The_Carter_Effect_2017_(36818935200)_(cropped).jpg",
    ),
    monthlyListeners: "84 млн",
    genre: "Хип-хоп",
  },
  {
    id: "ar-kendrick",
    name: "Kendrick Lamar",
    avatar: wikiThumb(
      "1/18",
      "KendrickSZASPurs230725-144_(cropped)_desaturated.jpg",
    ),
    monthlyListeners: "71 млн",
    genre: "Хип-хоп",
  },
  {
    id: "ar-travis",
    name: "Travis Scott",
    avatar: wikiThumb("1/14", "Travis_Scott_-_Openair_Frauenfeld_2019_08.jpg"),
    monthlyListeners: "63 млн",
    genre: "Хип-хоп",
  },
  {
    id: "ar-tyler",
    name: "Tyler, The Creator",
    avatar: wikiThumb("f/fe", "Tyler_The_Creator_Toronto_2025_(cropped).jpg"),
    monthlyListeners: "48 млн",
    genre: "Хип-хоп",
  },
  {
    id: "ar-cole",
    name: "J. Cole",
    avatar: wikiThumb(
      "6/69",
      "HOTSPOTATL_-_21_Savage_&_J.Cole_Light_Birthday_Bash_ATL_2023_On_FIRE_(xu6HKf40MX0_-_2m38s)_(cropped).jpg",
    ),
    monthlyListeners: "41 млн",
    genre: "Хип-хоп",
  },
  {
    id: "ar-shadow",
    name: "SHADOW//CITY",
    avatar: unsplash("photo-1508700115892-45ecd05ae2ad", 200),
    monthlyListeners: "1,4 млн",
    genre: "Фонк",
  },
  {
    id: "ar-nite",
    name: "NITE RUN",
    avatar: unsplash("photo-1571330735066-03aaa9429d89", 200),
    monthlyListeners: "890 тыс.",
    genre: "Фонк",
  },
  {
    id: "ar-kx",
    name: "KX WAVE",
    avatar: unsplash("photo-1557672172-298e090bd0f1", 200),
    monthlyListeners: "670 тыс.",
    genre: "Фонк",
  },
  {
    id: "ar-cruiser",
    name: "CRUISER",
    avatar: unsplash("photo-1614613535308-eb5fbd3d2c17", 200),
    monthlyListeners: "520 тыс.",
    genre: "Фонк",
  },
  {
    id: "ar-sever",
    name: "Северный Ветер",
    avatar: unsplash("photo-1511671782779-c97d3d27a1d4", 200),
    monthlyListeners: "430 тыс.",
    genre: "Инди-рок",
  },
  {
    id: "ar-atlas",
    name: "Атлас",
    avatar: unsplash("photo-1471478331149-c72f17e33c73", 200),
    monthlyListeners: "310 тыс.",
    genre: "Инди-рок",
  },
  {
    id: "ar-mono",
    name: "Монохром",
    avatar: unsplash("photo-1510915361894-db8b60106cb1", 200),
    monthlyListeners: "280 тыс.",
    genre: "Инди-рок",
  },
  {
    id: "ar-analog",
    name: "analog.room",
    avatar: unsplash("photo-1511379938547-c1f69419868d", 200),
    monthlyListeners: "1,1 млн",
    genre: "Электроника",
  },
  {
    id: "ar-neon",
    name: "NEON 04",
    avatar: unsplash("photo-1574169208507-84376144848b", 200),
    monthlyListeners: "860 тыс.",
    genre: "Электроника",
  },
  {
    id: "ar-grid",
    name: "GRID",
    avatar: unsplash("photo-1598488035139-bdbb2231ce04", 200),
    monthlyListeners: "540 тыс.",
    genre: "Электроника",
  },
];

const RECENTLY_PLAYED_IDS = ["t16", "t18", "t19", "t1", "t11", "t6"] as const;

function byId<T extends { id: string }>(items: T[], ids: readonly string[]) {
  const map = new Map(items.map((item) => [item.id, item]));
  return ids.flatMap((id) => {
    const item = map.get(id);
    return item ? [item] : [];
  });
}

export function inferTasteGenre(recent: Track[]): Genre {
  const counts = new Map<Genre, number>();
  for (const track of recent) {
    counts.set(track.genre, (counts.get(track.genre) ?? 0) + 1);
  }

  let winner: Genre = recent[0]?.genre ?? GENRES[0];
  let best = 0;
  for (const track of recent) {
    const count = counts.get(track.genre) ?? 0;
    if (count > best) {
      best = count;
      winner = track.genre;
    }
  }
  return winner;
}

export function getPlaylistTracks(playlist: Playlist): Track[] {
  return byId(tracks, playlist.trackIds);
}

export function getPersonalizedFeed(activeGenre?: string): PersonalizedFeed {
  const recentlyPlayed = byId(tracks, RECENTLY_PLAYED_IDS).slice(0, 6);
  const tasteGenre =
    activeGenre && GENRES.includes(activeGenre as Genre)
      ? (activeGenre as Genre)
      : inferTasteGenre(recentlyPlayed);

  const pool = tracks.filter((track) => track.genre === tasteGenre);
  const albumPool = albums.filter((album) => album.genre === tasteGenre);
  const tastePlaylists = playlists.filter(
    (playlist) => playlist.genre === tasteGenre,
  );
  const moods = MOODS.filter((mood) =>
    tastePlaylists.some((playlist) => playlist.mood === mood),
  );

  const newestAlbum = [...albumPool].sort((a, b) => b.year - a.year)[0];
  const featuredTrack = pool[0] ?? tracks[0];
  const featuredSource = newestAlbum ?? featuredTrack;
  const featuredArtist = topArtists.find(
    (artist) => artist.name === featuredSource.artist,
  );

  return {
    recentlyPlayed,
    featured: {
      artist: featuredSource.artist,
      artistAvatar: featuredArtist?.avatar ?? featuredSource.cover,
      title: featuredSource.title,
      cover: featuredSource.cover,
      kind: newestAlbum ? (newestAlbum.kind ?? "Альбом") : "Сингл",
    },
    forYou: pool,
    newReleases: pool.slice(0, 8),
    popularAlbums: albumPool,
    decades,
    russianRap: albums.filter((album) => album.genre === "Хип-хоп"),
    playlistTracks: pool.slice(0, 5),
    tasteGenre,
    playlists: tastePlaylists,
    playlistShelves: [
      {
        id: "shelf-gym",
        title: "Плейлист для тренировки",
        subtitle: "Один сет — сразу в работу",
        layout: "expanded",
        playlists: playlists
          .filter((playlist) => playlist.mood === "тренировка")
          .slice(0, 1),
      },
      {
        id: "shelf-work",
        title: "Фон для работы",
        subtitle: "Четыре спокойные подборки",
        layout: "grid",
        playlists: playlists
          .filter((playlist) => playlist.mood === "работа")
          .slice(0, 4),
      },
      {
        id: "shelf-sad",
        title: "Тихий вечер",
        subtitle: "Выбор редакции",
        layout: "banner",
        playlists: playlists
          .filter((playlist) => playlist.mood === "грусть")
          .slice(0, 1),
      },
      {
        id: "shelf-party",
        title: "Чарт вечеринки",
        subtitle: "Что включают сейчас",
        layout: "chart",
        playlists: playlists
          .filter((playlist) => playlist.mood === "вечеринка")
          .slice(0, 1),
      },
      {
        id: "shelf-editorial",
        title: "Ещё от редакции",
        subtitle: "Короткий ряд, если остались силы",
        layout: "rail",
        playlists: playlists.filter((playlist) => playlist.editorial).slice(0, 5),
      },
    ],
    moods,
    topArtists: topArtists.filter((artist) => artist.genre === tasteGenre),
  };
}
