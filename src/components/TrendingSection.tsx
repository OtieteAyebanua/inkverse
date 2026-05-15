import { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { ComicCard } from './ComicCard';
import { getTrendingManga, getMangaCoverUrl, getMangaTitle } from '../services/mangadexApi';

const bgColors = [
  "#14080a", "#090c14", "#090e0b", "#130f08", "#0a0814",
  "#0f0810", "#0c1410", "#140808", "#0c0c14", "#14140c",
  "#10100c", "#14080e", "#150a0c", "#0c1208", "#13080f",
];

export const TrendingSection = () => {
  const [trendingData, setTrendingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const manga = await getTrendingManga(18);
        
        const formattedData = manga.map((m: any, idx: number) => ({
          id: m.id,
          title: getMangaTitle(m),
          chapter: `Ch ${m.attributes?.tags?.length || 0}+`,
          genre: m.attributes?.tags?.map((t: any) => t.attributes?.name?.en).filter(Boolean).slice(0, 2).join(" · ") || "Manga",
          bgColor: bgColors[idx % bgColors.length],
          thumbnail: getMangaCoverUrl(m, 'medium'),
        }));
        
        setTrendingData(formattedData);
      } catch (error) {
        console.error('Failed to fetch trending manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-10">
        <SectionHeader title="Trending this week" linkText="View all →" />
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pt-2 pb-4 sm:pt-3 sm:pb-6">
          <div className="text-white/40 text-xs sm:text-sm">Loading trending manga...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-10">
      <SectionHeader title="Trending this week" linkText="View all →" />
      <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pt-2 sm:pt-3 pb-4 sm:pb-6 -mt-0 sm:-mt-1">
        {trendingData.map((comic) => (
          <ComicCard key={comic.id} {...comic} />
        ))}
      </div>
    </section>
  );
};
