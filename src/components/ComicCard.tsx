import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export interface ComicCardProps {
  id?: number;
  title: string;
  chapter: string;
  genre: string;
  badge?: { text: string; color: string };
  bgColor: string;
}

export const ComicCard = ({ id = 1, title, chapter, genre, badge, bgColor }: ComicCardProps) => (
  <Link to={`/read/${id}`} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] cursor-pointer group">
    <div 
      className="w-full aspect-video sm:aspect-[5/7] rounded-[8px] sm:rounded-[10px] overflow-hidden relative transition-all duration-300 group-hover:translate-y-[-6px] sm:group-hover:translate-y-[-8px] group-hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.25)] border border-white/10 group-hover:border-[#3b82f6]/40"
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Graphic Effect */}
      <div 
         className="absolute inset-0 opacity-40 mix-blend-overlay"
         style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.5) 0%, transparent 50%)`
         }}
      />

      {/* Comic Book Cover Text */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <h3 className="font-['Comic_Sans_MS'] text-base sm:text-xl md:text-2xl lg:text-[28px] font-900 text-white/10 tracking-tight leading-[1.1] text-center uppercase rotate-[-3deg] scale-y-110 line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/20 to-transparent" />
      
      {badge && (
        <div className={`absolute top-2 sm:top-[12px] left-2 sm:left-[12px] z-10 text-[7px] sm:text-[9px] font-900 tracking-[1px] sm:tracking-[1.5px] uppercase px-2 sm:px-3 py-1 sm:py-[5px] rounded-[4px] sm:rounded-[6px] shadow-lg ${badge.color}`}>
          {badge.text}
        </div>
      )}

      {/* Hover Play Button */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
        <div className="w-10 sm:w-[46px] h-10 sm:h-[46px] rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] translate-y-3 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <Play size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor"/>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-[14px] left-2 sm:left-[14px] right-2 sm:right-[14px] z-10">
        <div className="inline-block text-[8px] sm:text-[10px] font-700 text-white/70 tracking-[0.3px] sm:tracking-[0.5px] uppercase bg-black/40 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[3px] sm:rounded-[4px] backdrop-blur-md border border-white/10">
          {chapter}
        </div>
      </div>
    </div>
    <div className="pt-2 sm:pt-3 px-0.5 sm:px-1">
      <div className="text-xs sm:text-sm md:text-base lg:text-[14px] font-800 text-white/90 truncate mb-0.5 sm:mb-1 font-['Comic_Sans_MS'] tracking-[-0.1px] sm:tracking-[-0.2px] group-hover:text-[#3b82f6] transition-colors">{title}</div>
      <div className="text-[9px] sm:text-[11px] font-500 text-[#3b82f6]/70 tracking-[0.3px] sm:tracking-[0.5px] uppercase">{genre}</div>
    </div>
  </Link>
);
