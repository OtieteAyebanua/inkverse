import React from 'react';

export const SectionHeader = ({ title, linkText, linkHref = "#" }: { title: string; linkText: string; linkHref?: string }) => (
  <div className="flex justify-between items-center mb-5">
    <div className="flex items-center gap-2.5">
      <div className="w-3.5 h-[1px] bg-[#3b82f6]" />
      <h2 className="font-['Comic_Sans_MS'] text-[15px] font-700 text-white tracking-[-0.2px]">{title}</h2>
    </div>
    <a href={linkHref} className="text-[11.5px] text-white/30 cursor-pointer tracking-[0.2px] hover:text-[#3b82f6] transition-colors">
      {linkText}
    </a>
  </div>
);
