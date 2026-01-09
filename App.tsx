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
  const [lang, setLang] = useState<Language>('en');
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
    return <ApiKeySelection onSelect={() => setApiKey('demo-key')} lang={lang} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 relative overflow-hidden ${lang === 'ar' ? 'font-arabic dir-rtl' : 'font-sans dir-ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      <Sidebar
        currentView={currentView}
        setView={setView}
        lang={lang}
        setLang={setLang}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="w-full h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth bg-gray-50">

        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`
            lg:hidden fixed top-4 z-40 w-12 h-12 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-gray-800 border border-gray-100 transition-transform active:scale-95 hover:bg-white
            ${lang === 'ar' ? 'right-4' : 'left-4'}
          `}
          aria-label="Toggle Menu"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>

        {renderContent()}

        <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-400 text-xs mt-auto">
          <p>&copy; 2026 DZtryFitting. Celebrating Algerian Heritage.</p>
        </footer>
      </main>

      {/* Global Product Detail Modal */}
      {detailGarment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setDetailGarment(null)}
          ></div>

          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-fade-in max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setDetailGarment(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md"
            >
              <i className="fa-solid fa-xmark text-gray-900"></i>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gray-50/50 flex items-center justify-center">
              <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 relative group">
                <img
                  src={detailGarment.image}
                  alt={detailGarment.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Selection Area */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight mb-2">{detailGarment.name}</h2>
                <div className="h-1 w-12 bg-brand-600 rounded-full mx-auto md:mx-0"></div>
              </div>

              {/* Size Selector */}
              {detailGarment.sizes && detailGarment.sizes.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Choisir Taille</h4>
                  <div className="flex flex-wrap gap-3">
                    {detailGarment.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center text-base font-bold transition-all
                                              ${selectedSize === size
                            ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-md scale-105'
                            : 'border-gray-100 text-gray-400 hover:border-brand-200 hover:text-brand-600 bg-white'}
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
                <div className="mb-12">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Couleurs Disponibles</h4>
                  <div className="flex gap-4">
                    {detailGarment.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-2xl border-2 shadow-sm transition-all relative
                                              ${selectedColor === color
                            ? 'border-brand-600 ring-4 ring-brand-50 scale-110 shadow-lg'
                            : 'border-white hover:scale-110'}
                                          `}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Action */}
              <div className="mt-4">
                <button
                  onClick={() => handleTryOn({
                    ...detailGarment,
                    selectedSize: selectedSize || undefined,
                    selectedColor: selectedColor || undefined
                  })}
                  className="w-full bg-brand-600 text-white py-5 rounded-[1.5rem] text-lg font-bold shadow-2xl hover:bg-brand-700 transition-all flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-[0.98]"
                >
                  Essai Virtuel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;