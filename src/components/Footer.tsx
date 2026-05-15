export const Footer = () => (
  <footer className="px-4 sm:px-6 md:px-8 lg:px-[52px] py-4 sm:py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 bg-[#080808]">
    <div className="font-['Comic_Sans_MS'] text-sm sm:text-base lg:text-[16px] font-800 text-white/25">
      Ink<span className="text-[#3b82f6]/60 italic not-italic">Verse</span>
    </div>
    <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-[22px]">
      {['About', 'Creators', 'Help', 'Privacy', 'Terms'].map(link => (
        <a key={link} className="text-[10px] sm:text-[11px] lg:text-[11.5px] text-white/18 hover:text-white/45 cursor-pointer transition-colors tracking-tight">{link}</a>
      ))}
    </div>
    <div className="text-[9px] sm:text-[10px] lg:text-[11px] text-white/12 tracking-tight">© 2024 InkVerse</div>
  </footer>
);
