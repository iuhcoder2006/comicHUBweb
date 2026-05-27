import { useState, useEffect } from "react";
import { useComicStore } from "../store/comicStore";
import { GENRE_LABELS, type Genre } from "../types";

export function ProductModal() {
  const modalOpen = useComicStore((s) => s.modalOpen);
  const closeModal = useComicStore((s) => s.closeModal);
  const saveComic = useComicStore((s) => s.saveComic);
  const updateComic = useComicStore((s) => s.updateComic);
  const editing = useComicStore((s) => s.getEditing());

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState<Genre>("action");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setAuthor(editing.author);
      setPrice(String(editing.price));
      setImage(editing.image);
      setGenre(editing.genre);
      setDesc(editing.desc);
    } else {
      setName("");
      setAuthor("");
      setPrice("");
      setImage("https://picsum.photos/seed/");
      setGenre("action");
      setDesc("");
    }
  }, [editing, modalOpen]);

  if (!modalOpen) return null;

  const handleSave = () => {
    if (!name.trim() || !author.trim() || !price.trim()) return;
    const priceNum = parseInt(price);
    if (!priceNum) return;

    const data = { name: name.trim(), author: author.trim(), price: priceNum, image, genre, desc: desc.trim() };
    if (editing) {
      updateComic(editing.id, data);
    } else {
      saveComic(data);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="max-h-[90vh] w-[90%] max-w-[500px] overflow-y-auto rounded-2xl border border-white/[.08] bg-[#16163a] p-8">
        <h2 className="mb-5 flex items-center gap-2.5 text-xl font-bold">
          <i className="fas fa-pen-fancy text-[#e94560]" />
          {editing ? "Sửa truyện" : "Thêm truyện mới"}
        </h2>

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Tên truyện</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: One Piece"
          className="w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]" />

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Tác giả</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="VD: Oda Eiichiro"
          className="w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]" />

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Giá (VNĐ)</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="VD: 55000"
          className="w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]" />

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Link ảnh bìa</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..."
          className="w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]" />

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Thể loại</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value as Genre)}
          className="w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition focus:border-[#e94560]">
          {(Object.entries(GENRE_LABELS) as [Genre, string][]).map(([val, label]) => (
            <option key={val} value={val} className="bg-[#16163a] text-white">{label}</option>
          ))}
        </select>

        <label className="mb-1 mt-3.5 block text-xs font-semibold text-[#aaa]">Mô tả</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Nội dung chính..."
          className="min-h-[70px] w-full resize-y rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]" />

        <div className="mt-6 flex gap-3">
          <button onClick={closeModal}
            className="flex-1 cursor-pointer rounded-xl bg-white/[.08] px-4 py-3 text-sm font-semibold text-[#ccc] transition hover:bg-white/[.12]">
            Hủy
          </button>
          <button onClick={handleSave}
            className="flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-[0_4px_20px_rgba(233,69,96,.3)]">
            <i className="fas fa-check mr-1" /> Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
