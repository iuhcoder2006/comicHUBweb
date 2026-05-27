export type Genre =
  | "action"
  | "comedy"
  | "adventure"
  | "fantasy"
  | "romance"
  | "sci-fi"
  | "slice-of-life"
  | "drama"
  | "horror"
  | "mystery"
  | "martial-arts"
  | "harem"
  | "school-life"
  | "isekai"
  | "psychological"
  | "historical"
  | "seinen"
  | "shounen"
  | "shoujo"
  | "webtoon"
  | "manga"
  | "manhwa"
  | "manhua";

export interface Chapter {
  id: number;
  number: number;
  title: string;
  date: string;
}

export interface Comic {
  id: number;
  name: string;
  author: string;
  price: number;
  image: string;
  genre: Genre;
  desc: string;
  chapters: Chapter[];
  views: number;
  followers: number;
  isHot: boolean;
  status: "ongoing" | "completed";
  rating: number;
  lastChapterDate: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  following: number[];
  history: { comicId: number; chapterId: number; timestamp: number }[];
}

export type SortMode = "default" | "price-asc" | "price-desc" | "name";

export const GENRE_LABELS: Record<Genre, string> = {
  action: "Action",
  comedy: "Comedy",
  adventure: "Adventure",
  fantasy: "Fantasy",
  romance: "Romance",
  "sci-fi": "Sci-Fi",
  "slice-of-life": "Slice of Life",
  drama: "Drama",
  horror: "Horror",
  mystery: "Mystery",
  "martial-arts": "Martial Arts",
  harem: "Harem",
  "school-life": "School Life",
  isekai: "Isekai",
  psychological: "Psychological",
  historical: "Historical",
  seinen: "Seinen",
  shounen: "Shounen",
  shoujo: "Shoujo",
  webtoon: "Webtoon",
  manga: "Manga",
  manhwa: "Manhwa",
  manhua: "Manhua",
};

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Vài giây trước";
  if (mins < 60) return `${mins} Phút Trước`;
  if (hrs < 24) return `${hrs} Giờ Trước`;
  if (days < 7) return `${days} Ngày Trước`;
  if (days < 30) return `${Math.floor(days / 7)} Tuần Trước`;
  return `${Math.floor(days / 30)} Tháng Trước`;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}
