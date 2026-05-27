import { useState } from "react";
import { useUserStore } from "../store/userStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const login = useUserStore((s) => s.login);
  const register = useUserStore((s) => s.register);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ!");
      return;
    }
    setError("");

    if (mode === "login") {
      if (login(username.trim(), password.trim())) {
        onClose();
        setUsername("");
        setPassword("");
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } else {
      if (register(username.trim(), password.trim())) {
        onClose();
        setUsername("");
        setPassword("");
      } else {
        setError("Tên đăng nhập đã tồn tại!");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-[90%] max-w-[400px] rounded-2xl border border-white/[.08] bg-[#16163a] p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <i className={`fas ${mode === "login" ? "fa-sign-in-alt" : "fa-user-plus"} mr-2 text-[#e94560]`} />
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </h2>
          <button onClick={onClose} className="cursor-pointer text-2xl text-[#888] transition hover:text-white">
            <i className="fas fa-times" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400">
            <i className="fas fa-exclamation-circle mr-1" />{error}
          </div>
        )}

        <label className="mb-1 block text-xs font-semibold text-[#aaa]">Tên đăng nhập</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Nhập tên đăng nhập..."
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]"
        />

        <label className="mb-1 block text-xs font-semibold text-[#aaa]">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Nhập mật khẩu..."
          className="mb-6 w-full rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#e94560]"
        />

        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#e94560] to-[#d63852] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-[0_4px_20px_rgba(233,69,96,.3)]"
        >
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>

        <p className="mt-4 text-center text-xs text-[#888]">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="cursor-pointer text-[#e94560] hover:underline"
          >
            {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </p>
      </div>
    </div>
  );
}
