import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ComicCard } from '../components/ComicCard';
import { searchMangaDex, getMangaCoverUrl, getMangaTitle, getMangaDescription } from '../services/mangadexApi';

const mangaTypes = ["All", "Manga", "Novel", "Light Novel", "One-shot"];
const mangaStatus = ["All", "Publishing", "Complete", "Hiatus", "Discontinued", "Planned"];

const bgColors = [
  "#14080a", "#090c14", "#090e0b", "#130f08", "#0a0814",
  "#0f0810", "#0c1410", "#140808", "#0c0c14", "#14140c",
  "#10100c", "#14080e", "#150a0c", "#0c1208", "#13080f",
];

interface Comic {
  id: number;
  title: string;
  chapter: string;
  genre: string;
  bgColor: string;
  thumbnail?: string;
  score?: number;
  rank?: number;
  synopsis?: string;
}

export const Browse = () => {
  const [allComics, setAllComics] = useState<Comic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [mangaType, setMangaType] = useState("All");
  const [mangaStatus2, setMangaStatus2] = useState("All");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMangaPage = useCallback(async (_page: number, query: string) => {
    try {
      setLoading(true);
      
      // For now, use simple search - MangaDex doesn't have the same filtering as Jikan
      // Type and status filters are removed as MangaDex API doesn't support them in the same way
      const limit = 25;
      let results;
      
      if (query.trim()) {
        results = await searchMangaDex(query, limit);
      } else {
        // If no query, fetch popular manga (simplified - just search for empty)
        results = await searchMangaDex("", limit);
      }

      if (!results || results.length === 0) {
        setHasMore(false);
        return [];
      }

      const formattedComics = results.map((manga: any, idx: number) => {
        const title = getMangaTitle(manga);
        const coverUrl = getMangaCoverUrl(manga, 'medium');
        
        return {
          id: manga.id,
          title: title,
          chapter: `ID: ${manga.id.substring(0, 8)}`,
          genre: manga.attributes?.tags?.map((t: any) => t.attributes?.name?.en).filter(Boolean).slice(0, 2).join(" · ") || "Manga",
          bgColor: bgColors[idx % bgColors.length],
          thumbnail: coverUrl,
          score: null,
          rank: null,
          synopsis: getMangaDescription(manga)?.substring(0, 150) + "..." || "",
        };
      });

      return formattedComics;
    } catch (error) {
      console.error("Failed to fetch manga:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load - reset when search or filters change
  useEffect(() => {
    const loadInitial = async () => {
      setInitialLoad(true);
      setCurrentPage(1);
      setHasMore(true);
      const comics = await fetchMangaPage(1, searchQuery);
      setAllComics(comics);
      setInitialLoad(false);
    };

    const debounceTimer = setTimeout(loadInitial, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, sortBy, sortOrder, mangaType, mangaStatus2, fetchMangaPage]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && !initialLoad) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchMangaPage(nextPage, searchQuery).then((newComics) => {
            if (newComics.length === 0) {
              setHasMore(false);
            } else {
              setAllComics((prev) => [...prev, ...newComics]);
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [currentPage, loading, hasMore, initialLoad, searchQuery, fetchMangaPage]);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <div className="border-b border-white/5 px-4 sm:px-6 md:px-8 lg:px-[52px] py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Comic_Sans_MS'] tracking-tight mb-1">Browse all manga</h1>
            <p className="text-xs sm:text-sm text-white/30 font-light">Thousands of manga from MangaDex</p>
          </div>
          <div className="flex items-center gap-0 bg-[#111] border border-white/8 rounded-lg overflow-hidden w-full sm:w-auto sm:max-w-xs">
            <Search size={14} className="text-white/25 ml-2 sm:ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search manga…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-white/20 px-2 sm:px-3 py-2 sm:py-2.5 w-full font-['Comic_Sans_MS']"
            />
          </div>
        </div>

        {/* Filter Button & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-white/8 rounded-lg text-[10px] sm:text-xs text-white/50 hover:text-white/70 transition-colors font-['Comic_Sans_MS']"
          >
            <Filter size={13} />
            Filters {showFilters && <X size={13} />}
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111] border border-white/8 text-white/55 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1.5 rounded font-['Comic_Sans_MS'] outline-none cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="score">Top Rated</option>
              <option value="title">Title A-Z</option>
              <option value="chapters">Chapters</option>
              <option value="start_date">Newest</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-2 sm:px-2.5 py-1.5 bg-[#111] border border-white/8 text-white/55 text-[10px] sm:text-xs rounded hover:text-white/70 transition-colors font-['Comic_Sans_MS']"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#0a0a0a] rounded-lg border border-white/5 space-y-3 sm:space-y-4">
            <div>
              <label className="text-[9px] sm:text-xs text-white/50 font-bold mb-2 block">Type</label>
              <div className="flex flex-wrap gap-2">
                {mangaTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setMangaType(type)}
                    className={`text-[9px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all font-['Comic_Sans_MS'] ${
                      mangaType === type
                        ? "border-blue-500 border text-blue-500 bg-blue-500/8"
                        : "border border-white/8 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] sm:text-xs text-white/50 font-bold mb-2 block">Status</label>
              <div className="flex flex-wrap gap-2">
                {mangaStatus.map((status) => (
                  <button
                    key={status}
                    onClick={() => setMangaStatus2(status)}
                    className={`text-[9px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all font-['Comic_Sans_MS'] ${
                      mangaStatus2 === status
                        ? "border-blue-500 border text-blue-500 bg-blue-500/8"
                        : "border border-white/8 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comic Grid */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-[52px] py-4 sm:py-6 pb-8 sm:pb-12">
        <div className="mb-3 sm:mb-4 text-[9px] sm:text-xs text-white/30">
          {initialLoad ? "Loading..." : `Showing ${allComics.length} manga`}
        </div>

        {initialLoad ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-white/40 text-sm sm:text-base">Loading manga...</p>
          </div>
        ) : allComics.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-white/40 text-sm sm:text-base">No manga found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {allComics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  id={comic.id}
                  title={comic.title}
                  chapter={comic.chapter}
                  genre={comic.genre}
                  bgColor={comic.bgColor}
                />
              ))}
            </div>

            {/* Infinite scroll sentinel */}
            {hasMore && (
              <div
                ref={observerTarget}
                className="text-center py-8"
              >
                {loading ? (
                  <p className="text-white/40 text-sm">Loading more...</p>
                ) : (
                  <p className="text-white/20 text-xs">Scroll for more</p>
                )}
              </div>
            )}

            {!hasMore && allComics.length > 0 && (
              <div className="text-center py-8">
                <p className="text-white/20 text-xs">No more manga to load</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
