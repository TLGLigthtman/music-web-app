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
};

export type PersonalizedFeed = {
  recentlyPlayed: Track[];
  forYou: Track[];
  popularAlbums: Album[];
};

const unsplash = (photoId: string, size = 640) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;

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
    title: "Районы",
    artist: "ВОЛК",
    cover: unsplash("photo-1493225457124-a3eb161ffa5f"),
    duration: "2:47",
    genre: "Хип-хоп",
  },
  {
    id: "t17",
    title: "200 км/ч",
    artist: "МСК",
    cover: unsplash("photo-1485579149621-3123dd979885"),
    duration: "3:21",
    genre: "Хип-хоп",
  },
  {
    id: "t18",
    title: "Дым",
    artist: "Чёрный Лёд",
    cover: unsplash("photo-1516280440614-37939bbacd81"),
    duration: "2:54",
    genre: "Хип-хоп",
  },
  {
    id: "t19",
    title: "Фристайл",
    artist: "Апрель",
    cover: unsplash("photo-1506157786151-b8491531f063"),
    duration: "3:36",
    genre: "Хип-хоп",
  },
  {
    id: "t20",
    title: "Ночной город",
    artist: "EAST SIDE",
    cover: unsplash("photo-1524368535928-5b5e00ddc76b"),
    duration: "3:08",
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
    title: "Районы-кварталы",
    artist: "ВОЛК",
    cover: unsplash("photo-1493225457124-a3eb161ffa5f"),
    genre: "Хип-хоп",
    year: 2025,
  },
  {
    id: "a11",
    title: "Чёрный лёд",
    artist: "Чёрный Лёд",
    cover: unsplash("photo-1571974599782-87624638275e"),
    genre: "Хип-хоп",
    year: 2024,
  },
  {
    id: "a12",
    title: "EAST",
    artist: "EAST SIDE",
    cover: unsplash("photo-1516280440614-37939bbacd81"),
    genre: "Хип-хоп",
    year: 2023,
  },
];

const RECENTLY_PLAYED_IDS = ["t1", "t16", "t11", "t6", "t3", "t18"] as const;

function byId<T extends { id: string }>(items: T[], ids: readonly string[]) {
  const map = new Map(items.map((item) => [item.id, item]));
  return ids.flatMap((id) => {
    const item = map.get(id);
    return item ? [item] : [];
  });
}

export function getPersonalizedFeed(activeGenre?: string): PersonalizedFeed {
  const genre =
    activeGenre && GENRES.includes(activeGenre as Genre)
      ? (activeGenre as Genre)
      : undefined;

  const recentlyPlayed = byId(tracks, RECENTLY_PLAYED_IDS).slice(0, 6);

  const forYou = genre
    ? tracks.filter((track) => track.genre === genre)
    : GENRES.flatMap((g) =>
        tracks.filter((track) => track.genre === g).slice(0, 2),
      );

  const popularAlbums = genre
    ? albums.filter((album) => album.genre === genre)
    : albums;

  return {
    recentlyPlayed,
    forYou,
    popularAlbums,
  };
}
