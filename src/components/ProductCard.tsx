import type { Comic } from "../types";
import { timeAgo, formatNumber } from "../types";
import { useComicStore } from "../store/comicStore";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";

interface Props {
  comic: Comic;
}

export function ProductCard({ comic }: Props) {
  const selectComic = useComicStore((s) => s.selectComic);
  const addToCart = useCartStore((s) => s.addToCart);
  const currentUser = useUserStore((s) => s.currentUser);
  const toggleFollow = useUserStore((s) => s.toggleFollow);
  const isFollowing = currentUser?.following.includes(comic.id) ?? false;
  const lastChapter = comic.chapters[comic.chapters.length - 1];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#181825] transition hover:-translate-y-1 hover:border-[#e94560]/30 hover:shadow-[0_8px_30px_rgba(233,69,96,0.12)]">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={comic.image} alt={comic.name} loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/comic${comic.id}/300/400`; }}
          className="size-full object-cover transition duration-500 group-hover:scale-105" />

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {comic.isHot && (
            <span className="rounded bg-gradient-to-r from-orange-500 to-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">Hot</span>
          )}
          {comic.status === "completed" && (
            <span className="rounded bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">Full</span>
          )}
          <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] text-white/80 shadow backdrop-blur-sm">
            {timeAgo(comic.lastChapterDate)}
          </span>
        </div>

        {currentUser && (
          <button onClick={() => toggleFollow(comic.id)}
            className={`absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-lg shadow backdrop-blur-sm transition ${
              isFollowing ? "bg-[#e94560] text-white" : "bg-black/50 text-white/70 hover:bg-[#e94560] hover:text-white"
            }`}>
            <i className={`fas ${isFollowing ? "fa-bookmark" : "fa-bookmark"} text-xs`} />
          </button>
        )}
      </div>

      <div className="p-3">
        <h3 onClick={() => selectComic(comic.id)}
          className="cursor-pointer truncate text-sm font-semibold transition hover:text-[#e94560]">
          {comic.name}
        </h3>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#555]">
          <span>{lastChapter ? `Chương ${lastChapter.number}` : "Đang cập nhật"}</span>
          <span className="flex items-center gap-1">
            <i className="fas fa-star text-amber-400" /> {comic.rating}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <button onClick={() => addToCart({ id: comic.id, name: comic.name, price: comic.price, image: comic.image })}
            className="flex-1 cursor-pointer rounded-md bg-[#e94560] px-2 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#d63852]">
            <i className="fas fa-cart-plus mr-1" />{comic.price.toLocaleString()}đ
          </button>
          <button onClick={() => selectComic(comic.id)}
            className="cursor-pointer rounded-md border border-white/10 px-2 py-1.5 text-[11px] text-white/60 transition hover:border-[#e94560] hover:text-[#e94560]">
            <i className="fas fa-info-circle" />
          </button>
        </div>
      </div>
    </div>
  );
}
