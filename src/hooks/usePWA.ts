import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [swUpdate, setSwUpdate] = useState(false);

  useEffect(() => {
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // Check if app is already installed
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.addEventListener('updatefound', () => {
              setSwUpdate(true);
            });
          });
        });
      };

      window.addEventListener('load', checkForUpdates);
      const updateInterval = setInterval(checkForUpdates, 60000); // Check every minute

      return () => {
        clearInterval(updateInterval);
        window.removeEventListener('load', checkForUpdates);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const reloadApp = () => {
    window.location.reload();
  };

  return {
    installPrompt,
    isInstalled,
    swUpdate,
    installApp,
    reloadApp,
    canInstall: !!installPrompt && !isInstalled,
  };
};
