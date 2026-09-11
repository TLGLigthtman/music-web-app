"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AudioLines,
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
  Search,
  SkipBack,
  SkipForward,
  Smartphone,
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
} from "@/data/mockData";

type TabId = "home" | "collection" | "profile";

const hideScrollbar =
  "no-scrollbar overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

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

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      if (y < 16) {
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
      <div className="relative overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0">
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
            <div className="absolute inset-x-5 top-0 h-px bg-white/25" />
            <div className="flex w-full items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl shadow-[0_0_16px_rgba(198,255,61,0.25)]">
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
}: {
  feed: ReturnType<typeof getPersonalizedFeed>;
  activeGenre?: Genre;
  onSelectGenre: (genre?: Genre) => void;
}) {
  return (
    <main className="relative flex flex-col">
      <Hero activeGenre={activeGenre} onSelectGenre={onSelectGenre} />

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
        <section className="px-5">
          <button
            type="button"
            className="press flex w-full items-center gap-3 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#ff4fa3] via-[#c026d3] to-[#7c3aed] px-4 py-4 text-left shadow-[0_12px_40px_rgba(192,38,211,0.28)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <Smartphone size={20} />
            </span>
            <span className="text-sm font-medium leading-snug">
              Подключите музыку на других устройствах
            </span>
          </button>
        </section>

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

        <CarouselSection title="Назад во времени">
          {feed.decades.map((item) => (
            <SquareCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              cover={item.cover}
            />
          ))}
        </CarouselSection>

        <div className="px-5 pb-6">
          <button
            type="button"
            className="press w-full rounded-full bg-white py-4 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.18)]"
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    </main>
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
        <div className={`flex gap-4 px-5 ${hideScrollbar}`}>
          {visiblePlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              active={playlist.id === selectedPlaylist?.id}
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
            <div className="relative glass-soft overflow-hidden rounded-[24px] px-2">
              <div className="max-h-[204px] overflow-y-auto no-scrollbar">
                {expandedTracks.map((track, index) => (
                  <TrackRow key={`${track.id}-${index}`} track={track} />
                ))}
              </div>
              {expandedTracks.length > 3 ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0c10] to-transparent" />
              ) : null}
            </div>
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
  active,
  onSelect,
}: {
  playlist: Playlist;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`press w-[156px] shrink-0 snap-start text-left ${
        active ? "opacity-100" : "opacity-80"
      }`}
    >
      <span
        className="relative mb-2 block aspect-square w-full overflow-hidden rounded-[24px] bg-black"
      >
        <Image
          src={playlist.cover}
          alt=""
          fill
          sizes="156px"
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
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-black shadow-[0_0_24px_rgba(198,255,61,0.16)]">
          <Image
            src={artist.avatar}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#c6ff3d] text-[10px] font-bold text-black shadow-[0_0_12px_rgba(198,255,61,0.6)]">
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
  activeGenre,
  onSelectGenre,
}: {
  activeGenre?: Genre;
  onSelectGenre: (genre?: Genre) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollerRef.current;
    const featured = root?.querySelector<HTMLElement>("[data-featured='true']");
    if (!root || !featured) return;
    root.scrollLeft =
      featured.offsetLeft - (root.clientWidth - featured.offsetWidth) / 2;
  }, []);

  return (
    <header className="relative">
      <div className="relative pt-[max(16px,env(safe-area-inset-top))]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackdrop />
        </div>

        <div className="relative z-10 px-5">
          <div className="glass flex items-center gap-2 rounded-full px-4 py-3">
            <Search size={16} strokeWidth={1.8} className="text-white/70" />
            <span className="flex-1 text-[14px] text-white/45">
              Поиск треков, артистов и подборок
            </span>
            <AudioLines size={16} className="text-[#c6ff3d]" />
          </div>

          <div className="mt-3 flex gap-2">
            <span className="shrink-0 rounded-full bg-gradient-to-r from-[#F4FF7A] to-[#9CFF3A] px-3 py-1.5 text-[12px] font-semibold text-black shadow-[0_0_24px_rgba(198,255,61,0.55),0_0_48px_rgba(198,255,61,0.28)]">
              Выгода
            </span>
            <span className="glass-soft shrink-0 rounded-full px-3 py-1.5 text-[12px] text-white/80">
              Рядом с вами
            </span>
            <span className="glass-soft shrink-0 rounded-full px-3 py-1.5 text-[12px] text-white/80">
              Новое
            </span>
          </div>
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
          className={`relative z-10 mt-4 flex snap-x snap-mandatory items-center gap-4 px-16 py-16 ${hideScrollbar}`}
        >
          {waveCards.map((card, index) => (
            <WaveFlowCard
              key={card.id}
              card={card}
              tilt={index === 0 ? -6 : index === waveCards.length - 1 ? 6 : 0}
              active={
                card.featured ? !activeGenre : card.genre === activeGenre
              }
              onClick={() => onSelectGenre(card.genre)}
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
      <div className="absolute inset-x-8 top-40 h-40 rounded-full bg-[#0d8a3a]/35 blur-[60px]" />
      <div className="noise absolute inset-0 opacity-[0.12]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#04110a]" />
    </div>
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
  if (card.featured) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`press flex h-40 w-[152px] shrink-0 snap-center flex-col items-center justify-center rounded-[28px] border border-[#d8ff6a]/40 bg-[#c6ff3d]/18 text-white backdrop-blur-2xl ${
          active ? "glow-lime" : "opacity-90"
        }`}
        data-featured="true"
      >
        <AudioLines size={40} strokeWidth={2} className="text-[#d8ff6a]" />
        <span className="mt-3 text-[16px] font-medium">{card.title}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`press flex h-40 w-[152px] shrink-0 snap-center flex-col justify-between rounded-[28px] p-4 text-left text-white backdrop-blur-2xl ${
        active
          ? "glow-lime bg-white/12"
          : "border border-white/12 bg-[#04180c]/45"
      }`}
    >
      <span className="flex -space-x-2">
        {card.avatars.slice(0, 3).map((src) => (
          <span
            key={src}
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/20"
          >
            <Image src={src} alt="" fill sizes="32px" className="object-cover" />
          </span>
        ))}
      </span>
      <span>
        <span className="block text-[14px] font-medium leading-tight">
          {card.title}
        </span>
        {card.subtitle ? (
          <span className="mt-1 block text-[12px] text-white/65">
            {card.subtitle}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function CarouselSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <SectionHeading title={title} />
      <div className={`flex gap-4 px-5 ${hideScrollbar}`}>{children}</div>
    </section>
  );
}

function SquareCard({
  title,
  subtitle,
  cover,
  size = "md",
}: {
  title: string;
  subtitle?: string;
  cover: string;
  size?: "md" | "lg";
}) {
  const width = size === "lg" ? "w-[152px]" : "w-[120px]";
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
          sizes={size === "lg" ? "152px" : "120px"}
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

function TrackRow({ track }: { track: Track }) {
  return (
    <button
      type="button"
      className="press flex w-full items-center gap-3 px-2 py-3 text-left"
    >
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
        <Image src={track.cover} alt="" fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{track.title}</span>
        <span className="mt-0.5 block truncate text-xs text-white/45">{track.artist}</span>
      </span>
      <Heart size={16} className="text-white/55" />
      <Ellipsis size={16} className="text-white/35" />
    </button>
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
