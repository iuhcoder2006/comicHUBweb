export function CommunityBanner() {
  return (
    <div className="mx-auto mt-6 max-w-[1280px] px-10 max-md:px-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[.06] bg-gradient-to-r from-[#16163a] to-[#1a0a2e] px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#e94560]/15 text-[#e94560]">
            <i className="fas fa-users text-lg" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#e94560]">Cộng Đồng</h5>
            <p className="text-xs text-white/50">Tham gia để cập nhật và ủng hộ ComicHub!</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="#" className="flex items-center gap-2 rounded-lg bg-[#1877f2]/15 px-3 py-2 text-xs font-medium text-[#1877f2] transition hover:bg-[#1877f2]/25">
            <i className="fab fa-facebook" /> Facebook
          </a>
          <a href="#" className="flex items-center gap-2 rounded-lg bg-[#5865f2]/15 px-3 py-2 text-xs font-medium text-[#5865f2] transition hover:bg-[#5865f2]/25">
            <i className="fab fa-discord" /> Discord
          </a>
          <a href="#" className="flex items-center gap-2 rounded-lg bg-[#0088cc]/15 px-3 py-2 text-xs font-medium text-[#0088cc] transition hover:bg-[#0088cc]/25">
            <i className="fab fa-telegram" /> Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
