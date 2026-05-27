import { useComicStore } from "../store/comicStore";
import { useCartStore } from "../store/cartStore";

export function AdminBar() {
  const openModal = useComicStore((s) => s.openModal);
  const resetData = useComicStore((s) => s.resetData);

  const handleReset = () => {
    if (!confirm("Xóa toàn bộ dữ liệu và khôi phục mẫu ban đầu?")) return;
    resetData();
    useCartStore.getState().clearCart();
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[.06] bg-white/[.02] px-5 py-4">
      <span className="mr-2 text-xs font-semibold text-[#888]">
        <i className="fas fa-toolbox mr-1" /> Quản lý:
      </span>
      <button
        onClick={() => openModal()}
        className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4.5 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(233,69,96,.3)]"
      >
        <i className="fas fa-plus" /> Thêm truyện
      </button>
      <button
        onClick={handleReset}
        className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-red-500/10 px-4.5 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
      >
        <i className="fas fa-undo" /> Reset dữ liệu
      </button>
    </div>
  );
}
