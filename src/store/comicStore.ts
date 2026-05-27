import { create } from "zustand";
import type { Comic, Genre, SortMode, FilterMode } from "../types";
import { SEED_COMICS, FEATURED_IDS } from "../data/seed";

const STORAGE_KEY = "comichub_comics";

function loadComics(): Comic[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveComics(comics: Comic[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comics));
}

interface ComicStore {
  comics: Comic[];
  searchQuery: string;
  currentGenre: Genre | "all";
  currentSort: SortMode;
  currentFilter: FilterMode;
  editingId: number | null;
  modalOpen: boolean;
  selectedComicId: number | null;
  setSearchQuery: (q: string) => void;
  setGenre: (genre: Genre | "all") => void;
  setSort: (sort: SortMode) => void;
  setFilter: (filter: FilterMode) => void;
  openModal: (id?: number | null) => void;
  closeModal: () => void;
  saveComic: (data: Omit<Comic, "id" | "chapters" | "views" | "followers" | "lastChapterDate" | "rating" | "isHot" | "status">) => void;
  updateComic: (id: number, data: Partial<Comic>) => void;
  deleteComic: (id: number) => void;
  resetData: () => void;
  selectComic: (id: number | null) => void;
  getFeatured: () => Comic[];
  getByGenre: (genre: Genre, limit?: number) => Comic[];
  getHot: (limit?: number) => Comic[];
  getEditing: () => Comic | undefined;
}

export const useComicStore = create<ComicStore>((set, get) => ({
  comics: loadComics().length ? loadComics() : (saveComics(SEED_COMICS), SEED_COMICS),
  searchQuery: "",
  currentGenre: "all",
  currentSort: "default",
  currentFilter: "all",
  editingId: null,
  modalOpen: false,
  selectedComicId: null,

  setSearchQuery: (q) => set({ searchQuery: q }),
  setGenre: (genre) => set({ currentGenre: genre }),
  setSort: (sort) => set({ currentSort: sort }),
  setFilter: (filter) => set({ currentFilter: filter }),

  openModal: (id = null) => set({ modalOpen: true, editingId: id ?? null }),
  closeModal: () => set({ modalOpen: false, editingId: null }),

  saveComic: (data) => {
    const { comics } = get();
    const newId = comics.length ? Math.max(...comics.map((c) => c.id)) + 1 : 1;
    const now = new Date().toISOString();
    const newComic: Comic = {
      ...data,
      id: newId,
      chapters: [],
      views: 0,
      followers: 0,
      rating: 5.0,
      lastChapterDate: now,
      status: "ongoing",
      isHot: false,
    };
    const updated = [...comics, newComic];
    saveComics(updated);
    set({ comics: updated, modalOpen: false });
  },

  updateComic: (id, data) => {
    const updated = get().comics.map((c) => (c.id === id ? { ...c, ...data } : c));
    saveComics(updated);
    set({ comics: updated, modalOpen: false, editingId: null });
  },

  deleteComic: (id) => {
    const updated = get().comics.filter((c) => c.id !== id);
    saveComics(updated);
    set({ comics: updated });
  },

  resetData: () => {
    saveComics(SEED_COMICS);
    set({ comics: SEED_COMICS, searchQuery: "", currentGenre: "all", currentSort: "default" });
  },

  selectComic: (id) => set({ selectedComicId: id }),

  getFeatured: () => {
    const { comics } = get();
    return FEATURED_IDS.map((id) => comics.find((c) => c.id === id)).filter(Boolean) as Comic[];
  },

  getByGenre: (genre, limit = 8) => {
    return get().comics.filter((c) => c.genre === genre).slice(0, limit);
  },

  getHot: (limit = 10) => {
    return [...get().comics].sort((a, b) => b.views - a.views).slice(0, limit);
  },

  getEditing: () => {
    const { comics, editingId } = get();
    return comics.find((c) => c.id === editingId);
  },
}));
