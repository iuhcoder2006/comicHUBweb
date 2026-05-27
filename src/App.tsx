import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuickNav } from "./components/QuickNav";
import { GenreBar } from "./components/GenreBar";
import { CommunityBanner } from "./components/CommunityBanner";
import { ProductList } from "./components/ProductList";
import { ProductModal } from "./components/ProductModal";
import { ComicDetail } from "./components/ComicDetail";
import { CartPanel } from "./components/CartPanel";
import { AuthModal } from "./components/AuthModal";
import { ToastProvider } from "./components/Toast";

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b1a] text-[#e0e0e0]">
      <Header onCartToggle={() => setCartOpen((v) => !v)} onAuthOpen={() => setAuthOpen(true)} />
      <Hero />
      <QuickNav />
      <CommunityBanner />
      <GenreBar />
      <ProductList />
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.05] px-10 py-8 max-md:px-5">
        <span className="text-lg font-bold">
          <i className="fas fa-book-open mr-2 text-[#e94560]" />
          ComicHub
        </span>
        <p className="text-xs opacity-40">&copy; 2026 ComicHub. Kho truyện tranh số 1 Việt Nam.</p>
      </footer>
      <ProductModal />
      <ComicDetail />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
