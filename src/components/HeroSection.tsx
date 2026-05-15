'use client';

import { Play } from 'lucide-react';

export const HeroSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[55%_45%] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
    <div className="px-4 sm:px-6 md:px-8 lg:px-[52px] py-8 sm:py-10 md:py-12 lg:py-[72px] lg:pb-[60px] flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5">
        <div className="w-[18px] h-[1px] bg-[#3b82f6]" />
        <span className="text-[8px] sm:text-[9px] lg:text-[10.5px] font-500 tracking-[1.5px] sm:tracking-[2px] lg:tracking-[2.5px] uppercase text-[#3b82f6]">
          Editor's pick · Sci-Fi
        </span>
      </div>
      <h1 className="font-['Comic_Sans_MS'] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-800 leading-[1.03] tracking-[-1px] sm:tracking-[-1.2px] lg:tracking-[-1.5px] text-white mb-2 sm:mb-3 lg:mb-4">
        The Last<br /><span className="text-[#3b82f6] italic not-italic">Signal</span>
      </h1>
      <div className="text-[10px] sm:text-[11px] lg:text-[12px] text-white/28 tracking-[0.2px] lg:tracking-[0.3px] mb-2 sm:mb-2.5 lg:mb-3.5">
        By Ayo Bello &nbsp;·&nbsp; 24 chapters
      </div>
      <p className="text-xs sm:text-sm md:text-base lg:text-[14px] text-white/42 leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] font-light max-w-[300px] sm:max-w-[360px] mb-5 sm:mb-6 lg:mb-[30px]">
        A lone engineer intercepts a transmission from a dead satellite — and uncovers a conspiracy reaching the highest levels of power.
      </p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 lg:mb-7">
        {['Sci-Fi', 'Thriller', 'Ongoing'].map(tag => (
          <span key={tag} className="text-[9px] sm:text-[10px] lg:text-[11px] text-white/40 border border-white/10 px-2 sm:px-2.5 py-1 rounded-full tracking-[0.1px] lg:tracking-[0.2px]">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-start sm:items-center">
        <button className="w-full sm:w-auto bg-[#3b82f6] text-white px-4 sm:px-6 py-2 sm:py-[11px] rounded-[7px] text-xs sm:text-[13px] lg:text-[13.5px] font-500 hover:bg-[#2563eb] flex items-center justify-center sm:justify-start gap-[7px] tracking-[0.1px] transition-colors">
          <Play size={14} fill="currentColor" /> Read now
        </button>
        <button className="w-full sm:w-auto bg-white/5 text-white/65 border border-white/8 px-4 sm:px-5 py-2 sm:py-[11px] rounded-[7px] text-xs sm:text-[13px] lg:text-[13.5px] hover:bg-white/8 transition-colors">
          Free preview
        </button>
      </div>
      
      <div className="flex gap-3 sm:gap-4 lg:gap-[28px] mt-6 sm:mt-7 lg:mt-9 pt-4 sm:pt-5 lg:pt-7 border-t border-white/5">
        {[
          { val: '4.9', label: 'Rating' },
          { val: '142k', label: 'Readers' },
          { val: '24', label: 'Chapters' }
        ].map(stat => (
          <div key={stat.label}>
            <div className="font-['Comic_Sans_MS'] text-lg sm:text-xl lg:text-[20px] font-700 text-white tracking-[-0.3px] sm:tracking-[-0.4px] lg:tracking-[-0.5px] mb-1 sm:mb-[2px] lg:mb-[3px]">{stat.val}</div>
            <div className="text-[8px] sm:text-[9px] lg:text-[10.5px] text-white/25 tracking-[0.5px] sm:tracking-[0.6px] lg:tracking-[0.8px] uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Hero Right Panel Grid */}
    <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-[1px] bg-[#111]">
      {[
        { title: 'Void Runner', sub: 'Sci-Fi · Ch 12', color: '#0d0a0d', water: 'VOID' },
        { title: 'Iron Ghost', sub: 'Action · Ch 7', color: '#0d0808', water: 'IRON' },
        { title: 'Jade Empire', sub: 'Fantasy · Ch 3', color: '#080d09', water: 'JADE' },
        { title: 'Red Dust', sub: 'Western · Ch 9', color: '#0d0d08', water: 'RED' }
      ].map(p => (
        <div key={p.title} className="relative overflow-hidden group cursor-pointer flex items-end p-3 sm:p-4 lg:p-[14px_16px] transition-colors" style={{ backgroundColor: p.color }}>
          <div className="absolute inset-0 flex items-center justify-center font-['Comic_Sans_MS'] text-2xl sm:text-[28px] lg:text-[30px] font-800 text-white/[0.035] tracking-[-1px] pointer-events-none select-none group-hover:text-white/[0.06] transition-colors">
            {p.water}
          </div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-[5px] h-[5px] rounded-full bg-[#3b82f6] opacity-70" />
          <div className="relative z-2">
            <div className="font-['Comic_Sans_MS'] text-[11px] sm:text-[12px] font-700 text-white/80 mb-0.5">{p.title}</div>
            <div className="text-[9px] sm:text-[10px] text-white/28 tracking-[0.2px] lg:tracking-[0.3px]">{p.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
