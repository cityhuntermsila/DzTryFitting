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

                  {/* Left: Product Images */}
                  <div className="w-full md:w-1/2 p-4 md:p-8 bg-gray-50/50">
                      <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 relative group">
                          <img 
                              src={detailGarment.image} 
                              alt={detailGarment.name} 
                              className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                              <span className="bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                  {detailGarment.region}
                              </span>
                          </div>
                      </div>
                  </div>

                  {/* Right: Product Info */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-8">
                          <span className="text-accent-600 text-xs font-bold uppercase tracking-widest block mb-2">{detailGarment.category}</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-4">{detailGarment.name}</h2>
                          <div className="text-2xl font-bold text-brand-700 font-sans">{detailGarment.price}</div>
                      </div>

                      <div className="prose prose-sm text-gray-600 mb-10 leading-relaxed font-light">
                          <p>{detailGarment.description}</p>
                      </div>

                      {/* Size Selector */}
                      {detailGarment.sizes && detailGarment.sizes.length > 0 && (
                          <div className="mb-8">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Select Size</h4>
                              <div className="flex flex-wrap gap-2">
                                  {detailGarment.sizes.map(size => (
                                      <button 
                                          key={size}
                                          onClick={() => setSelectedSize(size)}
                                          className={`w-12 h-12 border rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                              ${selectedSize === size 
                                                  ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm' 
                                                  : 'border-gray-200 text-gray-500 hover:border-brand-200 hover:text-brand-600'}
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
                          <div className="mb-10">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Available Colors</h4>
                              <div className="flex gap-4">
                                  {detailGarment.colors.map(color => (
                                      <button 
                                          key={color}
                                          onClick={() => setSelectedColor(color)}
                                          className={`w-10 h-10 rounded-full border shadow-inner transition-all relative
                                              ${selectedColor === color 
                                                  ? 'ring-2 ring-brand-500 ring-offset-4 scale-110 shadow-lg' 
                                                  : 'border-gray-200 hover:scale-110'}
                                          `}
                                          style={{ backgroundColor: color }}
                                      >
                                          {selectedColor === color && (
                                              <div className="absolute inset-0 flex items-center justify-center">
                                                  <i className="fa-solid fa-check text-white text-xs drop-shadow-md"></i>
                                              </div>
                                          )}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* Actions */}
                      <div className="mt-auto flex flex-col sm:flex-row gap-4">
                          <button 
                              onClick={() => handleTryOn({
                                  ...detailGarment,
                                  selectedSize: selectedSize || undefined,
                                  selectedColor: selectedColor || undefined
                              })}
                              className="flex-1 bg-brand-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                          >
                              <i className="fa-solid fa-wand-magic-sparkles"></i>
                              Virtual Try-On
                          </button>
                          <button className="flex-1 border border-gray-900 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all">
                              Shop This Look
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