export function CommunityBanner() {
  return (
    <div className="mx-auto mt-4 max-w-[1280px] px-6 max-md:px-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#181825] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#e94560]/10 text-[#e94560]">
            <i className="fas fa-users text-sm" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e94560]">Cộng Đồng</span>
            <p className="text-xs text-white/50">Tham gia cập nhật và ủng hộ ComicHub!</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: "fab fa-facebook", label: "Facebook", color: "text-[#1877f2] hover:bg-[#1877f2]/15" },
            { icon: "fab fa-discord", label: "Discord", color: "text-[#5865f2] hover:bg-[#5865f2]/15" },
            { icon: "fab fa-telegram", label: "Telegram", color: "text-[#0088cc] hover:bg-[#0088cc]/15" },
          ].map((s) => (
            <a key={s.label} href="#"
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:border-transparent ${s.color}`}>
              <i className={s.icon} /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
