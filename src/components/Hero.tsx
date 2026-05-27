import { useState, useMemo } from "react";
import { useComicStore } from "../store/comicStore";
import { timeAgo, formatNumber } from "../types";
import { FEATURED_IDS } from "../data/seed";

export function Hero() {
  const comics = useComicStore((s) => s.comics);
  const selectComic = useComicStore((s) => s.selectComic);
  const openModal = useComicStore((s) => s.openModal);
  const [current, setCurrent] = useState(0);
  const featured = useMemo(() => FEATURED_IDS.map((id) => comics.find((c) => c.id === id)).filter(Boolean) as import("../types").Comic[], [comics]);

  if (featured.length === 0) return null;

  const comic = featured[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0f2a] via-[#1a0a2e] to-[#0b0b1a]">
      <div className="pointer-events-none absolute -right-[10%] -top-1/2 size-[800px] rounded-full bg-[radial-gradient(circle,rgba(233,69,96,.08),transparent_70%)]" />

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-8 px-10 py-12 max-md:px-5 max-md:py-10">
        <div className="relative z-10 min-w-[280px] flex-1">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-400">
              <i className="fas fa-star mr-1" /> Truyện đề cử
            </span>
            {comic.isHot && (
              <span className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-[11px] font-bold text-white">
                Hot
              </span>
            )}
          </div>

          <h2 className="mb-2 text-[40px] font-extrabold leading-tight max-md:text-[30px] max-sm:text-2xl">
            {comic.name}
          </h2>

          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#888]">
            <span><i className="fas fa-user-pen mr-1" />{comic.author}</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-amber-400"><i className="fas fa-star mr-1" />{comic.rating}</span>
            <span className="h-3 w-px bg-white/10" />
            <span><i className="fas fa-eye mr-1" />{formatNumber(comic.views)}</span>
            <span className="h-3 w-px bg-white/10" />
            <span><i className="fas fa-book mr-1" />{comic.chapters.length} chương</span>
          </div>

          <p className="mb-5 max-w-[520px] text-sm leading-relaxed opacity-60 line-clamp-3">
            {comic.desc}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-8 bg-[#e94560]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => selectComic(comic.id)}
              className="rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(233,69,96,.35)]"
            >
              <i className="fas fa-eye mr-2" /> Xem chi tiết
            </button>
            <button
              onClick={() => openModal()}
              className="rounded-xl border border-white/15 bg-transparent px-7 py-3 text-sm font-semibold text-[#e0e0e0] transition hover:border-[#e94560]"
            >
              <i className="fas fa-plus mr-2" /> Thêm truyện
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-[0_0_260px] max-md:flex-[0_0_100%] max-md:flex max-md:justify-center">
          <div className="group relative">
            <img
              src={comic.image}
              alt={comic.name}
              className="w-[240px] rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,.6)] transition duration-500 group-hover:scale-[1.03] max-md:w-[200px]"
              style={{ aspectRatio: "3/4" }}
            />
            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-[11px] text-white/80">
                <i className="fas fa-heart text-[#e94560] text-[10px]" />{formatNumber(comic.followers)}
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-[11px] text-white/80">
                {timeAgo(comic.lastChapterDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
