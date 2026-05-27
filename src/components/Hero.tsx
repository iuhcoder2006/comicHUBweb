import { useState, useMemo } from "react";
import { useComicStore } from "../store/comicStore";
import { timeAgo, formatNumber } from "../types";
import { FEATURED_IDS } from "../data/seed";

export function Hero() {
  const comics = useComicStore((s) => s.comics);
  const selectComic = useComicStore((s) => s.selectComic);
  const [current, setCurrent] = useState(0);
  const featured = useMemo(() => FEATURED_IDS.map((id) => comics.find((c) => c.id === id)).filter(Boolean) as import("../types").Comic[], [comics]);

  if (featured.length === 0) return null;

  const comic = featured[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      <div className="absolute -right-20 -top-20 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(233,69,96,0.06),transparent_70%)]" />

      <div className="mx-auto flex max-w-[1280px] items-center gap-8 px-6 py-8 max-md:flex-col max-md:px-4 max-md:py-6">
        <div className="relative z-10 min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block rounded-md border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
              <i className="fas fa-star mr-1" /> Truyện đề cử
            </span>
            {comic.isHot && (
              <span className="inline-block rounded-md bg-gradient-to-r from-orange-500 to-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white">Hot</span>
            )}
          </div>

          <h2 className="mb-1 text-2xl font-extrabold leading-tight max-md:text-xl">{comic.name}</h2>

          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#555]">
            <span><i className="fas fa-user-pen mr-1" />{comic.author}</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-amber-400"><i className="fas fa-star mr-1" />{comic.rating}</span>
            <span className="h-3 w-px bg-white/10" />
            <span><i className="fas fa-eye mr-1" />{formatNumber(comic.views)}</span>
            <span className="h-3 w-px bg-white/10" />
            <span><i className="fas fa-book mr-1" />{comic.chapters.length} chương</span>
          </div>

          <p className="mb-4 max-w-[520px] text-sm leading-relaxed text-white/50 line-clamp-2">{comic.desc}</p>

          <div className="mb-4 flex gap-1.5">
            {featured.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 bg-[#e94560]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`} />
            ))}
          </div>

          <button onClick={() => selectComic(comic.id)}
            className="rounded-lg bg-[#e94560] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d63852] hover:shadow-[0_4px_16px_rgba(233,69,96,0.3)]">
            <i className="fas fa-eye mr-1.5" /> Xem chi tiết
          </button>
        </div>

        <div className="relative shrink-0">
          <img src={comic.image} alt={comic.name}
            className="w-[180px] rounded-xl object-cover shadow-lg max-md:w-[140px]"
            style={{ aspectRatio: "3/4" }} />
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white/70 backdrop-blur-sm">
            <span><i className="fas fa-heart text-[#e94560]" /> {formatNumber(comic.followers)}</span>
            <span>{timeAgo(comic.lastChapterDate)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
