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
  const setSort = useComicStore((s) => s.setSort);
  const setFilter = useComicStore((s) => s.setFilter);
  const totalItems = useCartStore((s) => s.totalItems());
  const currentUser = useUserStore((s) => s.currentUser);
  const logout = useUserStore((s) => s.logout);
  const selectComic = useComicStore((s) => s.selectComic);
  const [genreOpen, setGenreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/[0.06] bg-[#181825]">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-4 px-6 max-md:px-4">
          <div className="flex cursor-pointer items-center gap-2 text-xl font-extrabold" onClick={() => selectComic(null)}>
            <i className="fas fa-book-open text-[#e94560]" />
            <span>Comic<span className="text-[#e94560]">Hub</span></span>
          </div>

          <div className="hidden flex-1 max-w-[400px] md:block">
            <div className="flex items-center rounded-lg border border-white/10 bg-[#0f0f1a] px-3 transition focus-within:border-[#e94560]">
              <i className="fas fa-search text-xs text-[#555]" />
              <input
                type="text"
                placeholder="Bạn muốn tìm truyện gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-[#555]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onCartToggle} className="relative flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 transition hover:border-[#e94560] hover:text-[#e94560]">
              <i className="fas fa-shopping-cart" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-[#e94560] text-[10px] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {currentUser ? (
              <div ref={userRef} className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 transition hover:border-[#e94560]">
                  <i className="fas fa-user-circle text-[#e94560]" />
                  <span className="max-sm:hidden">{currentUser.username}</span>
                  <i className="fas fa-caret-down text-[10px]" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-xl border border-white/10 bg-[#1e1e30] p-1.5 shadow-2xl">
                    <div className="border-b border-white/[0.06] px-3 py-2 text-xs text-[#555]">
                      <i className="fas fa-user mr-1" /> {currentUser.username}
                    </div>
                    <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 transition hover:bg-[#252538]">
                      <i className="fas fa-clock" /> Lịch sử
                    </button>
                    <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 transition hover:bg-[#252538]">
                      <i className="fas fa-bookmark" /> Theo dõi
                    </button>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10">
                      <i className="fas fa-sign-out-alt" /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button onClick={onAuthOpen} className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:border-[#e94560] hover:text-[#e94560]">
                  Đăng nhập
                </button>
                <button onClick={onAuthOpen} className="cursor-pointer rounded-lg bg-[#e94560] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#d63852]">
                  Đăng ký
                </button>
              </div>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex cursor-pointer items-center justify-center rounded-lg border border-white/10 px-2 py-1.5 text-white/60 md:hidden">
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} />
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-b border-white/[0.06] bg-[#181825]/95 backdrop-blur-sm md:block">
        <ul className="mx-auto flex h-[44px] max-w-[1280px] items-center gap-1 px-6 text-sm">
          <li><button onClick={() => { selectComic(null); setFilter("all"); setSort("default"); }} className="cursor-pointer rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Trang chủ</button></li>
          <li ref={genreRef} className="relative">
            <button onClick={() => setGenreOpen(!genreOpen)} className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">
              Thể loại <i className="fas fa-caret-down text-[10px]" />
            </button>
            {genreOpen && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-[560px] rounded-xl border border-white/10 bg-[#1e1e30] p-4 shadow-2xl">
                <div className="grid grid-cols-4 gap-1">
                  {genreEntries.map(([val, label]) => (
                    <button key={val} onClick={() => { setGenre(val); setGenreOpen(false); setFilter("all"); }}
                      className="cursor-pointer rounded-md px-2.5 py-1.5 text-left text-xs text-white/60 transition hover:bg-[#252538] hover:text-[#e94560]">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li><button onClick={() => { setSort("views"); setFilter("all"); }} className="cursor-pointer rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Xếp hạng</button></li>
          <li><button onClick={() => { setSort("latest"); setFilter("all"); }} className="cursor-pointer rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Mới cập nhật</button></li>
          <li className="ml-auto flex items-center gap-1">
            <button onClick={() => { setGenre("manhwa"); setFilter("all"); }} className="cursor-pointer rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-[#e94560] hover:text-[#e94560]">Manhwa</button>
            <button onClick={() => { setGenre("manhua"); setFilter("all"); }} className="cursor-pointer rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-[#e94560] hover:text-[#e94560]">Manhua</button>
            <button onClick={() => { setGenre("manga"); setFilter("all"); }} className="cursor-pointer rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-[#e94560] hover:text-[#e94560]">Manga</button>
          </li>
        </ul>
      </nav>

      {mobileMenuOpen && (
        <div className="border-b border-white/[0.06] bg-[#1e1e30] md:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center rounded-lg border border-white/10 bg-[#0f0f1a] px-3">
              <i className="fas fa-search text-xs text-[#555]" />
              <input type="text" placeholder="Bạn muốn tìm truyện gì?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-[#555]" />
            </div>
          </div>
          <div className="pb-3">
            <button onClick={() => { selectComic(null); setMobileMenuOpen(false); }} className="block w-full px-6 py-2 text-left text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Trang chủ</button>
            <button onClick={() => { setGenre("all"); setMobileMenuOpen(false); }} className="block w-full px-6 py-2 text-left text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Thể loại</button>
            <button className="block w-full px-6 py-2 text-left text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Xếp hạng</button>
            <button onClick={() => selectComic(null)} className="block w-full px-6 py-2 text-left text-sm text-white/70 transition hover:bg-[#252538] hover:text-white">Mới cập nhật</button>
          </div>
        </div>
      )}
    </header>
  );
}
