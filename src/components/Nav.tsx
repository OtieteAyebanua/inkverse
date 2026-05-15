import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';

export const Nav = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'Creators', path: '/creators' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[52px] h-16 sm:h-[62px] border-b border-white/5 bg-[#080808] font-['Comic_Sans_MS']">
      <div className="flex items-center gap-4 sm:gap-7">
        <Link to="/" className="font-['Comic_Sans_MS'] text-base sm:text-lg lg:text-[20px] font-black tracking-tight text-white hover:opacity-80 transition-opacity">
          Ink<span className="text-blue-500">Verse</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-7 ml-0 lg:ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                location.pathname === link.path
                  ? 'text-white/90'
                  : 'text-white/35 hover:text-white/75'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <Search size={18} className="text-white/35 cursor-pointer hover:text-white/70 transition-colors" />
        <Bell size={18} className="text-white/35 cursor-pointer hover:text-white/70 transition-colors" />
        
        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <button className="bg-transparent border border-white/12 text-white/60 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm hover:border-white/30 hover:text-white transition-all">
            Sign in
          </button>
          <button className="bg-blue-500 text-white px-3 sm:px-[18px] py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-white/5 rounded-md transition-colors"
        >
          {mobileMenuOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-[62px] left-0 right-0 bg-[#0a0a0a] border-b border-white/5 md:hidden z-50">
          <div className="flex flex-col gap-0 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors py-3 px-2 rounded ${
                  location.pathname === link.path
                    ? 'text-white/90 bg-white/5'
                    : 'text-white/35 hover:text-white/75 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/5 mt-3 pt-3 flex flex-col gap-2">
              <button className="bg-transparent border border-white/12 text-white/60 px-4 py-2 rounded-md text-sm w-full hover:border-white/30 hover:text-white transition-all">
                Sign in
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium w-full hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
