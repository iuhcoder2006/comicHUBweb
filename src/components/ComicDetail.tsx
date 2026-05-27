import { useComicStore } from "../store/comicStore";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";
import { timeAgo, formatNumber, GENRE_LABELS } from "../types";

export function ComicDetail() {
  const comics = useComicStore((s) => s.comics);
  const selectedComicId = useComicStore((s) => s.selectedComicId);
  const selectComic = useComicStore((s) => s.selectComic);
  const currentUser = useUserStore((s) => s.currentUser);
  const toggleFollow = useUserStore((s) => s.toggleFollow);
  const addHistory = useUserStore((s) => s.addHistory);
  const addToCart = useCartStore((s) => s.addToCart);

  if (!selectedComicId) return null;
  const comic = comics.find((c) => c.id === selectedComicId);
  if (!comic) return null;

  const isFollowing = currentUser?.following.includes(comic.id) ?? false;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm py-10">
      <div className="relative mx-auto w-full max-w-[900px] rounded-2xl border border-white/[.08] bg-[#12122e] p-8 max-md:p-5 m-4">
        <button
          onClick={() => selectComic(null)}
          className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/5 text-lg text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <i className="fas fa-times" />
        </button>

        <div className="flex flex-wrap gap-8 max-md:gap-5">
          <div className="flex-[0_0_220px] max-md:flex-[0_0_160px] max-sm:flex-[0_0_120px]">
            <img
              src={comic.image}
              alt={comic.name}
              className="w-full rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,.5)]"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => addToCart({ id: comic.id, name: comic.name, price: comic.price, image: comic.image })}
                className="flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4 py-2.5 text-xs font-semibold text-white transition hover:shadow-[0_4px_16px_rgba(233,69,96,.3)]"
              >
                <i className="fas fa-cart-plus mr-1" /> Mua {comic.price.toLocaleString()}đ
              </button>
              {currentUser && (
                <button
                  onClick={() => toggleFollow(comic.id)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    isFollowing ? "bg-[#e94560] text-white" : "border border-white/15 text-white/70 hover:border-[#e94560] hover:text-[#e94560]"
                  }`}
                >
                  <i className={`fas ${isFollowing ? "fa-bookmark" : "fa-bookmark-o"}`} />
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold max-md:text-xl">{comic.name}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#888]">
              <span><i className="fas fa-user-pen mr-1" />{comic.author}</span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-amber-400"><i className="fas fa-star mr-1" />{comic.rating}</span>
              <span className="h-3 w-px bg-white/10" />
              <span><i className="fas fa-eye mr-1" />{formatNumber(comic.views)} lượt xem</span>
              <span className="h-3 w-px bg-white/10" />
              <span><i className="fas fa-heart mr-1 text-[#e94560]" />{formatNumber(comic.followers)} theo dõi</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-[#e94560]/15 px-3 py-1 text-[11px] font-medium text-[#e94560]">
                {GENRE_LABELS[comic.genre]}
              </span>
              <span className={`rounded-md px-3 py-1 text-[11px] font-medium ${
                comic.status === "completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
              }`}>
                {comic.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}
              </span>
              {comic.isHot && (
                <span className="rounded-md bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-[11px] font-bold text-white">
                  Hot
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/60">{comic.desc}</p>

            <div className="mt-3 flex items-center gap-4 text-xs text-[#888]">
              <span><i className="fas fa-book mr-1" />{comic.chapters.length} chương</span>
              <span><i className="fas fa-clock mr-1" />Cập nhật: {timeAgo(comic.lastChapterDate)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold flex items-center gap-2">
            <i className="fas fa-list text-[#e94560]" />
            Danh sách chương
          </h3>
          <div className="max-h-[400px] overflow-y-auto rounded-xl border border-white/[.06]">
            {[...comic.chapters].reverse().map((ch) => (
              <div
                key={ch.id}
                onClick={() => {
                  if (currentUser) addHistory(comic.id, ch.id);
                }}
                className="flex cursor-pointer items-center justify-between border-b border-white/[.03] px-4 py-3 text-sm transition hover:bg-white/[.03]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-md bg-[#e94560]/10 text-xs font-bold text-[#e94560]">
                    {ch.number}
                  </span>
                  <span className="text-white/80 hover:text-[#e94560] transition-colors">
                    {ch.title}
                  </span>
                </div>
                <span className="text-[11px] text-[#555]">{timeAgo(ch.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
