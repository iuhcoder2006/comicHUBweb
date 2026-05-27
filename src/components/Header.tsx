import { useState, useRef, useEffect } from "react";
import { useComicStore } from "../store/comicStore";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { GENRE_LABELS, type Genre } from "../types";

interface Props {
  onCartToggle: () => void;
  onAuthOpen: () => void;
}

export function Header({ onCartToggle, onAuthOpen }: Props) {
  const searchQuery = useComicStore((s) => s.searchQuery);
  const setSearchQuery = useComicStore((s) => s.setSearchQuery);
  const setGenre = useComicStore((s) => s.setGenre);
  const totalItems = useCartStore((s) => s.totalItems());
  const currentUser = useUserStore((s) => s.currentUser);
  const logout = useUserStore((s) => s.logout);
  const selectComic = useComicStore((s) => s.selectComic);
  const [genreOpen, setGenreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const genreRef = useRef<HTMLLIElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) setGenreOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const genreEntries = Object.entries(GENRE_LABELS) as [Genre, string][];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b1a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-10 max-md:px-5 max-sm:h-[60px] max-sm:px-3.5">
        <div className="flex items-center gap-6 max-md:gap-4">
          <div
            className="flex cursor-pointer items-center gap-2.5 text-2xl font-extrabold max-sm:text-xl"
            onClick={() => selectComic(null)}
          >
            <i className="fas fa-book-open text-[#e94560]" />
            Comic<span className="text-[#e94560]">Hub</span>
          </div>

          <nav className="flex items-center gap-1 text-sm font-medium max-md:hidden">
            <a onClick={() => selectComic(null)} className="cursor-pointer rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white">
              Trang chủ
            </a>
            <li ref={genreRef} className="relative list-none">
              <span
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Thể loại <i className="fas fa-caret-down text-[10px]" />
              </span>
              {genreOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-[520px] rounded-xl border border-white/10 bg-[#16163a] p-4 shadow-2xl backdrop-blur-xl">
                  <div className="grid grid-cols-4 gap-1">
                    {genreEntries.map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => { setGenre(val); setGenreOpen(false); }}
                        className="cursor-pointer rounded-lg px-2 py-1.5 text-left text-xs text-white/70 transition hover:bg-[#e94560]/15 hover:text-[#e94560]"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <a onClick={() => selectComic(null)} className="cursor-pointer rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white">
              Xếp hạng
            </a>
            <a onClick={() => selectComic(null)} className="cursor-pointer rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white">
              Mới cập nhật
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-white/10 bg-white/[.06] px-3 transition focus-within:border-[#e94560] focus-within:bg-[#e94560]/[.06] max-sm:hidden">
            <i className="fas fa-search text-sm text-[#888]" />
            <input
              type="text"
              placeholder="Tìm truyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[180px] bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-[#666] max-md:w-[120px]"
            />
          </div>

          {currentUser ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <i className="fas fa-user-circle text-[#e94560]" />
                <span className="max-sm:hidden">{currentUser.username}</span>
                <i className="fas fa-caret-down text-[10px] text-[#888]" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-white/10 bg-[#16163a] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="mb-2 px-3 py-2 text-xs text-[#888] border-b border-white/5">
                    <i className="fas fa-user mr-1" /> {currentUser.username}
                  </div>
                  <button onClick={() => { setUserMenuOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 transition hover:bg-white/5">
                    <i className="fas fa-clock text-[10px]" /> Lịch sử
                  </button>
                  <button onClick={() => { setUserMenuOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 transition hover:bg-white/5">
                    <i className="fas fa-bookmark text-[10px]" /> Theo dõi
                  </button>
                  <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10">
                    <i className="fas fa-sign-out-alt text-[10px]" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={onAuthOpen} className="cursor-pointer rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-[#e94560] hover:text-[#e94560] max-sm:hidden">
                Đăng nhập
              </button>
              <button onClick={onAuthOpen} className="cursor-pointer rounded-lg bg-gradient-to-r from-[#e94560] to-[#d63852] px-3 py-2 text-xs font-semibold text-white transition hover:shadow-[0_4px_16px_rgba(233,69,96,.3)] max-sm:hidden">
                Đăng ký
              </button>
            </div>
          )}

          <button
            onClick={onCartToggle}
            className="relative flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4 py-2 text-sm font-semibold text-white transition hover:scale-104 hover:shadow-[0_4px_20px_rgba(233,69,96,.35)] max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
          >
            <i className="fas fa-shopping-cart" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#e94560]">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
