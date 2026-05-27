import { useCartStore } from "../store/cartStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartPanel({ open, onClose }: Props) {
  const cart = useCartStore((s) => s.cart);
  const changeQty = useCartStore((s) => s.changeQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (!open) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!confirm(`Xác nhận thanh toán ${totalPrice.toLocaleString()} VNĐ?`)) return;
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1001] flex justify-end bg-black/50 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="flex w-full max-w-[420px] flex-col overflow-y-auto border-l border-white/[.06] bg-[#12122e] p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <i className="fas fa-shopping-cart mr-2 text-[#e94560]" />
            Giỏ hàng
          </h2>
          <button onClick={onClose} className="cursor-pointer text-3xl text-[#888] transition hover:text-white">
            &times;
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-15 text-center text-[#666]">
            <i className="fas fa-shopping-bag mb-3 block text-5xl" />
            <p>Giỏ hàng trống.</p>
          </div>
        ) : (
          <>
            <div className="flex-1">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center gap-3.5 border-b border-white/[.05] py-3.5">
                  <img src={c.image} alt={c.name}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/cart${c.id}/200/280`; }}
                    className="size-14 shrink-0 rounded-lg border border-white/[.06] object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm font-semibold">{c.name}</h4>
                    <p className="text-xs font-semibold text-[#e94560]">{(c.price * c.qty).toLocaleString()}đ</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => changeQty(c.id, -1)}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[.04] text-sm text-[#ccc] transition hover:border-[#e94560] hover:bg-[#e94560]/15 hover:text-[#e94560]">−</button>
                      <span className="min-w-5 text-center text-sm font-semibold">{c.qty}</span>
                      <button onClick={() => changeQty(c.id, 1)}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[.04] text-sm text-[#ccc] transition hover:border-[#e94560] hover:bg-[#e94560]/15 hover:text-[#e94560]">+</button>
                      <button onClick={() => removeItem(c.id)}
                        className="ml-auto flex size-7 cursor-pointer items-center justify-center rounded-md text-xs text-red-400 transition hover:bg-red-500/10">
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-white/[.08] pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-bold">Tổng cộng</span>
                <span className="text-lg font-bold text-[#e94560]">{totalPrice.toLocaleString()}đ</span>
              </div>
              <button onClick={handleCheckout}
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(233,69,96,.35)]">
                <i className="fas fa-credit-card mr-2" /> Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
