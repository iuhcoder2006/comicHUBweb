import { create } from "zustand";
import type { User } from "../types";

const USER_KEY = "comichub_user";

interface UserStore {
  currentUser: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  toggleFollow: (comicId: number) => void;
  isFollowing: (comicId: number) => boolean;
  addHistory: (comicId: number, chapterId: number) => void;
  getFollowing: () => number[];
  getHistory: () => { comicId: number; chapterId: number; timestamp: number }[];
}

function loadUsers(): User[] {
  try {
    const saved = localStorage.getItem("comichub_users");
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function loadCurrentUser(): User | null {
  try {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveUsers(users: User[]) {
  localStorage.setItem("comichub_users", JSON.stringify(users));
}

function saveCurrentUser(user: User | null) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: loadCurrentUser(),
  users: loadUsers(),

  login: (username, password) => {
    const user = get().users.find((u) => u.username === username && u.password === password);
    if (user) {
      set({ currentUser: user });
      saveCurrentUser(user);
      return true;
    }
    return false;
  },

  register: (username, password) => {
    const { users } = get();
    if (users.find((u) => u.username === username)) return false;
    const newUser: User = {
      id: users.length + 1,
      username,
      password,
      following: [],
      history: [],
    };
    const updated = [...users, newUser];
    saveUsers(updated);
    saveCurrentUser(newUser);
    set({ users: updated, currentUser: newUser });
    return true;
  },

  logout: () => {
    set({ currentUser: null });
    saveCurrentUser(null);
  },

  toggleFollow: (comicId) => {
    const { currentUser, users } = get();
    if (!currentUser) return;
    const idx = currentUser.following.indexOf(comicId);
    let newFollowing: number[];
    if (idx === -1) {
      newFollowing = [...currentUser.following, comicId];
    } else {
      newFollowing = currentUser.following.filter((id) => id !== comicId);
    }
    const updatedUser = { ...currentUser, following: newFollowing };
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    saveUsers(updatedUsers);
    saveCurrentUser(updatedUser);
    set({ currentUser: updatedUser, users: updatedUsers });
  },

  isFollowing: (comicId) => {
    return get().currentUser?.following.includes(comicId) ?? false;
  },

  addHistory: (comicId, chapterId) => {
    const { currentUser, users } = get();
    if (!currentUser) return;
    const filtered = currentUser.history.filter((h) => h.comicId !== comicId);
    const updatedUser = {
      ...currentUser,
      history: [{ comicId, chapterId, timestamp: Date.now() }, ...filtered].slice(0, 100),
    };
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    saveUsers(updatedUsers);
    saveCurrentUser(updatedUser);
    set({ currentUser: updatedUser, users: updatedUsers });
  },

  getFollowing: () => get().currentUser?.following ?? [],
  getHistory: () => get().currentUser?.history ?? [],
}));
