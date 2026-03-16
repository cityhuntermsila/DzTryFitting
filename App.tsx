import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Studio from './components/Studio';
import Gallery from './components/Gallery';
import AboutPartners from './components/AboutPartners';
import Subscription from './components/Subscription';
import Security from './components/Security';
import ApiKeySelection from './components/ApiKeySelection';
import { ViewState, Language, Garment } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [lang] = useState<Language>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(process.env.API_KEY || null);

  // State for Virtual Try-On flow
  const [preselectedGarment, setPreselectedGarment] = useState<Garment | null>(null);

  // State for Detail Modal
  const [detailGarment, setDetailGarment] = useState<Garment | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleTryOn = (garment: Garment) => {
    setPreselectedGarment(garment);
    setDetailGarment(null); // Close modal if open
    setView(ViewState.STUDIO);
  };

  const openDetail = (garment: Garment) => {
    setDetailGarment(garment);
    setSelectedSize(garment.sizes?.[0] || null);
    setSelectedColor(garment.selectedColor || garment.colors?.[0] || null);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard setView={setView} lang={lang} onSelectGarment={openDetail} />;
      case ViewState.STUDIO:
        return <Studio lang={lang} initialGarment={preselectedGarment} />;
      case ViewState.GALLERY:
        return <Gallery lang={lang} onTryOn={handleTryOn} />;
      case ViewState.SUBSCRIPTION:
        return <Subscription lang={lang} />;
      case ViewState.SECURITY:
        return <Security lang={lang} />;
      case ViewState.ABOUT:
      case ViewState.PARTNERS:
        return <AboutPartners view={currentView} lang={lang} onTryOn={handleTryOn} />;
      default:
        return <Dashboard setView={setView} lang={lang} onSelectGarment={openDetail} />;
    }
  };

  const needsKey = !apiKey && !process.env.API_KEY;

  if (needsKey) {
    return (
      <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-slate-50 flex items-center justify-center px-4 font-sans dir-ltr" dir="ltr">
        <div className="relative w-full max-w-xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                DZtryFitting Studio
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Renseigne ta clé d&apos;API pour continuer
              </h1>
              <p className="text-xs sm:text-sm text-slate-300/80 max-w-md mx-auto">
                Active l&apos;expérience d&apos;essayage virtuel en quelques secondes. Tes données restent toujours sécurisées.
              </p>
            </div>
            <ApiKeySelection onSelect={() => setApiKey('demo-key')} lang={lang} />
            <p className="text-[10px] text-slate-400/80 text-center">
              Besoin d&apos;aide ? Contacte notre équipe pour connecter DZtryFitting à ta boutique en ligne.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#020617,_#020617_40%,_#0f172a_80%)] relative overflow-hidden font-sans dir-ltr"
      dir="ltr"
    >
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute -top-40 -right-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-10 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />

      <Sidebar
        currentView={currentView}
        setView={setView}
        lang={lang}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`
            lg:hidden fixed top-5 z-40 w-12 h-12 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/40 rounded-full flex items-center justify-center text-slate-100 border border-white/10 transition-all duration-200 active:scale-95 hover:bg-slate-800/90 hover:-translate-y-0.5 left-5
          `}
          aria-label="Toggle Menu"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-4 pt-4 lg:pt-6">
          <div className="relative rounded-3xl border border-white/5 bg-slate-900/70 shadow-[0_18px_60px_rgba(15,23,42,0.85)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="pointer-events-none absolute -inset-x-6 top-10 h-24 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

            <div className="relative">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Global Product Detail Modal */}
      {detailGarment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-lg transition-opacity duration-300"
            onClick={() => setDetailGarment(null)}
          ></div>

          <div className="relative bg-slate-950/95 text-slate-50 rounded-[2.5rem] border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.95)] w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setDetailGarment(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-slate-900/80 hover:bg-slate-800 rounded-full flex items-center justify-center transition-all shadow-lg shadow-black/40 border border-white/10"
            >
              <i className="fa-solid fa-xmark text-slate-100"></i>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.9)] bg-slate-900 border border-white/10 relative group">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/40 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <img
                  src={detailGarment.image}
                  alt={detailGarment.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 border border-white/10">
                  DZTRYFITTING
                </div>
              </div>
            </div>

            {/* Right: Selection Area */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-950">
              <div className="mb-8 text-center md:text-left">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                  Détails du modèle
                </p>
                <h2 className="text-3xl font-semibold text-slate-50 leading-tight mb-3">
                  {detailGarment.name}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-3 text-[11px] text-slate-400">
                  <span className="inline-flex h-1 w-8 rounded-full bg-emerald-400" />
                  <span>Choisis ta taille et ta couleur avant l&apos;essai virtuel.</span>
                </div>
              </div>

              {/* Size Selector */}
              {detailGarment.sizes && detailGarment.sizes.length > 0 && (
                <div className="mb-7">
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em] mb-4">
                    Taille
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {detailGarment.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 border rounded-2xl flex items-center justify-center text-sm font-semibold transition-all
                          ${
                            selectedSize === size
                              ? 'border-emerald-400/80 bg-emerald-500/15 text-emerald-200 shadow-[0_0_30px_rgba(34,197,94,0.45)] scale-105'
                              : 'border-slate-600/60 text-slate-300 bg-slate-900/80 hover:border-emerald-400/60 hover:text-emerald-100 hover:bg-slate-900'
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {detailGarment.colors && detailGarment.colors.length > 0 && (
                <div className="mb-9">
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em] mb-4">
                    Couleurs
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {detailGarment.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-11 h-11 rounded-2xl border shadow-sm transition-all relative
                          ${
                            selectedColor === color
                              ? 'border-white ring-4 ring-emerald-500/40 scale-110 shadow-[0_0_25px_rgba(34,197,94,0.55)]'
                              : 'border-slate-800 hover:scale-110 hover:border-slate-300'
                          }
                        `}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Action */}
              <div className="mt-2">
                <button
                  onClick={() =>
                    handleTryOn({
                      ...detailGarment,
                      selectedSize: selectedSize || undefined,
                      selectedColor: selectedColor || undefined,
                    })
                  }
                  className="w-full bg-emerald-500 text-slate-950 py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-[0_18px_50px_rgba(16,185,129,0.65)] hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Essai virtuel maintenant</span>
                  <i className="fa-solid fa-wand-magic-sparkles text-sm" />
                </button>
                <p className="mt-3 text-[10px] text-slate-500 text-center">
                  Aucune donnée personnelle n&apos;est stockée. L&apos;essai reste 100% confidentiel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;