import { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { ComicCard } from './ComicCard';
import { searchMangaDex, getMangaCoverUrl, getMangaTitle } from '../services/mangadexApi';

const bgColors = [
  "#14080a", "#090c14", "#090e0b", "#130f08", "#0a0814",
  "#0f0810", "#0c1410", "#140808", "#0c0c14", "#14140c",
  "#10100c", "#14080e", "#150a0c", "#0c1208", "#13080f",
];

export const IndieSection = () => {
  const [indieData, setIndieData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndie = async () => {
      try {
        setLoading(true);
        // Fetch diverse manga to show variety
        const manga = await searchMangaDex("", 15);
        
        const formattedData = manga.map((m: any, idx: number) => ({
          id: m.id,
          title: getMangaTitle(m),
          chapter: `Ch ${m.attributes?.tags?.length || 0}+`,
          genre: m.attributes?.tags?.map((t: any) => t.attributes?.name?.en).filter(Boolean).slice(0, 2).join(" · ") || "Manga",
          bgColor: bgColors[idx % bgColors.length],
          thumbnail: getMangaCoverUrl(m, 'medium'),
        }));
        
        setIndieData(formattedData);
      } catch (error) {
        console.error('Failed to fetch indie manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndie();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-9 pb-8 sm:pb-12">
        <SectionHeader title="New from indie creators" linkText="See all →" />
        <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pt-2 sm:pt-3 pb-4 sm:pb-6 -mt-0 sm:-mt-1">
          <div className="text-white/40 text-xs sm:text-sm">Loading manga...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-9 pb-8 sm:pb-12">
      <SectionHeader title="New from indie creators" linkText="See all →" />
      <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pt-2 sm:pt-3 pb-4 sm:pb-6 -mt-0 sm:-mt-1">
        {indieData.map((comic) => (
          <ComicCard key={comic.id} {...comic} />
        ))}
      </div>
    </section>
  );
};
