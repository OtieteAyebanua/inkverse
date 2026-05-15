import React from 'react';
import { Play } from 'lucide-react';

export interface WideCardProps {
  title: string;
  chapter: string;
  progress: number;
  bgColor: string;
}

export const WideCard = ({ title, chapter, progress, bgColor }: WideCardProps) => (
  <div className="flex-shrink-0 w-[248px] cursor-pointer group">
    <div className="h-[138px] rounded-[10px] overflow-hidden relative transition-all duration-300 group-hover:translate-y-[-6px] group-hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.3)] border border-white/10 group-hover:border-[#3b82f6]/40" style={{ backgroundColor: bgColor }}>
      
      {/* Background Lighting Effect */}
      <div 
        className="absolute inset-0 opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 50%)`
        }}
      />

      {/* Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center font-['Comic_Sans_MS'] text-[32px] font-900 text-white/[0.08] tracking-tight select-none rotate-[-2deg] scale-y-105">
        {title}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-5" />

      {/* Hover Play Button */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
        <div className="w-10 h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.4)] translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <Play size={16} fill="currentColor" className="ml-0.5" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
        <div className="font-['Comic_Sans_MS'] text-[13px] font-900 text-white mb-1 tracking-[-0.3px] group-hover:text-[#3b82f6] transition-colors">{title}</div>
        <div className="text-[10px] font-500 text-white/50 mb-2.5 tracking-[0.4px] uppercase">{chapter}</div>
        
        {/* Progress Bar Container */}
        <div className="space-y-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] text-white/40 tracking-[0.5px] uppercase font-600">Progress</span>
            <span className="text-[9px] font-600 text-[#3b82f6]">{progress}%</span>
          </div>
          <div className="w-full h-[3px] bg-white/8 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
