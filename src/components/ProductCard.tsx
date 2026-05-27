import type { Comic } from "../types";
import { timeAgo, formatNumber } from "../types";
import { useComicStore } from "../store/comicStore";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";

interface Props {
  comic: Comic;
}

export function ProductCard({ comic }: Props) {
  const openModal = useComicStore((s) => s.openModal);
  const deleteComic = useComicStore((s) => s.deleteComic);
  const selectComic = useComicStore((s) => s.selectComic);
  const addToCart = useCartStore((s) => s.addToCart);
  const currentUser = useUserStore((s) => s.currentUser);
  const toggleFollow = useUserStore((s) => s.toggleFollow);
  const isFollowing = useUserStore((s) => s.isFollowing(comic.id));

  const lastChapter = comic.chapters[comic.chapters.length - 1];
  const chapterCount = comic.chapters.length;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[.06] bg-white/[.03] transition duration-350 hover:-translate-y-1.5 hover:border-[#e94560]/20 hover:shadow-[0_12px_40px_rgba(233,69,96,.15)]">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={comic.image}
          alt={comic.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://picsum.photos/seed/fallback${comic.id}/400/580`;
          }}
          className="size-full cursor-pointer object-cover transition duration-500 group-hover:scale-106"
          onClick={() => selectComic(comic.id)}
        />
        {comic.isHot && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-gradient-to-r from-orange-500 to-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            Hot
          </span>
        )}
        {!comic.isHot && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
            {comic.status === "completed" ? "Full" : "Đang ra"}
          </span>
        )}
        {currentUser && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleFollow(comic.id); }}
            className={`absolute right-2.5 top-2.5 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full text-sm backdrop-blur-sm transition hover:scale-110 ${
              isFollowing ? "bg-[#e94560] text-white" : "bg-black/50 text-white/80 hover:bg-[#e94560]/80 hover:text-white"
            }`}
            title={isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
          >
            <i className={`fas ${isFollowing ? "fa-bookmark" : "fa-bookmark-o"}`} />
          </button>
        )}
        <button
          onClick={() => selectComic(comic.id)}
          className="absolute bottom-2.5 right-2.5 flex size-[38px] translate-y-2 cursor-pointer items-center justify-center rounded-full bg-[#e94560]/90 text-base text-white opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 hover:!scale-110 hover:bg-[#e94560] max-sm:translate-y-0 max-sm:opacity-100 max-sm:size-8 max-sm:text-sm"
        >
          <i className="fas fa-eye" />
        </button>
      </div>

      <div className="p-3.5">
        <h3
          className="truncate text-sm font-semibold hover:text-[#e94560] cursor-pointer transition-colors"
          onClick={() => selectComic(comic.id)}
        >
          {comic.name}
        </h3>
        <p className="mb-1 text-xs text-[#888]">
          <i className="fas fa-user-pen mr-1" />
          {comic.author}
        </p>
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-[#666]">
          <span><i className="fas fa-book mr-1" />{chapterCount} chương</span>
          <span><i className="fas fa-eye mr-1" />{formatNumber(comic.views)}</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-lg font-bold text-[#e94560]">
            {comic.price.toLocaleString()} <span className="text-[10px] font-normal text-[#888]">VNĐ</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-amber-400">
            <i className="fas fa-star text-[10px]" />{comic.rating}
          </span>
        </div>
        {lastChapter && (
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <a className="truncate text-[#a78bfa] hover:text-purple-400 transition-colors max-w-[60%]">
              Chap {lastChapter.number}
            </a>
            <span className="text-[#666] shrink-0">{timeAgo(comic.lastChapterDate)}</span>
          </div>
        )}
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); addToCart({ id: comic.id, name: comic.name, price: comic.price, image: comic.image }); }}
            className="flex-1 cursor-pointer rounded-lg bg-[#e94560]/15 px-2 py-1.5 text-[11px] font-semibold text-[#e94560] transition hover:bg-[#e94560]/25"
          >
            <i className="fas fa-cart-plus mr-1" /> Giỏ
          </button>
          <button
            onClick={() => openModal(comic.id)}
            className="flex-1 cursor-pointer rounded-lg bg-purple-500/15 px-2 py-1.5 text-[11px] font-semibold text-[#a78bfa] transition hover:bg-purple-500/25"
          >
            <i className="fas fa-edit mr-1" /> Sửa
          </button>
          <button
            onClick={() => { if (confirm("Xóa?")) deleteComic(comic.id); }}
            className="flex-1 cursor-pointer rounded-lg bg-red-500/15 px-2 py-1.5 text-[11px] font-semibold text-red-400 transition hover:bg-red-500/25"
          >
            <i className="fas fa-trash mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
