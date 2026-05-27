import { useComicStore } from "../store/comicStore";

export function QuickNav() {
  const setGenre = useComicStore((s) => s.setGenre);
  const setSort = useComicStore((s) => s.setSort);
  const setFilter = useComicStore((s) => s.setFilter);

  return (
    <div className="mx-auto mt-6 flex max-w-[1280px] flex-wrap gap-2 px-6 max-md:px-4">
      {[
        { icon: "fa-trophy", label: "Top Tháng", color: "from-amber-600 to-orange-600", onClick: () => setSort("views") },
        { icon: "fa-book", label: "Manga", color: "from-blue-600 to-cyan-600", onClick: () => { setGenre("manga"); setFilter("all"); } },
        { icon: "fa-heart", label: "Manhwa", color: "from-pink-600 to-rose-600", onClick: () => { setGenre("manhwa"); setFilter("all"); } },
        { icon: "fa-tag", label: "Manhua", color: "from-emerald-600 to-teal-600", onClick: () => { setGenre("manhua"); setFilter("all"); } },
        { icon: "fa-fire", label: "Hot", color: "from-orange-600 to-red-600", onClick: () => { setFilter("hot"); setSort("views"); } },
        { icon: "fa-check-double", label: "Full", color: "from-purple-600 to-indigo-600", onClick: () => { setFilter("completed"); setSort("latest"); } },
      ].map((item) => (
        <button key={item.label} onClick={item.onClick}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg bg-gradient-to-r ${item.color} px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5`}>
          <i className={`fas ${item.icon} text-[11px]`} />
          {item.label}
        </button>
      ))}
    </div>
  );
}
