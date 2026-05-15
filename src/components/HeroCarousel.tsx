"use client"

import { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTrendingManga, getMangaCoverUrl, getMangaTitle, getMangaDescription, getAuthorName } from '../services/mangadexApi';

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        setLoading(true);
        const manga = await getTrendingManga(6);
        
        const formattedData = manga.slice(0, 4).map((m: any, idx: number) => {
          const title = getMangaTitle(m);
          const titleParts = title.split(' ');
          const lastWord = titleParts.pop() || '';
          const mainTitle = titleParts.join(' ') || title;
          
          // Generate realistic stats based on popularity order
          const ratingBase = 4.9 - (idx * 0.1);
          const rating = Math.max(4.2, ratingBase).toFixed(1);
          const followerCounts = ['250k+', '180k+', '150k+', '120k+'];
          const chapterCounts = [45, 38, 32, 28];
          
          return {
            id: m.id,
            category: `${m.attributes?.status || 'Ongoing'} · ${m.attributes?.contentRating || 'Safe'}`,
            title: mainTitle,
            titleHighlight: lastWord,
            author: getAuthorName(m),
            chapters: chapterCounts[idx] || 20,
            description: getMangaDescription(m)?.substring(0, 120) || 'Discover this amazing manga on MangaDex',
            tags: m.attributes?.tags?.map((t: any) => t.attributes?.name?.en).filter(Boolean).slice(0, 3) || ['Manga', 'Popular'],
            stats: [
              { val: rating, label: 'Rating' },
              { val: followerCounts[idx] || '100k+', label: 'Followers' },
              { val: `${chapterCounts[idx] || 20}`, label: 'Chapters' }
            ],
            bgImage: getMangaCoverUrl(m, 'large') || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
          };
        });
        
        setCarouselData(formattedData);
      } catch (error) {
        console.error('Failed to fetch carousel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  const nextSlide = () => {
    if (carouselData.length === 0) return;
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (carouselData.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (carouselData.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselData.length]);

  if (loading || carouselData.length === 0) {
    return (
      <section className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 text-sm sm:text-base lg:text-lg font-['Comic_Sans_MS']">Loading featured manga...</div>
      </section>
    );
  }

  const slide = carouselData[currentIndex];

  return (
    <section className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] w-full group overflow-hidden">
      {/* Background Images Layer */}
      {carouselData.map((item, index) => (
        <div 
          key={item.id} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          style={{
            backgroundImage: `url('${item.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-[52px] py-8 sm:py-10 md:py-12 lg:py-[72px] flex flex-col justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] max-w-full lg:max-w-[65%]">
        <div key={slide.id} className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5">
            <div className="w-[18px] h-[1px] bg-[#3b82f6]" />
            <span className="text-[8px] sm:text-[9px] lg:text-[10.5px] font-500 tracking-[1.5px] sm:tracking-[2px] lg:tracking-[2.5px] uppercase text-[#3b82f6]">
              {slide.category}
            </span>
          </div>
          <h1 className="font-['Comic_Sans_MS'] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-800 leading-[1.03] tracking-[-1px] sm:tracking-[-1.2px] lg:tracking-[-1.5px] text-white mb-2 sm:mb-3 lg:mb-4">
            {slide.title}<br /><span className="text-[#3b82f6] italic not-italic">{slide.titleHighlight}</span>
          </h1>
          <div className="text-[10px] sm:text-[11px] lg:text-[12px] text-white/50 tracking-[0.2px] lg:tracking-[0.3px] mb-2 sm:mb-2.5 lg:mb-3.5">
            By {slide.author} &nbsp;·&nbsp; {slide.chapters} chapters
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-[14px] text-white/60 leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] font-light max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mb-5 sm:mb-6 lg:mb-[30px]">
            {slide.description}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 lg:mb-7">
            {slide.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] sm:text-[10px] lg:text-[11px] text-white/60 border border-white/20 px-2 sm:px-2.5 py-1 rounded-full tracking-[0.1px] lg:tracking-[0.2px] bg-black/20">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-start sm:items-center">
            <Link 
              to={`/read/${slide.id}`}
              className="w-full sm:w-auto bg-[#3b82f6] text-white px-4 sm:px-6 py-2 sm:py-[11px] rounded-[7px] text-xs sm:text-[13px] lg:text-[13.5px] font-500 hover:bg-[#2563eb] flex items-center justify-center sm:justify-start gap-[7px] tracking-[0.1px] transition-colors"
            >
              <Play size={14} fill="currentColor" /> Read now
            </Link>
          </div>
          
          <div className="flex gap-4 sm:gap-6 lg:gap-[28px] mt-6 sm:mt-7 lg:mt-9 pt-4 sm:pt-5 lg:pt-7 border-t border-white/10">
            {slide.stats.map((stat: any) => (
              <div key={stat.label}>
                <div className="font-['Comic_Sans_MS'] text-lg sm:text-xl lg:text-[20px] font-700 text-white tracking-[-0.3px] sm:tracking-[-0.4px] lg:tracking-[-0.5px] mb-1 sm:mb-[2px] lg:mb-[3px]">{stat.val}</div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10.5px] text-white/40 tracking-[0.5px] sm:tracking-[0.6px] lg:tracking-[0.8px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/30 text-white/50 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/30 text-white/50 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2">
        {carouselData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 sm:h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-5 sm:w-6 bg-[#3b82f6]' : 'w-1 sm:w-1.5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};
