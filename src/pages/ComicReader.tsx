import { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Settings, 
  Menu, 
  Loader, 
  Grid3x3, 
  Heart, 
  MessageCircle, 
  Share2,
  Info
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { 
  getMangaById, 
  getMangaChapters, 
  getChapterPages, 
  getMangaCoverUrl, 
  getMangaTitle, 
  getAuthorName, 
  formatChapter 
} from '../services/mangadexApi';

export const ComicReader = () => {
  const { comicId } = useParams<{ comicId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mode, setMode] = useState<'scroll' | 'panel' | 'info'>('scroll');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Manga data
  const [mangaData, setMangaData] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Chapter reading
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [pages, setPages] = useState<string[]>([]);
  const [loadingChapter, setLoadingChapter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const scrollViewRef = useRef<HTMLDivElement>(null);

  // Load manga and chapters on mount
  useEffect(() => {
    const loadManga = async () => {
      if (!comicId) return;
      try {
        setLoading(true);
        const manga = await getMangaById(comicId);
        if (manga) {
          setMangaData(manga);
          const chapterList = await getMangaChapters(comicId);
          setChapters(chapterList);
          
          // Load first chapter
          if (chapterList.length > 0) {
            await loadChapter(0, chapterList);
          }
        }
      } catch (error) {
        console.error('Failed to load manga:', error);
      } finally {
        setLoading(false);
      }
    };

    loadManga();
  }, [comicId]);

  // Load specific chapter
  const loadChapter = async (index: number, chapterList?: any[]) => {
    try {
      setLoadingChapter(true);
      setCurrentPage(0);
      const chapterToLoad = chapterList ? chapterList[index] : chapters[index];
      
      if (!chapterToLoad) {
        console.error(`No chapter found at index ${index}`);
        return;
      }
      
      console.log(`Loading chapter ${index}:`, chapterToLoad);
      const pageUrls = await getChapterPages(chapterToLoad.id);
      console.log(`Got ${pageUrls.length} pages for chapter ${chapterToLoad.id}`);
      setPages(pageUrls);
      setCurrentChapterIndex(index);
      if (mode === 'info') setMode('scroll'); // Switch back to reader mode if a chapter is picked
    } catch (error) {
      console.error('Failed to load chapter:', error);
      setPages([]);
    } finally {
      setLoadingChapter(false);
    }
  };

  const handleScroll = () => {
    if (mode !== 'scroll') return;
    if (scrollViewRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollViewRef.current;
      const totalScrollable = scrollHeight - clientHeight;
      const pct = totalScrollable > 0 ? Math.min(100, Math.round((scrollTop / totalScrollable) * 100)) : 0;
      setScrollProgress(pct);
    }
  };

  // Calculate progress on page turns for panel mode
  useEffect(() => {
    if (mode === 'panel' && pages.length > 0) {
      const pct = Math.round(((currentPage + 1) / pages.length) * 100);
      setScrollProgress(pct);
    } else if (mode === 'info') {
      setScrollProgress(100);
    }
  }, [currentPage, pages, mode]);

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      loadChapter(currentChapterIndex - 1);
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      loadChapter(currentChapterIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      scrollViewRef.current?.scrollTo({ top: 0 });
    } else if (currentChapterIndex > 0) {
      // Optional: Go to previous chapter last page if available
      goToPreviousChapter();
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      scrollViewRef.current?.scrollTo({ top: 0 });
    } else if (currentChapterIndex < chapters.length - 1) {
      goToNextChapter();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-white/50 flex items-center gap-2">
          <Loader size={20} className="animate-spin" />
          Loading manga...
        </div>
      </div>
    );
  }

  const title = mangaData ? getMangaTitle(mangaData) : 'Manga';
  const coverUrl = mangaData ? getMangaCoverUrl(mangaData) : null;
  const author = mangaData ? getAuthorName(mangaData) : 'Unknown';
  const synopsis = mangaData?.attributes?.description?.en || 'No description available.';
  const currentChapter = chapters[currentChapterIndex];
  const chapterInfo = currentChapter ? formatChapter(currentChapter) : { title: 'Chapter 0', chapterNum: 'Ch. 0' };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e8e8e8] font-['DM_Sans'] select-none">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 h-[52px] bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/browse" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/75 transition-colors">
            <ChevronLeft size={15} />
            Back
          </Link>
          <div className="w-px h-[18px] bg-white/7" />
          <div className="font-['Comic_Sans_MS'] text-base font-black text-white">
            Ink<span className="text-blue-500">Verse</span>
          </div>
        </div>

        {/* Middle Header Section */}
        <div className="hidden md:flex items-center gap-1.5">
          <div className="text-xs text-white/70 font-['Comic_Sans_MS'] font-bold max-w-[180px] truncate">
            {title}
          </div>
          <div className="text-white/15">·</div>
          <div className="text-xs text-white/30 max-w-[150px] truncate">
            {mode === 'info' ? 'Overview' : chapterInfo.title || `Chapter ${chapterInfo.chapterNum}`}
          </div>
        </div>

        {/* Actions Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-white/4 border border-white/7 rounded-lg overflow-hidden p-0.5">
            <button
              onClick={() => setMode('scroll')}
              className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all font-['Comic_Sans_MS'] hidden sm:block ${
                mode === 'scroll'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-white/35 hover:text-white/65'
              }`}
            >
              Scroll
            </button>
            <button
              onClick={() => setMode('panel')}
              className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all font-['Comic_Sans_MS'] hidden sm:flex ${
                mode === 'panel'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-white/35 hover:text-white/65'
              }`}
            >
              <Grid3x3 size={11} className="sm:w-3 sm:h-3" />
              Panel
            </button>
            <button
              onClick={() => setMode('info')}
              className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all font-['Comic_Sans_MS'] hidden sm:flex ${
                mode === 'info'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-white/35 hover:text-white/65'
              }`}
            >
              <Info size={11} className="sm:w-3 sm:h-3" />
              Info
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 sm:p-2 rounded-lg border border-white/8 text-white/50 hover:text-white/70 hover:border-white/20 transition-all"
          >
            <Menu size={16} className="sm:w-[15px] sm:h-[15px]" />
          </button>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 sm:p-2 rounded-lg border transition-all hidden sm:block ${
              bookmarked
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                : 'border-white/8 text-white/50 hover:text-white/70'
            }`}
          >
            <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>

          <button className="p-1.5 sm:p-2 rounded-lg border border-white/8 text-white/50 hover:text-white/70 hover:border-white/20 transition-all hidden sm:block">
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-0.5 bg-white/6 w-full">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* LAYOUT */}
      <div className="flex h-[calc(100vh-56px)] sm:h-[calc(100vh-62px)] overflow-hidden">
        {/* SIDEBAR - Full screen on mobile when open, fixed width on desktop */}
        <div
          className={`flex-shrink-0 bg-[#090909] border-r border-white/5 flex flex-col overflow-hidden transition-all duration-300 fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto ${
            sidebarOpen ? 'w-full lg:w-[260px]' : 'hidden lg:flex lg:w-[260px]'
          }`}
        >
          {sidebarOpen && (
            <div className="flex flex-col h-full overflow-hidden w-full lg:w-[260px]">
              {/* Series Summary block */}
              <div className="p-3 sm:p-4 border-b border-white/5">
                <div className="text-[9px] sm:text-xs text-white/25 uppercase mb-2 sm:mb-3 font-bold tracking-wider">Series</div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 h-14 sm:h-16 rounded text-[6px] sm:text-[7px] font-black text-white/20 bg-[#14080a] flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/5">
                    {coverUrl ? (
                      <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      title.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-['Comic_Sans_MS'] text-[10px] sm:text-sm font-black text-white truncate">{title}</div>
                    <div className="text-[9px] sm:text-xs text-white/40 truncate">by {author}</div>
                    <div className="text-[9px] sm:text-[11px] text-blue-400 mt-0.5 sm:mt-1">{chapters.length} chapters loaded</div>
                  </div>
                </div>
              </div>

              {/* Chapter Directory Selector */}
              <div className="flex-1 overflow-y-auto">
                <div className="text-[9px] sm:text-xs text-white/25 uppercase font-bold px-3 sm:px-4 py-2 sticky top-0 bg-[#090909] border-b border-white/5 z-10">
                  Chapters
                </div>
                {chapters.map((ch: any, idx: number) => {
                  const formatted = formatChapter(ch);
                  return (
                    <div
                      key={ch.id}
                      onClick={() => { loadChapter(idx); setSidebarOpen(false); }}
                      className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer border-b border-white/5 transition-all hover:bg-white/5 flex items-center gap-2 sm:gap-3 ${
                        idx === currentChapterIndex
                          ? 'bg-blue-500/10 border-l-2 border-l-blue-500'
                          : ''
                      }`}
                    >
                      <div className="font-['Comic_Sans_MS'] text-[8px] sm:text-xs font-black text-white/30 w-8 sm:w-10 flex-shrink-0">
                        {formatted.chapterNum}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[9px] sm:text-xs truncate ${idx === currentChapterIndex ? 'font-bold text-blue-400' : 'text-white/60'}`}>
                          {formatted.title || `Chapter ${formatted.chapterNum}`}
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-white/25 mt-0.5">
                          {ch.attributes?.publishAt ? new Date(ch.attributes.publishAt).toLocaleDateString() : 'Unknown Date'}
                        </div>
                      </div>
                      {idx === currentChapterIndex && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MAIN VIEWER PANES */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0a] lg:ml-0">
          <div
            ref={scrollViewRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto overflow-x-hidden relative"
          >
            {loadingChapter ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm z-50">
                <div className="text-center">
                  <div className="text-white/70 flex items-center gap-3 justify-center mb-3">
                    <Loader size={32} className="animate-spin" />
                  </div>
                  <div className="font-['Comic_Sans_MS'] text-white/60 text-sm">Loading chapter pages...</div>
                </div>
              </div>
            ) : null}
            
            {mode === 'info' ? (
              /* COMPOSITE MANGA METADATA HUB VIEW */
              <div className="max-w-2xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
                <div className="bg-[#111] rounded-lg sm:rounded-xl overflow-hidden border border-white/5 p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="w-24 sm:w-32 h-32 sm:h-44 rounded-lg mx-auto sm:mx-0 flex-shrink-0 bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-lg">
                      {coverUrl && <img src={coverUrl} alt={title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="font-['Comic_Sans_MS'] text-base sm:text-xl font-black text-white mb-0.5 sm:mb-1">
                        {title}
                      </h2>
                      <p className="text-[9px] sm:text-xs text-blue-400/80 mb-2 sm:mb-3 font-medium">By {author}</p>
                      <p className="text-[11px] sm:text-sm text-white/60 line-clamp-5 mb-3 sm:mb-4 leading-relaxed whitespace-pre-line">
                        {synopsis}
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-[9px] sm:text-xs border-t border-white/5 pt-3 sm:pt-4 text-white/40">
                        <div>
                          <div className="font-bold text-white/80 text-[10px] sm:text-sm">{chapters.length}</div>
                          <div>Total Chapters</div>
                        </div>
                        <div>
                          <div className="font-bold text-white/80 text-[10px] sm:text-sm capitalize">{mangaData?.attributes?.status || 'Ongoing'}</div>
                          <div>Status</div>
                        </div>
                        <div>
                          <div className="font-bold text-white/80 text-[10px] sm:text-sm capitalize">{mangaData?.attributes?.contentRating || 'Safe'}</div>
                          <div>Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter Selection Accordion List inside details panel */}
                <div className="bg-[#111] rounded-lg sm:rounded-xl overflow-hidden border border-white/5">
                  <div className="p-3 sm:p-4 border-b border-white/5 bg-white/[0.01]">
                    <h3 className="font-['Comic_Sans_MS'] text-[10px] sm:text-sm font-black text-white">Index Directory</h3>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[350px] overflow-y-auto custom-scrollbar">
                    {chapters.map((ch: any, idx: number) => {
                      const formatted = formatChapter(ch);
                      return (
                        <div
                          key={ch.id}
                          onClick={() => loadChapter(idx)}
                          className="px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="font-['Comic_Sans_MS'] text-xs font-bold text-white/80 group-hover:text-blue-400 transition-colors truncate">
                              {formatted.chapterNum !== 'Ch. 0' ? `${formatted.chapterNum}: ` : ''} {formatted.title || 'Untitled Chapter'}
                            </div>
                            <div className="text-[10px] text-white/30 mt-0.5">
                              {ch.attributes?.publishAt ? new Date(ch.attributes.publishAt).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-white/20 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : pages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white/40 py-20">
                No graphic panels available for this chapter view.
              </div>
            ) : mode === 'scroll' ? (
              /* CONTINUOUS VERTICAL SCROLL MODULE */
              <div className="w-full flex flex-col items-center">
                {pages.map((pageUrl, idx) => (
                  <div key={idx} className="w-full max-w-[800px] flex justify-center bg-[#0a0a0a]">
                    <img 
                      src={pageUrl}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-auto object-contain select-none"
                      loading={idx > 2 ? "lazy" : "eager"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%23111%22 width=%22400%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2216%22%3EPage failed to load%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* DISCRETE SINGLE PANEL STAGE (PAGINATED VIEW) */
              <div className="w-full h-full flex items-center justify-center p-4 min-h-[500px]">
                {pages[currentPage] && (
                  <img 
                    src={pages[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    className="max-w-full max-h-[calc(100vh-140px)] object-contain select-none shadow-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%23111%22 width=%22400%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2216%22%3EPage failed to load%3C/text%3E%3C/svg%3E';
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* READER CONTROL FOOTER NAVIGATION */}
          <div className="bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 px-2 sm:px-6 py-2 sm:py-3 flex items-center justify-between z-10 gap-1 sm:gap-3 overflow-x-auto">
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={goToPreviousChapter}
                disabled={currentChapterIndex === 0}
                className="bg-[#111] border border-white/8 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium transition-all flex items-center gap-1"
              >
                <ChevronLeft size={12} className="sm:w-[13px] sm:h-[13px]" />
                <span className="hidden sm:inline">Prev Ch</span>
              </button>
              <button
                onClick={goToPreviousPage}
                disabled={mode !== 'panel' || currentPage === 0}
                className="bg-[#111] border border-white/8 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium transition-all"
              >
                <span className="hidden sm:inline">← Page</span>
                <span className="sm:hidden">←</span>
              </button>
            </div>

            <div className="text-center mx-1 sm:mx-2 min-w-0 flex-1">
              <div className="font-['Comic_Sans_MS'] text-[9px] sm:text-xs font-black text-white/90 truncate">
                {mode === 'info' ? 'About' : (chapterInfo.title || `Ch ${chapterInfo.chapterNum}`)}
              </div>
              <div className="text-[8px] sm:text-[10px] text-white/30 mt-0 sm:mt-0.5 font-medium truncate">
                {mode === 'info' 
                  ? `${chapters.length} Chapters` 
                  : mode === 'panel' && pages.length > 0 
                    ? `${currentPage + 1}/${pages.length}` 
                    : `${pages.length} Pages`
                }
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={goToNextPage}
                disabled={mode !== 'panel' || currentPage === pages.length - 1}
                className="bg-[#111] border border-white/8 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium transition-all"
              >
                <span className="hidden sm:inline">Page →</span>
                <span className="sm:hidden">→</span>
              </button>
              <button
                onClick={goToNextChapter}
                disabled={currentChapterIndex === chapters.length - 1}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium transition-all flex items-center gap-1 font-['Comic_Sans_MS'] flex-shrink-0"
              >
                <span className="hidden sm:inline">Next Ch</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight size={12} className="sm:w-[13px] sm:h-[13px]" />
              </button>
              
              {/* Social Engagement Actions */}
              <div className="w-px h-4 sm:h-6 bg-white/10 mx-0.5 sm:mx-1 hidden sm:block" />
              
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium transition-all border ${
                    liked
                      ? 'bg-red-500/10 border-red-500/20 text-red-500'
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
                  <span className="text-[8px]">{liked ? '2.5k' : '2.4k'}</span>
                </button>
                <button className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
                  <MessageCircle size={12} />
                </button>
                <button className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-xs font-medium bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
                  <Share2 size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};