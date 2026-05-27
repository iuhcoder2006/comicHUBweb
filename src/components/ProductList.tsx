import { useMemo } from "react";
import { useComicStore } from "../store/comicStore";
import { ProductCard } from "./ProductCard";
import { AdminBar } from "./AdminBar";
import type { SortMode } from "../types";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "Mặc định" },
  { value: "views", label: "Xem nhiều" },
  { value: "latest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá: Thấp→Cao" },
  { value: "price-desc", label: "Giá: Cao→Thấp" },
  { value: "name", label: "A→Z" },
];

export function ProductList() {
  const comics = useComicStore((s) => s.comics);
  const searchQuery = useComicStore((s) => s.searchQuery);
  const currentGenre = useComicStore((s) => s.currentGenre);
  const currentSort = useComicStore((s) => s.currentSort);
  const currentFilter = useComicStore((s) => s.currentFilter);
  const setSort = useComicStore((s) => s.setSort);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let result = comics.filter(
      (c) =>
        (c.name.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)) &&
        (currentGenre === "all" || c.genre === currentGenre) &&
        (currentFilter === "all" || (currentFilter === "hot" && c.isHot) || (currentFilter === "completed" && c.status === "completed")),
    );
    if (currentSort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (currentSort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (currentSort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentSort === "views") result.sort((a, b) => b.views - a.views);
    else if (currentSort === "latest") result.sort((a, b) => new Date(b.lastChapterDate).getTime() - new Date(a.lastChapterDate).getTime());
    return result;
  }, [comics, searchQuery, currentGenre, currentSort, currentFilter]);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-8 max-md:px-4 max-md:py-6">
      <AdminBar />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">
          <i className="fas fa-layer-group mr-2 text-[#e94560]" />
          Danh sách truyện
        </h3>
        <div className="flex gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setSort(opt.value)}
              className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition ${
                currentSort === opt.value
                  ? "border-[#e94560] bg-[#e94560]/10 text-[#e94560]"
                  : "border-white/[0.06] bg-transparent text-[#555] hover:border-[#e94560] hover:text-[#e94560]"
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-[#555]">
          <i className="fas fa-search mb-3 block text-4xl opacity-40" />
          <p className="text-base">Không tìm thấy sản phẩm nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 max-md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-sm:grid-cols-2 max-sm:gap-3">
          {filtered.map((c) => (
            <ProductCard key={c.id} comic={c} />
          ))}
        </div>
      )}
    </section>
  );
}
