"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Briefcase,
  ChevronUp,
  CloudRain,
  Dumbbell,
  Ellipsis,
  Heart,
  House,
  Library,
  Pause,
  Play,
  PartyPopper,
  SkipBack,
  SkipForward,
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
  const [playing, setPlaying] = useState(true);
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
    <div className="relative mx-auto min-h-screen max-w-md bg-[#04060a] pb-40 text-white select-none [-webkit-tap-highlight-color:transparent]">
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
            activeGenre={activeGenre}
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
  activeGenre,
  onSelectGenre,
  onOpenCatalog,
}: {
  feed: ReturnType<typeof getPersonalizedFeed>;
  activeGenre?: Genre;
  onSelectGenre: (genre?: Genre) => void;
  onOpenCatalog: () => void;
}) {
  return (
    <main className="relative flex flex-col">
      <Hero onSelectGenre={onSelectGenre} />

      <section className="pt-8">
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
        className="press relative mx-auto mt-6 block h-[136px] w-[280px]"
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
      <h2 className="font-heading text-[32px] font-bold leading-none tracking-[-0.03em]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1.5 text-[12px] text-white/45">{subtitle}</p>
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
  onSelectGenre,
}: {
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
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("scrollend", normalizeLoop);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.clearTimeout(settleTimer);
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("scrollend", normalizeLoop);
    };
  }, [middleCopy, setCount, startIndex]);

  return (
    <header className="relative">
      <div className="relative pt-[max(16px,env(safe-area-inset-top))]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackdrop />
        </div>

        <div className="relative z-10 mt-6 flex flex-col items-center px-6">
          <div className="glass mb-4 rounded-full px-3 py-1 text-[12px] text-white/80">
            78% совпадение с вашим вкусом
          </div>

          <div className="relative w-[min(100%,300px)]">
            <div className="rounded-[24px] border border-white/18 bg-white/[0.12] px-5 py-4 text-center text-[12px] leading-[1.4] text-white/90 backdrop-blur-xl">
              Ваш поток здесь не первый раз — и вряд ли последний
            </div>
          </div>

          <button
            type="button"
            className="press mt-6 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.28),0_12px_32px_rgba(0,0,0,0.25)]"
            aria-label="Слушать поток"
          >
            <Play size={30} fill="#0B8A32" strokeWidth={0} className="ml-1 text-[#0B8A32]" />
          </button>

          <div className="mt-4 flex items-center gap-6 text-white/70">
            <SkipBack size={16} fill="currentColor" />
            <button
              type="button"
              className="press rounded-full border border-white/15 bg-white/8 px-6 py-2 text-[14px] font-medium text-white backdrop-blur-md"
            >
              Настроить
            </button>
            <SkipForward size={16} fill="currentColor" />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className={`relative z-10 mt-4 flex snap-x snap-mandatory items-center gap-3 px-12 py-10 [overflow-anchor:none] ${hideScrollbar}`}
        >
          {loopedWaveCards.map(({ card, copy }, index) => (
            <WaveFlowCard
              key={`${copy}-${card.id}`}
              card={card}
              tilt={
                index === centeredIndex ? 0 : index < centeredIndex ? 11 : -11
              }
              active={index === centeredIndex}
              onClick={() => {
                onSelectGenre(card.genre);
                scrollToIndex(index);
              }}
            />
          ))}
        </div>

        <svg
          className="relative z-10 -mb-px block w-full"
          viewBox="0 0 390 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 48 L0 28 Q195 0 390 28 L390 48 Z" fill="#04060a" />
        </svg>
      </div>

      <div className="relative z-10 -mt-1 flex flex-col items-center gap-0.5 text-white/40">
        <ChevronUp size={16} strokeWidth={2} />
        <span className="text-[11px] tracking-wide">Больше для вас</span>
      </div>
    </header>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[#07140c]" />
      <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#ff3d8a]/28 blur-[70px]" />
      <div className="absolute right-[-40px] top-10 h-64 w-64 rounded-full bg-[#c6ff3d]/22 blur-[80px]" />
      <div className="absolute inset-x-4 top-36 h-52 rounded-full bg-[#12a34a]/45 blur-[50px]" />
      <div className="absolute inset-x-0 bottom-10 h-40 bg-[#0d8a3a]/40 blur-[40px]" />
      <div className="noise absolute inset-0 opacity-[0.12]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#04110a]" />
    </div>
  );
}

function WaveMark() {
  return (
    <svg
      viewBox="0 0 48 40"
      className="h-14 w-14 text-[#c6ff3d]"
      aria-hidden
    >
      <ellipse cx="4.5" cy="20" rx="3.4" ry="8" fill="currentColor" />
      <ellipse cx="14" cy="20" rx="4" ry="12.5" fill="currentColor" />
      <ellipse cx="24" cy="20" rx="4.6" ry="17" fill="currentColor" />
      <ellipse cx="34" cy="20" rx="4" ry="12.5" fill="currentColor" />
      <ellipse cx="43.5" cy="20" rx="3.4" ry="8" fill="currentColor" />
    </svg>
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
  const twoLine = card.title.includes("\n");

  return (
    <button
      type="button"
      onClick={onClick}
      data-wave-card=""
      data-featured={card.featured ? "true" : undefined}
      className={`relative flex h-40 w-40 shrink-0 snap-center items-center justify-center ${
        active ? "z-10" : ""
      }`}
    >
      <span
        style={{
          transform: active ? "rotate(0deg)" : `rotate(${tilt}deg)`,
        }}
        className={`relative flex flex-col items-center justify-center px-3 transition-[width,height,border-radius,transform] duration-300 ease-out ${
          twoLine ? "gap-1" : "gap-5"
        } ${
          active ? "h-40 w-40 rounded-[32px]" : "h-[140px] w-[140px] rounded-[28px]"
        }`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            active
              ? "rounded-[32px] wave-plaque-active"
              : "rounded-[28px] wave-plaque"
          }`}
        />
        <span className="relative z-10 flex shrink-0 items-center justify-center">
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
            <span className="relative block h-14 w-14 overflow-hidden rounded-[14px] bg-black">
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
          className={`relative z-10 block whitespace-pre-line text-center font-heading font-bold leading-none tracking-[-0.03em] ${
            active ? "text-[20px] text-white" : "text-[18px] text-[#c5e0c4]/55"
          }`}
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
