import React, { useState, useRef, useEffect } from 'react';
import { Language, GalleryItem, Garment } from '../types';
import { I18N, GALLERY_ITEMS } from '../constants';

interface GalleryProps {
  lang: Language;
  onTryOn: (garment: Garment) => void;
}

const Gallery: React.FC<GalleryProps> = ({ lang, onTryOn }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Selection State
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  // Refs for auto-focus
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const openItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setActiveImage(item.image);
    setActiveSize(null);
    setActiveColor(null);
  };

  const closeItem = () => {
    setSelectedItem(null);
    setActiveImage(null);
    setActiveSize(null);
    setActiveColor(null);
  };

  const handleVirtualTryOnClick = () => {
    if (!selectedItem) return;

    if (!activeSize || !activeColor) {
      alert('Please select a size and color first');
      return;
    }

    // Convert GalleryItem to Garment for Studio
    // Extract original ID by removing 'prod-gallery-' prefix
    const originalId = selectedItem.id.replace('prod-gallery-', '');

    const garment: Garment = {
      id: originalId,
      name: selectedItem.title.split(' - ')[0], // Get original name
      category: selectedItem.category,
      region: selectedItem.partnerName,
      image: activeImage || selectedItem.image,
      price: selectedItem.price,
      description: selectedItem.description,
      material: 'Traditional',
      selectedSize: activeSize,
      selectedColor: activeColor
    };

    onTryOn(garment);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in relative">
      <div className="text-center mb-8 md:mb-12 mt-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          {I18N.gallery[lang]}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          An exclusive collection from our artisan partners. Each piece tells a story of authenticity and history.
        </p>
      </div>

      {/* Grid: 2 columns on mobile, 3 on tablet/desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
            onClick={() => openItem(item)}
          >

            {/* Image Container */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Category Tag */}
              <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-sm text-gray-800 pointer-events-none">
                {item.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <img src={item.partnerLogo} alt={item.partnerName} className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-200" />
                <span className="text-[10px] md:text-xs font-medium text-gray-500 truncate">{item.partnerName}</span>
              </div>

              <h3 className="font-serif text-sm md:text-lg text-gray-900 leading-tight mb-2 line-clamp-2 min-h-[2.5em] md:min-h-0">{item.title}</h3>

              <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-center pt-2 md:pt-3 border-t border-gray-50 gap-1 md:gap-0">
                <span className="text-xs md:text-sm font-bold text-brand-700">{item.price}</span>
                <div className="flex items-center text-[10px] md:text-xs text-brand-600 font-medium">
                  <i className="fa-regular fa-heart mr-1"></i> {item.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal - Reduced Size */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-20">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-lg transition-opacity duration-300" onClick={closeItem}></div>

          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative bg-slate-950/95 text-slate-50 rounded-[2.5rem] border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.95)] w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-fade-in max-h-[90vh] overflow-y-auto outline-none"
          >
            {/* Close Button */}
            <button
              onClick={closeItem}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-slate-900/80 hover:bg-slate-800 rounded-full flex items-center justify-center transition-all shadow-lg shadow-black/40 border border-white/10"
            >
              <i className="fa-solid fa-xmark text-slate-100"></i>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.9)] bg-slate-900 border border-white/10 relative group/img">
                <img
                  src={activeImage || selectedItem.image}
                  alt={selectedItem.title}
                  className="h-full w-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
                />
                <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 border border-white/10">
                  DZTRYFITTING
                </div>
              </div>
            </div>

            {/* Right: Selection Area */}
            <div className="w-full md:w-1/2 p-8 md:p-8 flex flex-col justify-center bg-slate-950">
              <div className="absolute top-4 mb-9/5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                  <img src={selectedItem.partnerLogo} alt={selectedItem.partnerName} className="w-4 h-4 rounded-full border border-white/10 shadow-sm" />
                  <span className="text-0.5xl font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                    {selectedItem.partnerName}
                  </span>
                </div>
                <h2 className="text-0.25xl font-semibold text-slate-50 leading-tight mb-1">
                  {selectedItem.title}
                </h2>
                <div className="text-0.25xl text-emerald-400 font-bold mb-1">{selectedItem.price}</div>
                <div className="absolute top-20 right-30  prose prose-sm text-slate-400 mb-1 leading-relaxed font-light">

                </div>
              </div>

              {/* Sizes */}
              <div className="mb-30">
                <h4 className=" text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em] mb-4">
                  Select Size
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedItem.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`w-14 h-14 border rounded-2xl flex items-center justify-center text-sm font-semibold transition-all
                            ${activeSize === size
                          ? 'border-emerald-400/80 bg-emerald-500/15 text-emerald-200 shadow-[0_0_30px_rgba(34,197,94,0.45)] scale-105'
                          : 'border-slate-600/60 text-slate-300 bg-slate-900/80 hover:border-emerald-400/60 hover:text-emerald-100 hover:bg-slate-900'}
                        `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-9">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em] mb-4">
                  Available Colors
                </h4>
                <div className="flex flex-wrap gap-4">
                  {selectedItem.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`w-11 h-11 rounded-2xl border shadow-sm transition-all relative
                            ${activeColor === color
                          ? 'border-white ring-4 ring-emerald-500/40 scale-110 shadow-[0_0_25px_rgba(34,197,94,0.55)]'
                          : 'border-slate-800 hover:scale-110 hover:border-slate-300'}
                         `}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {activeColor === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Action */}
              <div className="mt-2">
                <button
                  onClick={handleVirtualTryOnClick}
                  className="w-full bg-emerald-500 text-slate-950 py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-[0_18px_50px_rgba(16,185,129,0.65)] hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Start Virtual Try-On</span>
                </button>
                <p className="mt-3 text-[10px] text-slate-500 text-center">
                  <i className="fa-solid fa-shield-halved mr-1"></i> Secure data processing & 24h photo deletion
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;