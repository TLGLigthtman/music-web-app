"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Briefcase,
  CloudRain,
  Dumbbell,
  Ellipsis,
  Heart,
  House,
  Library,
  Pause,
  Play,
  PartyPopper,
  User,
} from "lucide-react";
import {
  getPersonalizedFeed,
  getPlaylistTracks,
  userProfile,
  waveCards,
  type Genre,
  type Mood,
  type Playlist,
  type TopArtist,
  type Track,
  type WaveCard,
  type Album,
  type FeaturedRelease,
  type PlaylistShelf,
} from "@/data/mockData";

type TabId = "home" | "collection" | "profile";

const hideScrollbar =
  "no-scrollbar overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const WAVE_LOOP_COPIES = 5;

const tabs: { id: TabId; label: string; icon: typeof House }[] = [
  { id: "home", label: "Главная", icon: House },
  { id: "collection", label: "Коллекция", icon: Library },
  { id: "profile", label: "Профиль", icon: User },
];

const moodIcons: Record<Mood, typeof Dumbbell> = {
  тренировка: Dumbbell,
  работа: Briefcase,
  грусть: CloudRain,
  вечеринка: PartyPopper,
};

function tracksCountLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} трек`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} трека`;
  }
  return `${count} треков`;
}

export default function Home() {
  const [activeGenre, setActiveGenre] = useState<Genre | undefined>();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const feed = useMemo(
    () => getPersonalizedFeed(activeGenre),
    [activeGenre],
  );
  const nowPlaying = feed.recentlyPlayed[0];

  const openCatalog = () => {
    setActiveTab("collection");
    setTabBarVisible(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      const fromBottom =
        document.documentElement.scrollHeight - window.innerHeight - y;
      if (y < 16 || fromBottom < 64) {
        setTabBarVisible(true);
        return;
      }
      if (delta > 8) setTabBarVisible(false);
      if (delta < -8) setTabBarVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-[#04060a] pb-40 text-white select-none [-webkit-tap-highlight-color:transparent]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-10 h-64 w-64 rounded-full bg-[#ff4fa3]/18 blur-[90px]" />
          <div className="absolute right-[-80px] top-24 h-72 w-72 rounded-full bg-[#c6ff3d]/16 blur-[100px]" />
          <div className="absolute bottom-40 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#3b82f6]/12 blur-[80px]" />
          <div className="noise absolute inset-0" />
        </div>

        {activeTab === "home" ? (
          <HomeFeed
            feed={feed}
            playing={playing}
            onTogglePlay={() => setPlaying((value) => !value)}
            onSelectGenre={setActiveGenre}
            onOpenCatalog={openCatalog}
          />
        ) : (
          <PlaceholderScreen
            title={activeTab === "collection" ? "Коллекция" : "Профиль"}
            subtitle={
              activeTab === "collection"
                ? `Любимые жанры: ${userProfile.favoriteGenres.join(", ")}`
                : userProfile.name
            }
            variant={activeTab}
          />
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-md flex-col px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-6">
        {nowPlaying ? (
          <div className="chrome-glass press relative overflow-hidden rounded-[28px] px-3 py-2 backdrop-blur-[32px] backdrop-saturate-150">
            <div className="flex w-full items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={nowPlaying.cover}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium">
                  {nowPlaying.title}
                </span>
                <span className="block truncate text-[12px] text-white/50">
                  {nowPlaying.artist}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setLiked((value) => !value)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 press"
                aria-label="Нравится"
              >
                <Heart
                  size={16}
                  className={liked ? "fill-[#c6ff3d] text-[#c6ff3d]" : "text-white/80"}
                />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black press"
                aria-label={playing ? "Пауза" : "Играть"}
              >
                {playing ? (
                  <Pause size={16} fill="currentColor" />
                ) : (
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                )}
              </button>
            </div>
            <div className="mt-2 px-2">
              <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                <div className="absolute inset-y-0 left-0 w-[62%] bg-white" />
                <div className="absolute top-1/2 left-[62%] h-2 w-1 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_white]" />
              </div>
            </div>
          </div>
        ) : null}

        <div
          aria-hidden
          className={`transition-[height,margin] duration-300 ease-out ${
            tabBarVisible ? "mt-1 h-14" : "mt-0 h-0"
          }`}
        />
        <nav
          className={`chrome-glass absolute inset-x-3 flex h-14 items-center rounded-full p-0.5 backdrop-blur-[32px] backdrop-saturate-150 transition-[bottom] duration-300 ease-out ${
            tabBarVisible
              ? "bottom-[max(12px,env(safe-area-inset-bottom))]"
              : "pointer-events-none bottom-[calc(-64px-max(12px,env(safe-area-inset-bottom)))]"
          }`}
          aria-hidden={!tabBarVisible}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setTabBarVisible(true);
                }}
                tabIndex={tabBarVisible ? 0 : -1}
                className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full ${
                  isActive
                    ? "bg-white/25 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                    : "text-white/50"
                }`}
              >
                <Icon size={18} strokeWidth={2} fill="currentColor" />
                <span className="text-[10px] font-medium tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function HomeFeed({
  feed,
  playing,
  onTogglePlay,
  onSelectGenre,
  onOpenCatalog,
}: {
  feed: ReturnType<typeof getPersonalizedFeed>;
  playing: boolean;
  onTogglePlay: () => void;
  onSelectGenre: (genre?: Genre) => void;
  onOpenCatalog: () => void;
}) {
  return (
    <main className="relative flex flex-col">
      <Hero
        playing={playing}
        onTogglePlay={onTogglePlay}
        onSelectGenre={onSelectGenre}
      />

      <section>
        <SectionHeading title="Слушали недавно" />
        <div className={`flex gap-4 px-5 ${hideScrollbar}`}>
          {feed.recentlyPlayed.map((track) => (
            <SquareCard
              key={track.id}
              title={track.title}
              subtitle={track.artist}
              cover={track.cover}
              size="lg"
            />
          ))}
        </div>
      </section>

      <NoughtiesHipHopCard />

      <TasteFeed key={feed.tasteGenre} feed={feed} />

      <div className="mt-10 flex flex-col gap-10">
        <section>
          <SectionHeading
            title="Новинки"
            subtitle="От ваших любимых"
          />
          <div className="px-5">
            <FeaturedCard release={feed.featured} />
          </div>
        </section>

        <CarouselSection title="Больше новинок">
          {feed.newReleases.map((track) => (
            <SquareCard
              key={track.id}
              title={track.title}
              subtitle={track.artist}
              cover={track.cover}
            />
          ))}
        </CarouselSection>

        <section>
          <SectionHeading title="Назад во времени" />
          <div className="grid grid-cols-2 gap-4 px-5">
            {feed.decades.map((item) => (
              <SquareCard
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                cover={item.cover}
                fill
              />
            ))}
          </div>
        </section>

        {feed.playlistShelves.map((shelf) => (
          <PlaylistShelfBlock key={shelf.id} shelf={shelf} />
        ))}

        <CatalogPeek
          covers={feed.popularAlbums.slice(0, 3).map((album) => album.cover)}
          onOpen={onOpenCatalog}
        />
      </div>
    </main>
  );
}

function NoughtiesHipHopCard() {
  return (
    <section className="mt-10 px-4">
      <button
        type="button"
        className="wiki-fact press relative flex w-full items-stretch gap-3 overflow-hidden rounded-[24px] p-4 text-left"
        aria-label="Играть Хип-хоп нулевых"
      >
        <span aria-hidden className="wiki-fact-bg" />
        <span aria-hidden className="wiki-fact-glow" />
        <span className="relative aspect-square w-[min(144px,40%)] shrink-0 overflow-hidden rounded-[12px]">
          <Image
            src="/wiki/noughties-cover.jpg"
            alt=""
            fill
            sizes="144px"
            className="object-cover"
          />
        </span>
        <span className="relative flex min-w-0 flex-1 flex-col justify-between py-1.5">
          <span className="min-w-0">
            <span className="block font-heading text-[22px] font-bold leading-[24px] text-white">
              Хип-хоп нулевых
            </span>
            <span className="mt-1 block text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white/60 mix-blend-plus-lighter">
              95% совпадение · 1ч 25мин
            </span>
          </span>
          <span className="size-10 shrink-0">
            <img
              src="/wiki/play-xs.svg"
              alt=""
              width={40}
              height={40}
              className="size-10"
            />
          </span>
        </span>
      </button>
    </section>
  );
}

const VIBE_PLAYLISTS = [
  {
    id: "vibe-work",
    tone: "work" as const,
    title: "Рабочий микс",
    meta: "95% совпадение · 1 ч 25 мин",
    tracks: [
      { title: "SKI", artist: "Young Thug", cover: "/vibe/ski.jpg" },
      { title: "Janice STFU", artist: "Drake", cover: "/vibe/glove.jpg" },
    ],
    more: ["/vibe/glove.jpg", "/vibe/eyes.jpg"] as const,
  },
  {
    id: "vibe-walk",
    tone: "walk" as const,
    title: "Для прогулки",
    meta: "91% совпадения · 1 ч 25 мин",
    tracks: [
      { title: "SKI", artist: "Young Thug", cover: "/vibe/eyes.jpg" },
      { title: "Janice STFU", artist: "Drake", cover: "/vibe/street.jpg" },
    ],
    more: ["/vibe/portrait.jpg", "/vibe/vinyl.jpg"] as const,
  },
];

function VibeBlock() {
  return (
    <section>
      <div className="flex min-h-16 flex-col justify-center gap-1 px-4 py-2">
        <h2 className="font-heading text-[24px] font-bold leading-[26px] tracking-[-0.01em] text-white">
          Какой сейчас вайб?
        </h2>
        <p className="text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white/60">
          Собрали 2 плейлиста по твоему настроению
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-2 px-4">
        {VIBE_PLAYLISTS.map((playlist) => (
          <VibePlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
}

function VibePlaylistCard({
  playlist,
}: {
  playlist: (typeof VIBE_PLAYLISTS)[number];
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="vibe-card relative flex flex-col overflow-hidden rounded-[24px] pt-2 pb-4">
      <span
        aria-hidden
        className={`absolute inset-0 rounded-[24px] ${
          playlist.tone === "work" ? "vibe-card-work" : "vibe-card-walk"
        }`}
      />
      <span aria-hidden className="wiki-fact-glow" />

      <div className="relative grid grid-cols-[1fr_1fr_0.574fr] gap-2 px-2">
        {playlist.tracks.map((track) => (
          <span
            key={track.title}
            className="relative aspect-square min-w-0 overflow-hidden rounded-[20px]"
          >
            <Image
              src={track.cover}
              alt=""
              fill
              sizes="160px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            <span className="absolute inset-x-2 bottom-2 flex flex-col">
              <span className="truncate text-[11px] font-medium leading-[14px] text-white">
                {track.title}
              </span>
              <span className="truncate text-[10px] font-medium leading-[14px] text-white/60">
                {track.artist}
              </span>
            </span>
          </span>
        ))}
        <VibeMorePeek covers={playlist.more} />
      </div>

      <div className="relative mt-3 flex h-10 shrink-0 items-center justify-between px-4">
        <div className="min-w-0 flex-1 pr-3">
          <p className="truncate font-heading text-[16px] font-bold leading-5 tracking-[-0.02em] text-white">
            {playlist.title}
          </p>
          <p className="truncate text-[11px] font-medium leading-[14px] text-[#858689]">
            {playlist.meta}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="press flex size-6 items-center justify-center"
            aria-label={saved ? "Удалить из коллекции" : "Сохранить"}
            onClick={() => setSaved((value) => !value)}
          >
            {saved ? (
              <Heart size={22} className="fill-white text-white" />
            ) : (
              <img
                src="/vibe/heart.svg"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            )}
          </button>
          <button
            type="button"
            className="press size-10"
            aria-label={`Играть ${playlist.title}`}
          >
            <img
              src="/wiki/play-xs.svg"
              alt=""
              width={40}
              height={40}
              className="size-10"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function VibeMorePeek({ covers }: { covers: readonly [string, string] }) {
  return (
    <span className="relative min-h-0 min-w-0 overflow-hidden rounded-[20px] bg-black">
      <img
        alt=""
        src={covers[1]}
        className="absolute left-[-21%] top-[-17%] aspect-square w-[138%] rounded-[22px] object-cover blur-md"
      />
      <span className="absolute left-[32%] top-[29%] aspect-square w-[52%] rotate-[15deg] overflow-hidden rounded-[10px]">
        <img alt="" src={covers[0]} className="size-full object-cover" />
      </span>
      <span className="absolute left-[12%] top-[7%] aspect-square w-[76%] overflow-hidden rounded-[12px]">
        <img alt="" src={covers[1]} className="size-full object-cover" />
      </span>
      <span className="absolute left-[12%] top-[69%] flex w-[53%] flex-col">
        <span className="truncate text-[11px] font-medium leading-[14px] text-white">
          +24
        </span>
        <span className="text-[10px] font-medium leading-[14px] text-white/60">
          Трека
        </span>
      </span>
    </span>
  );
}

function CatalogPeek({
  covers,
  onOpen,
}: {
  covers: string[];
  onOpen: () => void;
}) {
  const left = covers[0];
  const center = covers[1] ?? covers[0];
  const right = covers[2] ?? covers[0];

  return (
    <section className="relative -mb-20 pt-2">
      <div className="flex w-full flex-col items-center">
        <ArrowUp
          size={28}
          strokeWidth={2}
          className="catalog-peek-arrow text-white"
        />
        <span className="mt-2 text-[20px] font-medium tracking-[-0.02em]">
          Каталог
        </span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="press relative mx-auto mt-6 block h-[136px] w-[min(280px,100%)]"
        aria-label="Открыть каталог"
      >
        {left ? (
          <span className="absolute left-0 top-6 z-0 h-[104px] w-[104px] -rotate-[18deg] overflow-hidden rounded-[22px] bg-[#1a1a1c] shadow-[0_20px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
            <Image
              src={left}
              alt=""
              fill
              sizes="104px"
              className="object-cover"
            />
          </span>
        ) : null}
        {right ? (
          <span className="absolute right-0 top-6 z-0 h-[104px] w-[104px] rotate-[18deg] overflow-hidden rounded-[22px] bg-[#1a1a1c] shadow-[0_20px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
            <Image
              src={right}
              alt=""
              fill
              sizes="104px"
              className="object-cover"
            />
          </span>
        ) : null}
        {center ? (
          <span className="absolute left-1/2 top-0 z-10 h-[116px] w-[116px] -translate-x-1/2 rotate-[6deg] overflow-hidden rounded-[24px] bg-[#1a1a1c] shadow-[0_24px_48px_rgba(0,0,0,0.75)] ring-1 ring-white/12">
            <Image
              src={center}
              alt=""
              fill
              sizes="116px"
              className="object-cover"
            />
          </span>
        ) : null}
        <span className="pointer-events-none absolute inset-x-[-64px] -bottom-16 top-12 bg-gradient-to-t from-[#04060a] from-[5%] via-[#04060a]/80 via-[45%] to-transparent" />
        <span className="pointer-events-none absolute inset-x-[-96px] -bottom-16 h-20 bg-gradient-to-t from-[#04060a] to-transparent" />
      </button>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 px-5">
      <h2 className="font-heading text-[24px] font-bold leading-[26px] tracking-[-0.01em] text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white/60">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TasteFeed({
  feed,
}: {
  feed: ReturnType<typeof getPersonalizedFeed>;
}) {
  const [mood, setMood] = useState<Mood | undefined>();
  const [selectedId, setSelectedId] = useState(feed.playlists[0]?.id);

  useEffect(() => {
    setMood(undefined);
    setSelectedId(feed.playlists[0]?.id);
  }, [feed.tasteGenre, feed.playlists]);

  const visiblePlaylists = mood
    ? feed.playlists.filter((playlist) => playlist.mood === mood)
    : feed.playlists;
  const selectedPlaylist =
    visiblePlaylists.find((playlist) => playlist.id === selectedId) ??
    visiblePlaylists[0];
  const expandedTracks = selectedPlaylist
    ? getPlaylistTracks(selectedPlaylist)
    : [];

  const selectPlaylist = (playlist: Playlist) => {
    setSelectedId(playlist.id);
  };

  return (
    <div className="mt-10 flex flex-col gap-10">
      <section>
        <SectionHeading
          title={`${feed.tasteGenre} для вас`}
          subtitle="Подборки от редакции — не альбомы артистов"
        />
        <div className="grid grid-cols-2 gap-4 px-5">
          {feed.playlists.slice(0, 4).map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              fill
              onSelect={() => selectPlaylist(playlist)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Настроение"
          subtitle={`Из подборок «${feed.tasteGenre.toLowerCase()}»`}
        />
        <div className={`mb-4 flex gap-2 px-5 ${hideScrollbar}`}>
          {feed.moods.map((item) => {
            const Icon = moodIcons[item];
            const isActive = (mood ?? selectedPlaylist?.mood) === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const nextMood = mood === item ? undefined : item;
                  setMood(nextMood);
                  const nextPlaylist = (
                    nextMood
                      ? feed.playlists.filter((playlist) => playlist.mood === nextMood)
                      : feed.playlists
                  )[0];
                  if (nextPlaylist) setSelectedId(nextPlaylist.id);
                }}
                className={`press flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  isActive
                    ? "bg-white text-black glow-rim"
                    : "glass-soft text-white"
                }`}
              >
                <Icon size={16} />
                {item}
              </button>
            );
          })}
        </div>
        {selectedPlaylist ? (
          <div className="px-5">
            <div className="glass mb-3 flex items-center gap-3 rounded-[24px] p-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={selectedPlaylist.cover}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <h2 className="font-heading text-[28px] font-bold leading-none tracking-[-0.03em]">
                  {selectedPlaylist.title}
                </h2>
                <p className="mt-1 truncate text-[12px] text-white/45">
                  {tracksCountLabel(expandedTracks.length)} · {selectedPlaylist.mood}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px] bg-white/6 px-2">
              {expandedTracks.slice(0, 3).map((track, index) => (
                <TrackRow key={`${track.id}-${index}`} track={track} />
              ))}
            </div>
            <button
              type="button"
              className="press mt-3 w-full rounded-full border border-white/15 py-3 text-[14px] font-medium"
            >
              Слушать всё
            </button>
          </div>
        ) : null}
      </section>

      <VibeBlock />

      {feed.popularAlbums.length > 0 ? (
        <section>
          <SectionHeading
            title="Альбомы"
            subtitle="Официальные обложки релизов"
          />
          <div className={`flex gap-4 px-5 ${hideScrollbar}`}>
            {feed.popularAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading
          title="Топ артисты августа"
          subtitle={`В жанре «${feed.tasteGenre.toLowerCase()}»`}
        />
        <div className={`flex gap-4 px-5 ${hideScrollbar}`}>
          {feed.topArtists.map((artist, index) => (
            <TopArtistCard key={artist.id} artist={artist} rank={index + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PlaylistCard({
  playlist,
  onSelect,
  fill = false,
}: {
  playlist: Playlist;
  onSelect?: () => void;
  fill?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`press snap-start text-left ${fill ? "w-full" : "w-[156px] shrink-0"}`}
    >
      <span
        className="relative mb-2 block aspect-square w-full overflow-hidden rounded-[24px] bg-black"
      >
        <Image
          src={playlist.cover}
          alt=""
          fill
          sizes={fill ? "50vw" : "156px"}
          className="object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute inset-x-3 bottom-3 font-heading text-[16px] font-bold leading-tight text-white">
          {playlist.title}
        </span>
      </span>
      <span className="block truncate text-[12px] capitalize text-white/45">
        Плейлист · {playlist.mood}
      </span>
    </button>
  );
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <button
      type="button"
      className="press w-[136px] shrink-0 snap-start text-left"
    >
      <span className="relative mb-2 block aspect-square w-full overflow-hidden rounded-[16px] bg-black shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        <Image
          src={album.cover}
          alt=""
          fill
          sizes="136px"
          className="object-cover"
        />
      </span>
      <span className="block truncate text-[14px] font-medium">{album.title}</span>
      <span className="mt-0.5 block truncate text-[12px] text-white/45">
        {album.artist} · {album.year}
      </span>
    </button>
  );
}

function TopArtistCard({
  artist,
  rank,
}: {
  artist: TopArtist;
  rank: number;
}) {
  return (
    <button
      type="button"
      className="press flex w-[108px] shrink-0 flex-col items-center"
    >
      <span className="relative h-20 w-20">
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-black">
          <Image
            src={artist.avatar}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#c6ff3d] text-[10px] font-bold text-black">
          {rank}
        </span>
      </span>
      <span className="mt-2 w-full truncate text-center text-[12px] font-medium">
        {artist.name}
      </span>
      <span className="w-full truncate text-center text-[11px] text-white/45">
        {artist.monthlyListeners}
      </span>
    </button>
  );
}

function Hero({
  playing,
  onTogglePlay,
  onSelectGenre,
}: {
  playing: boolean;
  onTogglePlay: () => void;
  onSelectGenre: (genre?: Genre) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const featuredIndex = waveCards.findIndex((card) => card.featured);
  const setCount = waveCards.length;
  const middleCopy = Math.floor(WAVE_LOOP_COPIES / 2);
  const startIndex = middleCopy * setCount + Math.max(featuredIndex, 0);
  const [centeredIndex, setCenteredIndex] = useState(startIndex);
  const didInitRef = useRef(false);
  const wrappingRef = useRef(false);
  const loopedWaveCards = useMemo(
    () =>
      Array.from({ length: WAVE_LOOP_COPIES }, (_, copy) =>
        waveCards.map((card) => ({ card, copy })),
      ).flat(),
    [],
  );

  const scrollToIndex = (index: number, smooth = true) => {
    const root = scrollerRef.current;
    const card = root?.querySelectorAll<HTMLElement>("[data-wave-card]")[index];
    if (!root || !card) return;
    const left =
      card.getBoundingClientRect().left -
      root.getBoundingClientRect().left +
      root.scrollLeft -
      (root.clientWidth - card.offsetWidth) / 2;
    root.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const cardsOf = () => [
      ...root.querySelectorAll<HTMLElement>("[data-wave-card]"),
    ];

    const closestIndex = (cards: HTMLElement[]) => {
      const midpoint = root.scrollLeft + root.clientWidth / 2;
      let next = 0;
      let best = Infinity;
      cards.forEach((card, index) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - midpoint);
        if (distance < best) {
          best = distance;
          next = index;
        }
      });
      return next;
    };

    const updateCentered = () => {
      if (wrappingRef.current) return;
      const cards = cardsOf();
      if (cards.length === 0) return;
      setCenteredIndex(closestIndex(cards));
    };

    const normalizeLoop = () => {
      if (wrappingRef.current) return;
      const cards = cardsOf();
      if (cards.length < setCount * 2) return;
      const next = closestIndex(cards);
      const copy = Math.floor(next / setCount);
      if (copy !== 0 && copy !== WAVE_LOOP_COPIES - 1) {
        setCenteredIndex(next);
        return;
      }

      const targetIndex = middleCopy * setCount + (next % setCount);
      const current = cards[next];
      const target = cards[targetIndex];
      if (!current || !target) return;
      const delta = target.offsetLeft - current.offsetLeft;
      if (Math.abs(delta) < 1) {
        setCenteredIndex(targetIndex);
        return;
      }

      wrappingRef.current = true;
      root.classList.add("wave-loop-jump");
      const snap = root.style.scrollSnapType;
      root.style.scrollSnapType = "none";
      root.scrollLeft += delta;
      setCenteredIndex(targetIndex);
      window.requestAnimationFrame(() => {
        root.style.scrollSnapType = snap;
        root.classList.remove("wave-loop-jump");
        wrappingRef.current = false;
      });
    };

    const init = () => {
      const card = cardsOf()[startIndex];
      if (!card) return;
      if (!didInitRef.current || root.scrollLeft < 16) {
        scrollToIndex(startIndex, false);
        didInitRef.current = true;
      }
      updateCentered();
    };

    let settleTimer = 0;
    const onScroll = () => {
      updateCentered();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(normalizeLoop, 120);
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(init);
    });
    const timeout = window.setTimeout(init, 80);
    const retry = window.setTimeout(init, 240);
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("scrollend", normalizeLoop);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.clearTimeout(retry);
      window.clearTimeout(settleTimer);
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("scrollend", normalizeLoop);
    };
  }, [middleCopy, setCount, startIndex]);

  return (
    <header className="relative overflow-x-hidden">
      <div className="relative pt-[max(0px,env(safe-area-inset-top))]">
        <HeroBackdrop />
        <HeroHeader />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex w-full flex-col">
            <div className="mb-[-16px] flex w-full flex-col items-center justify-end px-4 pt-4">
              <WaveBubble>
                Ваш поток здесь не первый раз — и вряд ли последний
              </WaveBubble>
            </div>

            <div className="relative h-[212px] w-full shrink-0">
              <button
                type="button"
                onClick={onTogglePlay}
                className="press absolute left-1/2 top-[36px] flex h-[100px] w-[100px] -translate-x-1/2 items-center justify-center"
                aria-label={playing ? "Пауза" : "Слушать поток"}
              >
                <span
                  aria-hidden
                  className="absolute h-[87.5px] w-[87.5px] rounded-full bg-[#007E3D]"
                />
                {playing ? (
                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-[#007E3D]">
                    <PauseGlyph />
                  </span>
                ) : (
                  <span className="relative block h-full w-full">
                    <PlayGlyph />
                  </span>
                )}
              </button>

              <button
                type="button"
                className="wave-settings press absolute left-1/2 top-[156px] flex h-11 min-w-[72px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full px-5 py-2 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white"
              >
                <span aria-hidden className="wave-settings-bg" />
                <span aria-hidden className="wave-settings-color" />
                <span className="relative z-10">Настроить</span>
              </button>
            </div>
          </div>

          <div className="h-6 w-full" />

          <div
            ref={scrollerRef}
            className={`relative z-10 flex min-h-[160px] min-w-0 w-full snap-x snap-mandatory items-center gap-2.5 px-[calc((100%-160px)/2)] [overflow-anchor:none] ${hideScrollbar}`}
          >
            {loopedWaveCards.map(({ card, copy }, index) => (
              <WaveFlowCard
                key={`${copy}-${card.id}`}
                card={card}
                tilt={
                  index === centeredIndex ? 0 : index < centeredIndex ? 4 : -4
                }
                active={index === centeredIndex}
                onClick={() => {
                  onSelectGenre(card.genre);
                  scrollToIndex(index);
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-[78px] mb-[78px] flex flex-col items-center">
          <MoreForYouChevron />
          <span className="text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white">
            Больше для вас
          </span>
        </div>
      </div>
    </header>
  );
}

function HeroHeader() {
  return (
    <div className="relative z-10 flex h-16 items-center justify-end px-4">
      <button
        type="button"
        className="press flex h-10 w-10 items-center justify-center rounded-full bg-white/12"
        aria-label="Поиск"
      >
        <SearchGlyph />
      </button>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.6904 20.4929L19.5991 18.4016L17.7977 16.6002C18.2648 15.988 18.6553 15.3281 18.9462 14.625C19.3877 13.5576 19.6191 12.4026 19.6191 11.2117C19.6191 10.0203 19.3877 8.86522 18.9462 7.79796C18.5046 6.7307 17.853 5.75121 17.0127 4.91088C16.1724 4.07055 15.1927 3.41894 14.1254 2.97741C13.0581 2.53588 11.9031 2.30444 10.7119 2.30444C9.52075 2.30444 8.36572 2.53589 7.2984 2.97741C6.23108 3.41893 5.25146 4.07055 4.41113 4.91088C3.5708 5.75121 2.91919 6.7307 2.47766 7.79796C2.03613 8.86522 1.80469 10.0203 1.80469 11.2117C1.80445 12.4031 2.03577 13.5581 2.47724 14.6254C2.91871 15.6926 3.57032 16.6721 4.41065 17.5124C5.2793 18.3811 6.28394 19.0327 7.35669 19.467C8.42944 19.9014 9.57031 20.1184 10.7114 20.1179C11.8523 20.1179 12.9933 19.9009 14.0662 19.4667C14.7828 19.1767 15.4645 18.7808 16.1 18.297L17.9019 20.0989L19.9931 22.1901C20.0908 22.2878 20.2187 22.3366 20.3467 22.3366C20.4747 22.3366 20.6026 22.2878 20.7003 22.1901L21.1953 21.6951L21.6904 21.2C21.788 21.1023 21.8369 20.9743 21.8369 20.8464C21.8369 20.7184 21.788 20.5905 21.6904 20.4929ZM10.712 18.1195C8.94225 18.1194 7.17236 17.4456 5.8247 16.0984C5.17333 15.447 4.66833 14.6875 4.32616 13.8597C3.98399 13.032 3.80468 12.136 3.80468 11.2117C3.80468 10.2873 3.98412 9.39135 4.32641 8.56359C4.6687 7.73583 5.17382 6.97631 5.82519 6.32494C6.4768 5.67357 7.23644 5.16845 8.0642 4.82616C8.89196 4.48387 9.78783 4.30443 10.7119 4.30443C11.636 4.30443 12.5319 4.48387 13.3596 4.82616C14.1874 5.16845 14.947 5.67357 15.5986 6.32494C16.25 6.97631 16.7551 7.73583 17.0974 8.56359C17.4397 9.39135 17.6191 10.2873 17.6191 11.2117C17.6191 12.1355 17.4397 13.0315 17.0974 13.8594C16.7551 14.6873 16.25 15.447 15.5986 16.0984C14.2515 17.446 12.4818 18.1196 10.712 18.1195Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#01582a]">
      <div
        className="absolute inset-x-0 h-[800px] w-full"
        style={{ top: "calc(env(safe-area-inset-top, 0px) - 50px)" }}
      >
        <img
          src="/hero/wave-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

const WAVE_BUBBLE_PATH =
  "M210 0C219.319 0 223.978 0.000167183 227.653 1.52246C232.554 3.55234 236.448 7.44612 238.478 12.3467C240 16.0221 240 20.6814 240 30C240 39.3186 240 43.9779 238.478 47.6533C236.448 52.5539 232.554 56.4477 227.653 58.4775C223.978 59.9998 219.319 60 210 60H134.012C129.973 60 127.953 60 126.244 60.8687C126.01 60.9877 125.782 61.1181 125.561 61.2595C123.946 62.2919 122.922 64.0328 120.874 67.5146C120.493 68.1619 119.507 68.1619 119.126 67.5146C117.078 64.0328 116.054 62.2919 114.439 61.2595C114.218 61.1181 113.99 60.9877 113.756 60.8687C112.047 60 110.027 60 105.988 60H30C20.6814 60 16.0221 59.9998 12.3467 58.4775C7.44612 56.4477 3.55234 52.5539 1.52246 47.6533C0.000167183 43.9779 0 39.3186 0 30C0 20.6814 0.000167183 16.0221 1.52246 12.3467C3.55234 7.44612 7.44612 3.55234 12.3467 1.52246C16.0221 0.000167183 20.6814 0 30 0L210 0Z";

function WaveBubble({ children }: { children: ReactNode }) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  return (
    <div className="relative w-full max-w-[240px] px-4 pb-5 pt-3">
      <svg
        aria-hidden
        className="pointer-events-none absolute overflow-visible"
        style={{
          inset: "-24px",
          width: "calc(100% + 48px)",
          height: "calc(100% + 48px)",
        }}
        viewBox="-24 -24 288 116"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={`${uid}-clip`}>
            <path d={WAVE_BUBBLE_PATH} />
          </clipPath>
          <filter
            id={`${uid}-glow`}
            filterUnits="userSpaceOnUse"
            x="-40"
            y="-40"
            width="320"
            height="148"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
        </defs>
        <path className="wave-bubble-shape" d={WAVE_BUBBLE_PATH} />
        <g clipPath={`url(#${uid}-clip)`}>
          <path
            d={WAVE_BUBBLE_PATH}
            fill="none"
            stroke="#92ff59"
            strokeWidth="16"
            strokeOpacity="0.42"
            filter={`url(#${uid}-glow)`}
          />
          <path
            d={WAVE_BUBBLE_PATH}
            fill="none"
            stroke="#92ff59"
            strokeWidth="5"
            strokeOpacity="0.5"
          />
        </g>
      </svg>
      <p className="relative z-10 text-center text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white">
        {children}
      </p>
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="h-full w-full"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C7.36297e-06 22.3858 22.3858 0 50 0ZM41.8649 31.5029C39.6094 30.6397 37.1235 32.0767 36.8181 34.4186L36.7397 35.0133C35.4423 44.9644 35.4423 55.0356 36.7397 64.9867L36.8181 65.5814C37.1235 67.9233 39.6094 69.3603 41.8649 68.4971L42.2904 68.335C52.2318 64.5306 61.5203 59.2727 69.8364 52.7431C71.6318 51.3334 71.6317 48.6685 69.8364 47.2586C61.5203 40.729 52.2318 35.4712 42.2904 31.6668L41.8649 31.5029Z"
        fill="white"
      />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
      <rect x="8" y="7" width="7" height="22" rx="2" fill="currentColor" />
      <rect x="21" y="7" width="7" height="22" rx="2" fill="currentColor" />
    </svg>
  );
}

function MoreForYouChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M16.4513 13.7437L13.2256 10.518L9.99994 7.29235L6.77425 10.518L3.54856 13.7437C3.4672 13.8251 3.36057 13.8658 3.25394 13.8658C3.1473 13.8658 3.04067 13.8251 2.95931 13.7437L2.66474 13.4492L2.37016 13.1546C2.2888 13.0732 2.24813 12.9666 2.24813 12.86C2.24813 12.7533 2.2888 12.6467 2.37016 12.5654L5.89042 9.0451L9.41068 5.52484C9.57339 5.36212 9.78666 5.28076 9.99994 5.28076C10.2132 5.28076 10.4265 5.36212 10.5892 5.52484L14.1095 9.0451L17.6297 12.5654C17.7111 12.6467 17.7517 12.7533 17.7517 12.86C17.7517 12.9666 17.7111 13.0732 17.6297 13.1546L17.3351 13.4492L17.0406 13.7437C16.9592 13.8251 16.8526 13.8658 16.7459 13.8658C16.6393 13.8658 16.5327 13.8251 16.4513 13.7437Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WaveMark() {
  return (
    <img
      src="/hero/stream-mark.svg"
      alt=""
      width={56}
      height={56}
      className="h-14 w-14"
    />
  );
}

function WaveFlowCard({
  card,
  active,
  onClick,
  tilt = 0,
}: {
  card: WaveCard;
  active: boolean;
  onClick: () => void;
  tilt?: number;
}) {
  const size = active ? 160 : 140;

  return (
    <button
      type="button"
      onClick={onClick}
      data-wave-card=""
      data-featured={card.featured ? "true" : undefined}
      className="relative flex shrink-0 snap-center items-center justify-center"
      style={{ width: size, height: size, zIndex: active ? 10 : 1 }}
    >
      <span
        style={{
          width: size,
          height: size,
          transform: active ? "rotate(0deg)" : `rotate(${tilt}deg)`,
        }}
        className="relative block overflow-hidden rounded-[28px] transition-[width,height,transform] duration-300 ease-out"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-[28px] ${
            active ? "wave-plaque-active" : "wave-plaque"
          }`}
        />
        <img
          aria-hidden
          alt=""
          src={active ? "/hero/tooth-glow-160.svg?v=3" : "/hero/tooth-glow-140.svg?v=3"}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <span
          className="absolute left-1/2 z-10 block h-14 w-14 -translate-x-1/2 overflow-hidden"
          style={{ top: active ? 30 : 20 }}
        >
          {card.featured ? (
            <WaveMark />
          ) : card.media === "avatar" ? (
            <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-black">
              {card.image ? (
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : null}
            </span>
          ) : (
            <span className="relative block h-14 w-14 overflow-hidden rounded-[12px] bg-black">
              {card.image ? (
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : null}
            </span>
          )}
        </span>
        <span
          className={`absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center whitespace-pre-line text-center font-heading font-bold ${
            active
              ? "w-[128px] text-[20px] leading-[22px] tracking-[-0.2px] text-white"
              : "w-[112px] text-[17.5px] leading-5 tracking-[-0.175px] text-white/32 mix-blend-plus-lighter"
          }`}
          style={{
            top: active ? "67.5%" : "68.57%",
            bottom: active ? "18.75%" : "17.14%",
          }}
        >
          {card.title}
        </span>
      </span>
    </button>
  );
}

function tasteMatchPercent(id: string) {
  let hash = 0;
  for (const char of id) hash += char.charCodeAt(0);
  return 68 + (hash % 27);
}

function StackedPlaylistCard({ playlist }: { playlist: Playlist }) {
  const tracks = getPlaylistTracks(playlist);
  const left = tracks[1]?.cover ?? tracks[0]?.cover ?? playlist.cover;
  const center = tracks[0]?.cover ?? playlist.cover;
  const right = tracks[2]?.cover ?? left;

  return (
    <button
      type="button"
      className="press overflow-hidden rounded-[28px] bg-gradient-to-t from-[#2c2c2e] to-[#04060a] px-2 pb-5 pt-8 text-center"
    >
      <span className="relative mx-auto block h-32 w-full">
        <span className="absolute left-1/2 top-3 z-0 h-[88px] w-[88px] -translate-x-[78%] -rotate-[16deg] overflow-hidden rounded-[16px] bg-black opacity-80">
          <Image src={left} alt="" fill sizes="88px" className="object-cover" />
        </span>
        <span className="absolute left-1/2 top-3 z-0 h-[88px] w-[88px] -translate-x-[22%] rotate-[16deg] overflow-hidden rounded-[16px] bg-black opacity-80">
          <Image src={right} alt="" fill sizes="88px" className="object-cover" />
        </span>
        <span className="absolute left-1/2 top-0 z-10 h-[104px] w-[104px] -translate-x-1/2 overflow-hidden rounded-[18px] bg-black shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
          <Image src={center} alt="" fill sizes="104px" className="object-cover" />
        </span>
        <span className="absolute left-1/2 top-[72px] z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black">
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </span>
      </span>
      <span className="mt-4 block truncate px-2 text-[16px] font-medium">
        {playlist.title}
      </span>
      <span className="mt-1 block truncate px-2 text-[12px] text-white/45">
        {tracksCountLabel(tracks.length)} · {tasteMatchPercent(playlist.id)}% совпадение
      </span>
    </button>
  );
}

function PlaylistShelfBlock({ shelf }: { shelf: PlaylistShelf }) {
  const playlist = shelf.playlists[0];
  const tracks = playlist ? getPlaylistTracks(playlist).slice(0, 4) : [];

  if (shelf.layout === "grid") {
    return (
      <section>
        <SectionHeading title={shelf.title} subtitle={shelf.subtitle} />
        <div className="grid grid-cols-2 gap-3 px-5">
          {shelf.playlists.map((item) => (
            <StackedPlaylistCard key={item.id} playlist={item} />
          ))}
        </div>
      </section>
    );
  }

  if (shelf.layout === "rail") {
    return (
      <CarouselSection title={shelf.title} subtitle={shelf.subtitle}>
        {shelf.playlists.map((item) => (
          <PlaylistCard key={item.id} playlist={item} />
        ))}
      </CarouselSection>
    );
  }

  if (shelf.layout === "banner" && playlist) {
    return (
      <section>
        <SectionHeading title={shelf.title} subtitle={shelf.subtitle} />
        <div className="px-5">
          <button
            type="button"
            className="press relative block aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-black text-left"
          >
            <Image
              src={playlist.cover}
              alt=""
              fill
              sizes="408px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
              <span className="min-w-0">
                <span className="block text-[12px] capitalize text-white/65">
                  Плейлист · {playlist.mood}
                </span>
                <span className="mt-1 block font-heading text-[28px] font-bold leading-none tracking-[-0.03em]">
                  {playlist.title}
                </span>
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </span>
            </span>
          </button>
        </div>
      </section>
    );
  }

  if (shelf.layout === "chart" && playlist) {
    return (
      <section>
        <SectionHeading title={shelf.title} subtitle={shelf.subtitle} />
        <div className="px-5">
          <div className="overflow-hidden rounded-[24px] bg-white/6 px-2 py-1">
            {tracks.map((track, index) => (
              <TrackRow
                key={`${track.id}-${index}`}
                track={track}
                rank={index + 1}
              />
            ))}
          </div>
          <button
            type="button"
            className="press mt-3 w-full rounded-full border border-white/15 py-3 text-[14px] font-medium"
          >
            Слушать чарт
          </button>
        </div>
      </section>
    );
  }

  if (!playlist) return null;

  return (
    <section>
      <SectionHeading title={shelf.title} subtitle={shelf.subtitle} />
      <div className="px-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[20px] bg-black">
            <Image
              src={playlist.cover}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-[24px] font-bold leading-none tracking-[-0.03em]">
              {playlist.title}
            </p>
            <p className="mt-1.5 truncate text-[12px] capitalize text-white/45">
              {tracksCountLabel(getPlaylistTracks(playlist).length)} · {playlist.mood}
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[24px] bg-white/6 px-2">
          {tracks.slice(0, 3).map((track, index) => (
            <TrackRow key={`${track.id}-${index}`} track={track} />
          ))}
        </div>
        <button
          type="button"
          className="press mt-3 w-full rounded-full border border-white/15 py-3 text-[14px] font-medium"
        >
          Слушать всё
        </button>
      </div>
    </section>
  );
}

function CarouselSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <SectionHeading title={title} subtitle={subtitle} />
      <div className={`flex gap-4 px-5 ${hideScrollbar}`}>{children}</div>
    </section>
  );
}

function SquareCard({
  title,
  subtitle,
  cover,
  size = "md",
  fill = false,
}: {
  title: string;
  subtitle?: string;
  cover: string;
  size?: "md" | "lg";
  fill?: boolean;
}) {
  const width = fill ? "w-full" : size === "lg" ? "w-[152px]" : "w-[120px]";
  const radius = size === "lg" ? "rounded-[20px]" : "rounded-[16px]";

  return (
    <button type="button" className={`press ${width} shrink-0 snap-start text-left`}>
      <span
        className={`relative mb-2 block aspect-square w-full overflow-hidden bg-black ${radius} shadow-[0_16px_32px_rgba(0,0,0,0.38)]`}
      >
        <Image
          src={cover}
          alt=""
          fill
          sizes={fill ? "50vw" : size === "lg" ? "152px" : "120px"}
          className="object-cover"
        />
      </span>
      <span className="block truncate text-[14px] font-medium">{title}</span>
      {subtitle ? (
        <span className="mt-0.5 block truncate text-[12px] text-white/45">
          {subtitle}
        </span>
      ) : null}
    </button>
  );
}

function FeaturedCard({ release }: { release: FeaturedRelease }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
      <Image
        src={release.artistAvatar}
        alt=""
        fill
        sizes="408px"
        className="object-cover object-top"
        preload
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="truncate font-heading text-[32px] font-bold leading-none tracking-[-0.03em]">
          {release.artist}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[16px] bg-black">
            <Image
              src={release.cover}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] text-white/65">{release.kind}</span>
            <span className="mt-0.5 block truncate text-[16px] font-medium leading-tight">
              {release.title}
            </span>
          </span>
          <button
            type="button"
            className="press flex h-10 w-10 shrink-0 items-center justify-center"
            aria-label="Сохранить"
            onClick={() => setSaved((value) => !value)}
          >
            <Heart
              size={22}
              className={saved ? "fill-white text-white" : "text-white"}
            />
          </button>
          <button
            type="button"
            className="press flex h-10 w-10 shrink-0 items-center justify-center"
            aria-label="Играть"
          >
            <Play size={22} fill="white" className="ml-0.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TrackRow({ track, rank }: { track: Track; rank?: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex w-full items-center gap-3 px-2 py-3">
      {rank != null ? (
        <span className="w-6 shrink-0 text-center text-[14px] font-semibold text-white/40">
          {rank}
        </span>
      ) : null}
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-black">
        <Image src={track.cover} alt="" fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{track.title}</span>
        <span className="mt-0.5 block truncate text-xs text-white/45">
          {track.artist}
        </span>
      </span>
      <button
        type="button"
        className="press flex h-10 w-8 shrink-0 items-center justify-center"
        aria-label="Ещё"
      >
        <Ellipsis size={22} className="text-white" />
      </button>
      <button
        type="button"
        className="press flex h-10 w-10 shrink-0 items-center justify-center"
        aria-label="Нравится"
        aria-pressed={liked}
        onClick={() => setLiked((value) => !value)}
      >
        <Heart
          size={22}
          className={liked ? "fill-white text-white" : "text-white"}
        />
      </button>
    </div>
  );
}

function PlaceholderScreen({
  title,
  subtitle,
  variant,
}: {
  title: string;
  subtitle: string;
  variant: TabId;
}) {
  if (variant === "collection") {
    return (
      <main className="relative px-5 pt-[max(2.5rem,env(safe-area-inset-top))]">
        <p className="micro">Библиотека</p>
        <h1 className="mt-1 font-heading text-[34px] font-bold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-2 text-sm text-white/45">{subtitle}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {["Топ миксы", "Гитары", "Discover", "Вечер"].map((name, index) => (
            <button
              key={name}
              type="button"
              className="press glass relative h-32 overflow-hidden rounded-[24px] p-4 text-left"
            >
              <span className="absolute right-0 top-0 h-16 w-16 rounded-bl-[28px] bg-gradient-to-br from-[#c6ff3d]/40 to-transparent" />
              <span className="relative font-heading text-[20px] font-bold">{name}</span>
              <span className="relative mt-1 block text-[11px] text-white/45">
                {12 + index * 8} подборок
              </span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center px-8 pt-24 text-center">
      <div className="glass flex h-24 w-24 items-center justify-center rounded-full glow-lime">
        <User size={36} />
      </div>
      <h1 className="mt-6 font-heading text-[34px] font-bold tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-2 text-sm text-white/45">{subtitle}</p>
    </main>
  );
}
