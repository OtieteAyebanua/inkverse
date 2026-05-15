# InkVerse PWA Setup Guide

Your app is now configured as a Progressive Web App (PWA)! Here's what's been set up:

## ✅ What's Included

1. **Service Worker** (`public/service-worker.js`)
   - Offline support with smart caching
   - Network-first for API calls (MangaDex)
   - Cache-first for static assets
   - Automatic cache updates

2. **Web App Manifest** (`public/manifest.json`)
   - App metadata and branding
   - App shortcuts for quick navigation
   - Screenshot definitions
   - Theme and background colors

3. **PWA Meta Tags** (in `index.html`)
   - Theme color
   - Apple mobile web app configuration
   - Viewport optimization

4. **PWA Hook** (`src/hooks/usePWA.ts`)
   - Install prompt handling
   - App state detection
   - Service worker update detection

## 📱 How to Add Icons

You need to add these icon files to the `public/` folder:

### Required Icons:
- `icon-192x192.png` - 192x192px PNG icon
- `icon-512x512.png` - 512x512px PNG icon
- `icon-maskable-192x192.png` - 192x192px PNG (for maskable/adaptive icons on Android)
- `icon-maskable-512x512.png` - 512x512px PNG (for maskable/adaptive icons on Android)

### Icon Requirements:
- **Format**: PNG with transparency
- **Colors**: Should work well on dark background (#080808)
- **Safe area**: For maskable icons, keep important content within the center 80% of the square
- **Style**: Consider the "Ink" theme - perhaps a pen/ink bottle, book, or manga-related symbol

### How to Create Icons:

**Option 1: Use an online tool**
- [PWA Icon Generator](https://www.pwabuilder.com/)
- [Favicon Generator](https://realfavicongenerator.net/)

**Option 2: If you have a design**
- Create base 512x512px image
- Export as PNG (transparent background preferred)
- Resize to 192x192px for the smaller version
- For maskable versions, ensure logo fits in center 80% of canvas

**Option 3: Quick SVG to PNG**
If you have an SVG, convert it using an online tool:
- [CloudConvert](https://cloudconvert.com/) - SVG to PNG
- [Convertio](https://convertio.co/) - SVG to PNG

## 🎨 Recommended Icon Design

For InkVerse, consider:
- Stylized ink pen or brush stroke
- Open book or manga panel frame
- "IV" monogram with ink aesthetic
- Keep the color scheme: dark background with blue/light accents

## 🚀 Using the PWA Hook in Components

Example: Add install button to your app

```typescript
import { usePWA } from '../hooks/usePWA';
import { Download } from 'lucide-react';

export const InstallButton = () => {
  const { canInstall, installApp, isInstalled } = usePWA();

  if (isInstalled || !canInstall) return null;

  return (
    <button
      onClick={installApp}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Download size={16} />
      Install App
    </button>
  );
};
```

## 📋 PWA Features Enabled

Once icons are added, users can:

✅ **Install the app** on their home screen (Android & iOS)  
✅ **Work offline** with cached content  
✅ **Quick launch** from home screen  
✅ **App shortcuts** (Browse, Creators)  
✅ **Native-like experience** (standalone mode)  
✅ **Installable** from browser "Install" button  

## 🔗 Testing Your PWA

1. Add your icons to `public/` folder
2. Run `npm run dev`
3. Open in Chrome DevTools → Application tab → Manifest
4. Should show "Installable" if all requirements met
5. Click "Install" button in address bar (if available)

## 🛠️ Troubleshooting

**App not installable?**
- Check that all icon files are in `public/` folder
- Verify manifest.json is valid JSON
- Check browser console for errors
- Ensure service worker is registered

**Icons not showing?**
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check that icon paths in manifest.json match actual files
- Verify PNG files are valid (not corrupted)

## 📚 Resources

- [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

**Next Steps:**
1. Create or obtain 4 PNG icon files
2. Place them in `public/` folder
3. Your PWA is ready to install! 🎉
