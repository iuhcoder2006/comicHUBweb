import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";

interface ToastCtx {
  show: (msg: string) => void;
}

const ToastContext = createContext<ToastCtx>({ show: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((message: string) => {
    setMsg(message);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2500);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className={`fixed bottom-7.5 left-1/2 z-2000 min-w-[220px] -translate-x-1/2 rounded-xl border border-[#e94560]/20 bg-[#16163a]/95 px-6 py-3.5 text-center text-sm text-white backdrop-blur-md transition-all duration-400 ${
          visible ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}
