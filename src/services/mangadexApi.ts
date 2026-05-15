const MANGADEX_API = 'https://api.mangadex.org';

export interface MangaDexManga {
  id: string;
  attributes: {
    title: { en?: string };
    description: { en?: string };
    altTitles?: Array<{ en?: string }>;
    status: string;
    year?: number;
    contentRating: string;
    authorIds?: string[];
    artistIds?: string[];
    tags?: Array<{
      id: string;
      attributes: {
        name: { en?: string };
      };
    }>;
    coverArt?: Array<{
      id: string;
      attributes?: {
        fileName?: string;
      };
    }>;
  };
  relationships?: Array<{
    id: string;
    type: string;
    attributes?: {
      name?: string;
      fileName?: string;
    };
  }>;
}

export interface MangaDexChapter {
  id: string;
  attributes: {
    title?: string;
    chapter?: string;
    volume?: string;
    pages: number;
    translatedLanguage: string;
    publishAt: string;
  };
}

export interface MangaDexPage {
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
  baseUrl: string;
}

// Search manga by title
export const searchMangaDex = async (query: string, limit = 20) => {
  try {
    const params = new URLSearchParams();
    
    // Only add title if query is not empty
    if (query.trim()) {
      params.append('title', query);
      params.append('order[relevance]', 'desc');
    } else {
      // Default ordering when no search query
      params.append('order[followedCount]', 'desc');
    }
    
    params.append('limit', limit.toString());
    params.append('includes[]', 'author');
    params.append('includes[]', 'artist');
    params.append('includes[]', 'cover_art');
    
    const response = await fetch(`${MANGADEX_API}/manga?${params}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to search MangaDex:', error);
    return [];
  }
};

// Get manga details
export const getMangaById = async (id: string) => {
  try {
    const response = await fetch(`${MANGADEX_API}/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch manga:', error);
    return null;
  }
};

// Get manga cover image URL
export const getMangaCoverUrl = (manga: MangaDexManga, size: 'small' | 'medium' | 'large' = 'medium') => {
  try {
    const coverArt = manga.relationships?.find((r: any) => r.type === 'cover_art');
    if (!coverArt?.attributes?.fileName) return null;
    
    const filename = coverArt.attributes.fileName;
    const sizes: Record<string, string> = {
      small: '256',
      medium: '256',  // Use 256px as default medium (docs only have 256 and 512)
      large: '512'
    };
    
    // Keep the original filename extension and append .{size}.jpg
    return `https://uploads.mangadex.org/covers/${manga.id}/${filename}.${sizes[size]}.jpg`;
  } catch (error) {
    return null;
  }
};

// Get manga title
export const getMangaTitle = (manga: MangaDexManga): string => {
  return manga.attributes?.title?.en || 
         Object.values(manga.attributes?.title || {})[0] as string ||
         'Unknown Title';
};

// Get manga description
export const getMangaDescription = (manga: MangaDexManga): string => {
  const desc = manga.attributes?.description;
  if (typeof desc === 'string') return desc;
  if (desc && typeof desc === 'object') {
    return Object.values(desc)[0] as string || '';
  }
  return '';
};

// Get chapters for a manga
export const getMangaChapters = async (mangaId: string, limit = 500, offset = 0) => {
  try {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    params.append('order[chapter]', 'asc');
    params.append('translatedLanguage[]', 'en');
    params.append('includes[]', 'scanlation_group');
    
    const response = await fetch(`${MANGADEX_API}/manga/${mangaId}/feed?${params}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
    return [];
  }
};

// Get chapter pages (images)
export const getChapterPages = async (chapterId: string): Promise<string[]> => {
  try {
    const response = await fetch(`${MANGADEX_API}/at-home/server/${chapterId}`);
    
    if (!response.ok) {
      console.error(`Failed to get chapter pages: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    
    if (data.result !== 'ok') {
      console.error('MangaDex API error:', data);
      return [];
    }
    
    if (!data.chapter || !data.baseUrl) {
      console.error('Invalid chapter data structure:', data);
      return [];
    }
    
    const { baseUrl, chapter } = data;
    const hash = chapter.hash;
    const pages = chapter.data;
    
    if (!hash || !pages || pages.length === 0) {
      console.error('No pages found in chapter data');
      return [];
    }
    
    // Return full URLs to chapter pages
    const pageUrls = pages.map((page: string) => `${baseUrl}/data/${hash}/${page}`);
    console.log(`Loaded ${pageUrls.length} pages for chapter ${chapterId}`);
    return pageUrls;
  } catch (error) {
    console.error('Failed to fetch chapter pages:', error);
    return [];
  }
};

// Get author name
export const getAuthorName = (manga: MangaDexManga): string => {
  try {
    const author = manga.relationships?.find((r: any) => r.type === 'author');
    return author?.attributes?.name || 'Unknown Author';
  } catch {
    return 'Unknown Author';
  }
};

// Get status label
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'ongoing': 'Publishing',
    'completed': 'Complete',
    'hiatus': 'Hiatus',
    'cancelled': 'Cancelled'
  };
  return labels[status?.toLowerCase()] || status;
};

// Format chapter info
export const formatChapter = (chapter: MangaDexChapter): { title: string; chapterNum: string } => {
  const chapterNum = chapter.attributes.chapter || '0';
  const volume = chapter.attributes.volume ? `Vol. ${chapter.attributes.volume}` : '';
  const title = chapter.attributes.title || 'No title';
  
  return {
    title: title,
    chapterNum: `Ch. ${chapterNum} ${volume}`.trim()
  };
};

// Get trending manga
export const getTrendingManga = async (limit = 20) => {
  try {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    params.append('order[followedCount]', 'desc');
    params.append('includes[]', 'author');
    params.append('includes[]', 'artist');
    params.append('includes[]', 'cover_art');
    
    const response = await fetch(`${MANGADEX_API}/manga?${params}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch trending manga:', error);
    return [];
  }
};
