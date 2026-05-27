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
    <div className="min-h-screen bg-[#0f0f1a]">
      <Header onCartToggle={() => setCartOpen((v) => !v)} onAuthOpen={() => setAuthOpen(true)} />
      <Hero />
      <QuickNav />
      <CommunityBanner />
      <GenreBar />
      <ProductList />
      <footer className="border-t border-white/[0.06] bg-[#181825] px-6 py-6 max-md:px-4">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
          <span className="text-base font-bold">
            <i className="fas fa-book-open mr-1.5 text-[#e94560]" />
            ComicHub
          </span>
          <p className="text-xs text-[#555]">&copy; 2026 ComicHub. Kho truyện tranh số 1 Việt Nam.</p>
        </div>
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
