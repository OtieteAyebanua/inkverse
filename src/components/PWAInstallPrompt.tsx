import { useState } from 'react';
import { X, Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PWAInstallPrompt = () => {
  const { canInstall, installApp, swUpdate, reloadApp } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall && !swUpdate) return null;

  if (swUpdate) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-lg p-4 max-w-sm z-40 animate-slide-up">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Update Available</h3>
            <p className="text-xs text-blue-100">A new version of InkVerse is ready!</p>
          </div>
          <button
            onClick={reloadApp}
            className="mt-2 px-3 py-1 bg-white text-blue-600 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            Update Now
          </button>
        </div>
      </div>
    );
  }

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-[#080808] to-[#111] text-white rounded-lg shadow-lg p-4 max-w-sm z-40 border border-white/10 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Download size={16} className="text-blue-400" />
            <h3 className="font-['Comic_Sans_MS'] font-bold text-sm">Install InkVerse</h3>
          </div>
          <p className="text-xs text-white/60">Add InkVerse to your home screen for quick access</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-white/40 hover:text-white/70 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <button
        onClick={() => {
          installApp();
          setDismissed(true);
        }}
        className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors font-['Comic_Sans_MS']"
      >
        Install App
      </button>
    </div>
  );
};
