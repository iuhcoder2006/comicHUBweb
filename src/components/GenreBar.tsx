import { useComicStore } from "../store/comicStore";
import { GENRE_LABELS, type Genre } from "../types";

const ALL_GENRES: { value: Genre | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  ...(Object.entries(GENRE_LABELS) as [Genre, string][]).map(([value, label]) => ({ value, label })),
];

export function GenreBar() {
  const currentGenre = useComicStore((s) => s.currentGenre);
  const setGenre = useComicStore((s) => s.setGenre);

  return (
    <div className="mx-auto mt-4 flex max-w-[1280px] flex-wrap items-center gap-2 px-10 max-md:px-5">
      {ALL_GENRES.map((g) => (
        <button
          key={g.value}
          onClick={() => setGenre(g.value)}
          className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition ${
            currentGenre === g.value
              ? "border-[#e94560] bg-[#e94560]/15 text-[#e94560]"
              : "border-white/[.06] bg-transparent text-[#888] hover:border-[#e94560] hover:bg-[#e94560]/15 hover:text-[#e94560]"
          }`}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
