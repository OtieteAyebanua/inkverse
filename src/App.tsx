import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { Creators } from './pages/Creators';
import { ComicReader } from './pages/ComicReader';

export default function InkVerse() {
  return (
    <Router>
      <div className="bg-[#080808] text-[#e8e8e8] min-h-screen w-full overflow-x-hidden selection:bg-[#3b82f6]/30">
        <Routes>
          <Route path="/read/:comicId" element={<ComicReader />} />
          <Route
            path="*"
            element={
              <>
                <Nav />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/creators" element={<Creators />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        {/* Global CSS for hiding scrollbars while maintaining functionality */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slideUp 0.4s ease-out forwards;
          }
        `}</style>
      </div>
    </Router>
  );
}
