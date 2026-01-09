import React, { useState } from 'react';
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
      alert(lang === 'ar' ? 'يرجى اختيار المقاس واللون' : 'Please select a size and color first');
      return;
    }

    // Convert GalleryItem to Garment for Studio
    const garment: Garment = {
      id: selectedItem.id,
      name: selectedItem.title,
      category: selectedItem.category,
      region: 'Algeria', // Default or extracted
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
        <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
          {I18N.gallery[lang]}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          {lang === 'ar'
            ? 'مجموعة حصرية من إبداعات شركائنا الحرفيين. كل قطعة تحكي قصة أصالة وتاريخ.'
            : 'An exclusive collection from our artisan partners. Each piece tells a story of authenticity and history.'}
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

      {/* Product Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeItem}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-fade-in flex flex-col md:flex-row">

            <button onClick={closeItem} className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full transition-colors">
              <i className="fa-solid fa-xmark text-xl text-gray-800"></i>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gray-50/50 flex items-center justify-center">
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-xl relative">
                <img src={activeImage || selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Selection Area */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight mb-2">{selectedItem.title}</h2>
                <div className="h-1 w-12 bg-brand-600 rounded-full mx-auto md:mx-0"></div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {lang === 'ar' ? 'المقاسات' : 'Choisir Taille'}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedItem.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center text-base font-bold transition-all
                            ${activeSize === size
                          ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-md scale-105'
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
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {lang === 'ar' ? 'الألوان' : 'Couleurs Disponibles'}
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
                          <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Action */}
              <div className="mt-4">
                <button
                  onClick={handleVirtualTryOnClick}
                  className="w-full bg-brand-600 text-white py-5 rounded-[1.5rem] text-lg font-bold shadow-2xl hover:bg-brand-700 transition-all flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-[0.98]"
                >
                  {lang === 'ar' ? 'تجربة افتراضية' : 'Essai Virtuel'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;