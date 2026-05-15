/**
 * Jikan API Service (MyAnimeList)
 * Free anime/manga API with no authentication required
 * Documentation: https://docs.api.jikan.moe/
 * 
 * Rate Limits:
 * - 60 requests per minute
 * - 3 requests per second
 * - Unlimited per day
 */

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export interface MangaResponse {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english?: string;
  title_synonyms?: string[];
  synopsis: string;
  background?: string;
  type: string;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  published: {
    from: string;
    to: string | null;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string: string;
  };
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  explicit_genres: Array<any>;
  authors: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
}

export interface AnimeResponse {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  status: string;
  aired: {
    from: string;
    to: string;
  };
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  score: number;
  scored_by: number;
}

/**
 * Search for manga with advanced filtering
 * @param query - Search query
 * @param page - Page number (default 1)
 * @param limit - Results per page (default 25, max 25)
 * @param type - Filter by type (manga, novel, lightnovel, etc)
 * @param status - Filter by status (publishing, complete, hiatus, discontinued, planned)
 * @param order_by - Sort by (mal_id, title, start_date, end_date, chapters, volumes, score, popularity, rank)
 * @param sort - asc or desc
 */
export async function searchManga(
  query: string,
  page: number = 1,
  options?: {
    limit?: number;
    type?: string;
    status?: string;
    order_by?: string;
    sort?: 'asc' | 'desc';
  }
): Promise<MangaResponse[]> {
  try {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      limit: (options?.limit || 25).toString(),
    });

    if (options?.type) params.append('type', options.type);
    if (options?.status) params.append('status', options.status);
    if (options?.order_by) params.append('order_by', options.order_by);
    if (options?.sort) params.append('sort', options.sort);

    const response = await fetch(`${JIKAN_API_URL}/manga?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch manga');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get manga by ID with full details
 */
export async function getMangaById(id: number): Promise<MangaResponse | null> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/manga/${id}/full`);

    if (!response.ok) throw new Error('Failed to fetch manga');

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Jikan API Error:', error);
    return null;
  }
}

/**
 * Search for anime with advanced filtering
 */
export async function searchAnime(
  query: string,
  page: number = 1,
  options?: {
    limit?: number;
    type?: string;
    status?: string;
    order_by?: string;
    sort?: 'asc' | 'desc';
  }
): Promise<AnimeResponse[]> {
  try {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      limit: (options?.limit || 25).toString(),
    });

    if (options?.type) params.append('type', options.type);
    if (options?.status) params.append('status', options.status);
    if (options?.order_by) params.append('order_by', options.order_by);
    if (options?.sort) params.append('sort', options.sort);

    const response = await fetch(`${JIKAN_API_URL}/anime?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch anime');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get anime by ID with full details
 */
export async function getAnimeById(id: number): Promise<AnimeResponse | null> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/anime/${id}/full`);

    if (!response.ok) throw new Error('Failed to fetch anime');

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Jikan API Error:', error);
    return null;
  }
}

/**
 * Get top manga
 * @param filter - airing, upcoming, bypopularity
 * @param page - Page number
 * @param limit - Results per page
 */
export async function getTopManga(
  filter: 'publishing' | 'upcoming' | 'bypopularity' | 'favorite' = 'publishing',
  page: number = 1,
  limit: number = 25
): Promise<MangaResponse[]> {
  try {
    const params = new URLSearchParams({
      filter,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${JIKAN_API_URL}/top/manga?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch top manga');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get top anime
 */
export async function getTopAnime(
  filter: 'airing' | 'upcoming' | 'bypopularity' | 'favorite' = 'airing',
  page: number = 1,
  limit: number = 25
): Promise<AnimeResponse[]> {
  try {
    const params = new URLSearchParams({
      filter,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${JIKAN_API_URL}/top/anime?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch top anime');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get manga characters
 */
export async function getMangaCharacters(mangaId: number): Promise<any[]> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/manga/${mangaId}/characters`);

    if (!response.ok) throw new Error('Failed to fetch characters');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get manga reviews
 */
export async function getMangaReviews(mangaId: number, page: number = 1): Promise<any[]> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    const response = await fetch(`${JIKAN_API_URL}/manga/${mangaId}/reviews?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch reviews');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get manga recommendations
 */
export async function getMangaRecommendations(mangaId: number): Promise<any[]> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/manga/${mangaId}/recommendations`);

    if (!response.ok) throw new Error('Failed to fetch recommendations');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get manga genres
 */
export async function getMangaGenres(): Promise<any[]> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/genres/manga`);

    if (!response.ok) throw new Error('Failed to fetch genres');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get anime genres
 */
export async function getAnimeGenres(): Promise<any[]> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/genres/anime`);

    if (!response.ok) throw new Error('Failed to fetch genres');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

/**
 * Get random manga
 */
export async function getRandomManga(): Promise<MangaResponse | null> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/random/manga`);

    if (!response.ok) throw new Error('Failed to fetch random manga');

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Jikan API Error:', error);
    return null;
  }
}

/**
 * Get random anime
 */
export async function getRandomAnime(): Promise<AnimeResponse | null> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/random/anime`);

    if (!response.ok) throw new Error('Failed to fetch random anime');

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Jikan API Error:', error);
    return null;
  }
}

/**
 * Get seasonal anime
 */
export async function getSeasonalAnime(
  year: number,
  season: 'winter' | 'spring' | 'summer' | 'fall',
  page: number = 1,
  limit: number = 25
): Promise<AnimeResponse[]> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${JIKAN_API_URL}/seasons/${year}/${season}?${params.toString()}`);

    if (!response.ok) throw new Error('Failed to fetch seasonal anime');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Jikan API Error:', error);
    return [];
  }
}

export default {
  searchManga,
  getMangaById,
  searchAnime,
  getAnimeById,
  getTopManga,
  getTopAnime,
  getMangaCharacters,
  getMangaReviews,
  getMangaRecommendations,
  getMangaGenres,
  getAnimeGenres,
  getRandomManga,
  getRandomAnime,
  getSeasonalAnime,
};
