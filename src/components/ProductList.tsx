import { useMemo } from "react";
import { useComicStore } from "../store/comicStore";
import { ProductCard } from "./ProductCard";
import { AdminBar } from "./AdminBar";
import type { SortMode } from "../types";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp→Cao" },
  { value: "price-desc", label: "Giá: Cao→Thấp" },
  { value: "name", label: "A→Z" },
];

export function ProductList() {
  const comics = useComicStore((s) => s.comics);
  const searchQuery = useComicStore((s) => s.searchQuery);
  const currentGenre = useComicStore((s) => s.currentGenre);
  const currentSort = useComicStore((s) => s.currentSort);
  const setSort = useComicStore((s) => s.setSort);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let result = comics.filter(
      (c) =>
        (c.name.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)) &&
        (currentGenre === "all" || c.genre === currentGenre),
    );
    if (currentSort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (currentSort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (currentSort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [comics, searchQuery, currentGenre, currentSort]);

  return (
    <section className="products-section mx-auto max-w-[1280px] px-10 py-8 max-md:px-5 max-md:py-6">
      <AdminBar />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold max-sm:text-lg">
          <i className="fas fa-layer-group mr-2 text-[#e94560]" />
          Danh sách truyện
        </h3>
        <div className="flex gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`cursor-pointer rounded-lg border px-4 py-1.5 text-xs font-medium transition ${
                currentSort === opt.value
                  ? "border-[#e94560] bg-[#e94560]/15 text-[#e94560]"
                  : "border-white/[.08] bg-transparent text-[#888] hover:border-[#e94560] hover:bg-[#e94560]/15 hover:text-[#e94560]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="col-span-full py-20 text-center text-[#666]">
          <i className="fas fa-search mb-4 block text-5xl" />
          <p className="text-lg">Không tìm thấy sản phẩm nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 max-md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-md:gap-3.5 max-sm:grid-cols-2 max-sm:gap-2.5">
          {filtered.map((c) => (
            <ProductCard key={c.id} comic={c} />
          ))}
        </div>
      )}
    </section>
  );
}
