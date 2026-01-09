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
          <div key={item.id} className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
            
            {/* Image Container */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
               />
               {/* Overlay - Hidden on mobile, visible on hover desktop */}
               <div 
                 onClick={() => openItem(item)}
                 className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center gap-2 p-4 cursor-pointer"
               >
                 <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-gray-100">
                    {lang === 'ar' ? 'التفاصيل' : 'View Details'}
                 </button>
               </div>
               
               {/* Mobile Click Trigger (Invisible overlay) */}
               <div className="md:hidden absolute inset-0 z-10" onClick={() => openItem(item)}></div>
               
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

            {/* Left: Images */}
            <div className="w-full md:w-1/2 p-2 md:p-6 flex flex-col gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                <img src={activeImage || selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-4 overflow-x-auto p-1">
                <div 
                  onClick={() => setActiveImage(selectedItem.image)}
                  className={`w-20 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${activeImage === selectedItem.image ? 'border-brand-600' : 'border-transparent'}`}
                >
                  <img src={selectedItem.image} className="w-full h-full object-cover" />
                </div>
                <div 
                  onClick={() => setActiveImage(selectedItem.secondaryImage)}
                  className={`w-20 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${activeImage === selectedItem.secondaryImage ? 'border-brand-600' : 'border-transparent'}`}
                >
                  <img src={selectedItem.secondaryImage} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                   <img src={selectedItem.partnerLogo} className="w-6 h-6 rounded-full" />
                   <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">{selectedItem.partnerName}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
                <div className="text-2xl text-brand-600 font-bold">{selectedItem.price}</div>
              </div>

              <div className="prose prose-sm text-gray-600 mb-8">
                <p>{selectedItem.description}</p>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                    {lang === 'ar' ? 'المقاسات' : 'Available Sizes'}
                </h4>
                <div className="flex flex-wrap gap-2">
                    {selectedItem.sizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => setActiveSize(size)}
                        className={`w-10 h-10 border rounded-lg flex items-center justify-center text-sm font-medium transition-all
                            ${activeSize === size 
                                ? 'border-brand-600 bg-brand-600 text-white shadow-md' 
                                : 'border-gray-200 hover:border-brand-400 hover:text-brand-600 text-gray-700'}
                        `}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                    {lang === 'ar' ? 'الألوان' : 'Colors'} ({selectedItem.colors.length})
                </h4>
                <div className="flex gap-3">
                    {selectedItem.colors.map(color => (
                       <button 
                         key={color} 
                         onClick={() => setActiveColor(color)}
                         className={`w-8 h-8 rounded-full border shadow-sm transition-all relative
                            ${activeColor === color ? 'ring-2 ring-brand-500 ring-offset-2 scale-110' : 'border-gray-200 hover:scale-110'}
                         `}
                         style={{ backgroundColor: color }}
                         title={color}
                       >
                         {activeColor === color && <i className="fa-solid fa-check text-white text-xs drop-shadow-md"></i>}
                       </button>
                    ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-3">
                 <button 
                    onClick={handleVirtualTryOnClick}
                    className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
                 >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    {lang === 'ar' ? 'تجربة افتراضية' : 'Virtual Try-On'}
                 </button>
                 <button className="w-full border border-gray-200 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    {lang === 'ar' ? 'إضافة للسلة' : 'Add to Cart'}
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