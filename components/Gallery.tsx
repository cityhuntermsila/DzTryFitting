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
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeItem}></div>

          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row outline-none"
          >

            {/* Close Button */}
            <button
              onClick={closeItem}
              className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-sm active:scale-95"
            >
              <i className="fa-solid fa-xmark text-xl text-gray-800"></i>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-gray-50 flex items-center justify-center relative overflow-hidden group/modal-img">
              <img
                src={activeImage || selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover md:object-contain bg-white"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/modal-img:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            {/* Right: Selection Area - Scrolled if needed */}
            <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
              <div className="w-full flex flex-col h-full">
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={selectedItem.partnerLogo} alt={selectedItem.partnerName} className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" />
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedItem.partnerName}</span>
                  </div>
                  <h2 className="text-1xl md:text-1xl font-serif font-bold text-gray-900 leading-tight mb-3">{selectedItem.title}</h2>
                  <div className="text-1xl text-brand-700 font-bold mb-3">{selectedItem.price}</div>
                  <div className="h-1 w-20 bg-brand-600 rounded-3/4"></div>
                </div>

                <div className="prose prose-lg text-gray-600 mb-4 leading-relaxed">
                  <p>{selectedItem.description}</p>
                </div>

                {/* Sizes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                      Select Size
                    </h4>
                    <button className="text-xs text-brand-600 font-bold hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedItem.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setActiveSize(size)}
                        className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center text-base font-bold transition-all
                              ${activeSize === size
                            ? 'border-brand-600 bg-brand-600 text-white shadow-lg scale-105'
                            : 'border-gray-100 text-gray-400 hover:border-brand-200 hover:text-brand-600 bg-white'}
                          `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-12">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">
                    Available Colors
                  </h4>
                  <div className="flex gap-4">
                    {selectedItem.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`w-12 h-12 rounded-2xl border-2 shadow-sm transition-all relative
                              ${activeColor === color
                            ? 'border-brand-600 ring-4 ring-brand-50 scale-110 shadow-lg'
                            : 'border-white hover:scale-110'}
                           `}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {activeColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fa-solid fa-check text-white text-xs drop-shadow-md"></i>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final Action */}
                <div className="mt-auto pt-8">
                  <button
                    onClick={handleVirtualTryOnClick}
                    className="w-full bg-brand-600 text-white py-6 rounded-2xl text-xl font-bold shadow-2xl hover:bg-brand-700 transition-all flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-[0.98]"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    Start Virtual Try-On
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-6">
                    <i className="fa-solid fa-shield-halved mr-1"></i> Secure data processing & 24h photo deletion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;