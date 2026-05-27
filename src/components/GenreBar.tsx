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
    <div className="mx-auto mt-4 flex max-w-[1280px] flex-wrap items-center gap-1.5 px-6 max-md:px-4">
      {ALL_GENRES.map((g) => (
        <button key={g.value} onClick={() => setGenre(g.value)}
          className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition ${
            currentGenre === g.value
              ? "border-[#e94560] bg-[#e94560]/10 text-[#e94560]"
              : "border-white/[0.06] bg-transparent text-[#555] hover:border-[#e94560] hover:text-[#e94560]"
          }`}>
          {g.label}
        </button>
      ))}
    </div>
  );
}
