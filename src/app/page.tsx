"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { House, Library, Search } from "lucide-react";
import {
  GENRES,
  getPersonalizedFeed,
  userProfile,
  type Album,
  type Genre,
  type Track,
} from "@/data/mockData";

type TabId = "home" | "search" | "library";

const tabs: {
  id: TabId;
  label: string;
  icon: typeof House;
}[] = [
  { id: "home", label: "Главная", icon: House },
  { id: "search", label: "Поиск", icon: Search },
  { id: "library", label: "Моя медиатека", icon: Library },
];

const hideScrollbar =
  "no-scrollbar overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export default function Home() {
  const [activeGenre, setActiveGenre] = useState<Genre | undefined>();
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const feed = useMemo(
    () => getPersonalizedFeed(activeGenre),
    [activeGenre],
  );

  const toggleGenre = (genre: Genre) => {
    setActiveGenre((current) => (current === genre ? undefined : genre));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-neutral-950 text-white pb-24 select-none [-webkit-tap-highlight-color:transparent]">
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900/50 via-neutral-950 to-neutral-950">
        <header className="px-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3 py-3">
            <button
              type="button"
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 active:scale-95 transition-transform"
              aria-label={`Профиль ${userProfile.name}`}
            >
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                fill
                sizes="40px"
                className="object-cover"
                preload
              />
            </button>
            <div className="min-w-0">
              <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight">
                Добрый вечер
              </h1>
              <p className="truncate text-sm text-neutral-400">
                {userProfile.name}
              </p>
            </div>
          </div>

          <div className={`-mx-4 flex gap-2 px-4 pb-4 ${hideScrollbar}`}>
            {GENRES.map((genre) => {
              const isActive = activeGenre === genre;
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-transform active:scale-95 ${
                    isActive
                      ? "bg-[#1DB954] text-black"
                      : "bg-neutral-800 text-white"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </header>

        {activeTab === "home" ? (
          <HomeFeed feed={feed} />
        ) : activeTab === "search" ? (
          <PlaceholderScreen
            title="Поиск"
            subtitle="Найди треки, альбомы и исполнителей"
          />
        ) : (
          <PlaceholderScreen
            title="Моя медиатека"
            subtitle={`Любимые жанры: ${userProfile.favoriteGenres.join(", ")}`}
          />
        )}
      </div>

      <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t border-white/5 bg-neutral-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex min-w-[4.5rem] flex-col items-center gap-1 py-1 active:scale-95 transition-transform"
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  fill={isActive ? "currentColor" : "none"}
                  className={isActive ? "text-white" : "text-neutral-400"}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomeFeed({
  feed,
}: {
  feed: ReturnType<typeof getPersonalizedFeed>;
}) {
  return (
    <main className="flex flex-col gap-7 pb-6">
      <section className="px-4">
        <h2 className="mb-3 text-xl font-bold tracking-tight">
          Недавно прослушано
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {feed.recentlyPlayed.map((track) => (
            <RecentCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <CarouselSection title="Специально для вас">
        {feed.forYou.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </CarouselSection>

      <CarouselSection title="Популярные альбомы">
        {feed.popularAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </CarouselSection>
    </main>
  );
}

function RecentCard({ track }: { track: Track }) {
  return (
    <button
      type="button"
      className="flex items-center overflow-hidden rounded-md bg-neutral-800/80 text-left shadow-sm active:scale-95 transition-transform"
    >
      <span className="relative h-14 w-14 shrink-0">
        <Image
          src={track.cover}
          alt=""
          fill
          sizes="56px"
          loading="eager"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 px-2.5 py-1.5">
        <span className="block truncate text-sm font-semibold leading-tight">
          {track.title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-neutral-400">
          {track.artist}
        </span>
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
      <h2 className="mb-3 px-4 text-xl font-bold tracking-tight">{title}</h2>
      <div className={`flex gap-4 px-4 snap-x snap-mandatory ${hideScrollbar}`}>
        {children}
      </div>
    </section>
  );
}

function TrackCard({ track }: { track: Track }) {
  return (
    <button
      type="button"
      className="w-36 shrink-0 snap-start text-left active:scale-95 transition-transform"
    >
      <span className="relative mb-2 block aspect-square overflow-hidden rounded-md shadow-lg">
        <Image
          src={track.cover}
          alt=""
          fill
          sizes="144px"
          className="object-cover"
        />
      </span>
      <span className="block truncate text-sm font-semibold">{track.title}</span>
      <span className="block truncate text-xs text-neutral-400">
        {track.artist} · {track.duration}
      </span>
    </button>
  );
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <button
      type="button"
      className="w-36 shrink-0 snap-start text-left active:scale-95 transition-transform"
    >
      <span className="relative mb-2 block aspect-square overflow-hidden rounded-md shadow-lg">
        <Image
          src={album.cover}
          alt=""
          fill
          sizes="144px"
          className="object-cover"
        />
      </span>
      <span className="block truncate text-sm font-semibold">{album.title}</span>
      <span className="block truncate text-xs text-neutral-400">
        {album.artist} · {album.year}
      </span>
    </button>
  );
}

function PlaceholderScreen({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
    </main>
  );
}
