import React, { useState } from 'react';
import { ViewState, Language, GalleryItem, Garment } from '../types';
import { PARTNERS, GALLERY_ITEMS } from '../constants';

interface Props {
  view: ViewState;
  lang: Language;
  onTryOn: (garment: Garment) => void;
}

const AboutPartners: React.FC<Props> = ({ view, lang, onTryOn }) => {
  const [selectedPartner, setSelectedPartner] = useState<typeof PARTNERS[0] | null>(null);
  const [actionType, setActionType] = useState<'booking' | 'collection' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Modal State
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

  const handleBook = (e: React.FormEvent) => {
      e.preventDefault();
      setShowSuccess(true);
      setTimeout(() => {
          setShowSuccess(false);
          setSelectedPartner(null);
          setActionType(null);
      }, 3000);
  };

  const handleBack = () => {
      setSelectedPartner(null);
      setActionType(null);
  };
  
  if (view === ViewState.ABOUT) {
    return (
      <div className="w-full animate-fade-in bg-white">
            {/* Hero / Intro */}
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-4 block">
                    {lang === 'ar' ? 'من نحن' : 'About Us'}
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                    The Soul of <br/>
                    <span className="italic text-accent-500">Algerian Heritage</span>
                </h1>
                <h2 className="text-xl text-gray-500 font-light mb-8 italic max-w-2xl mx-auto">
                    "Bridging ancestral craftsmanship with the digital future."
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto font-light">
                    DZtryFitting was born from a deep love for Algeria's cultural tapestry. We are a platform dedicated to the promotion and preservation of Algerian traditional dress, serving as a digital bridge between master artisans and the modern generation.
                </p>
            </div>

            {/* 4 Key Points Grid */}
            <div className="bg-[#fcfbf9] py-24 border-t border-gray-100 border-b">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Point 1: Marketplace */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                        <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 text-brand-600 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-store"></i>
                        </div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Marketplace</h4>
                        <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Digital Atelier</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            DZtryFitting revolutionizes the way we perceive and acquire traditional Algerian creations. Explore and virtually try on masterpieces from your favorite craftsmen through our digital galleries!
                        </p>
                    </div>

                    {/* Point 2: Authenticity */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                        <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mb-6 text-accent-600 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-fingerprint"></i>
                        </div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Authenticity</h4>
                        <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Heritage Verified</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Every garment rendered is authentically Algerian. Support Algeria's cultural richness by choosing unique and exclusive virtual experiences that respect the work of our creators.
                        </p>
                    </div>

                    {/* Point 3: Trust */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-hand-holding-heart"></i>
                        </div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Trust</h4>
                        <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Confidence</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Interact with our heritage curators and experts to learn the history behind every thread. We carefully select our partners to guarantee high-fidelity renders.
                        </p>
                    </div>

                    {/* Point 4: Impact */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                         <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-leaf"></i>
                        </div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Impact</h4>
                        <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Growth</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Your engagement actively supports Algerian artists and artisans. Be the driver of this growing artistic energy and help preserve our identity for generations to come!
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Stats */}
            <div className="py-24 relative overflow-hidden bg-[#111] text-white text-center">
                 <div className="absolute top-0 left-0 w-96 h-96 bg-brand-900/20 rounded-full filter blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/10 rounded-full filter blur-[100px] translate-x-1/3 translate-y-1/3"></div>

                 <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h3 className="font-serif text-3xl md:text-5xl mb-8">Our Mission</h3>
                    <p className="text-gray-300 text-lg md:text-xl mb-16 leading-relaxed font-light">
                        Our mission is to democratize access to high-end traditional attire. By using AI to visualize the 'Karakou', 'Caftan', and 'Chedda', we allow every Algerian to reconnect with their roots through a personalized, high-tech experience.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-3 group-hover:text-accent-500 transition-colors">69</div>
                            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Wilayas Covered</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-3 group-hover:text-brand-500 transition-colors">100%</div>
                            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Algerian Soul</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-3 group-hover:text-accent-500 transition-colors">∞</div>
                            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Legacy Preserved</div>
                        </div>
                    </div>
                 </div>
            </div>

            {/* CTA */}
            <div className="py-24 text-center px-6 bg-white">
                <h2 className="font-serif text-3xl md:text-5xl mb-6 text-gray-900">Join the Renaissance</h2>
                <p className="text-gray-500 mb-10 text-lg">Experience our heritage in a new light.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-brand-600 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Enter the Virtual Atelier
                    </button>
                    <button className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                        Contact Our Curators
                    </button>
                </div>
            </div>
      </div>
    );
  }

  if (view === ViewState.PARTNERS) {
      if (selectedPartner) {
          if (actionType === 'collection') {
             // Collection View
             const partnerItems = GALLERY_ITEMS.filter(item => item.partnerName === selectedPartner.name);

             return (
                 <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                      <button 
                          onClick={handleBack}
                          className="mb-8 text-gray-500 hover:text-brand-600 flex items-center gap-2 transition-colors mx-auto md:mx-0"
                      >
                          <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
                          {lang === 'ar' ? 'عودة للقائمة' : 'Back to Partners'}
                      </button>
                      
                      {/* Header */}
                      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                           <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-brand-50 shadow-lg shrink-0">
                                <img src={selectedPartner.logo} alt={selectedPartner.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{selectedPartner.name}</h2>
                                <p className="text-gray-500 mb-4 max-w-xl">
                                    {lang === 'ar' 
                                        ? 'استكشف أحدث الإبداعات من ورشتنا. كل قطعة هي مزيج من التراث والابتكار.' 
                                        : 'Explore the latest creations from our atelier. Each piece is a blend of heritage and innovation.'}
                                </p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <div className="bg-brand-50 text-brand-700 px-4 py-1 rounded-full text-sm font-bold">
                                        {partnerItems.length} {lang === 'ar' ? 'تصاميم' : 'Designs'}
                                    </div>
                                    <div className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-bold">
                                        Verified Artisan <i className="fa-solid fa-certificate text-blue-500 ml-1"></i>
                                    </div>
                                </div>
                           </div>
                           <div className="shrink-0">
                                <button 
                                    onClick={() => setActionType('booking')}
                                    className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold shadow-lg hover:bg-brand-700 transition-all hover:-translate-y-1"
                                >
                                    {lang === 'ar' ? 'حجز موعد' : 'Book Appointment'}
                                </button>
                           </div>
                      </div>

                      {/* Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
                      <h3 className="font-serif text-2xl mb-6">{lang === 'ar' ? 'المعرض' : 'Gallery'}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                          {partnerItems.map((item) => (
                              <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
                                  <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
                                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                      {/* Detail Trigger - Hidden on mobile, Flex on MD+ */}
                                      <div 
                                        onClick={() => openItem(item)}
                                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center gap-2 p-4 cursor-pointer"
                                      >
                                          <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-gray-100">
                                              {lang === 'ar' ? 'التفاصيل' : 'View Details'}
                                          </button>
                                      </div>
                                      {/* Mobile Trigger Overlay */}
                                      <div className="md:hidden absolute inset-0 z-10" onClick={() => openItem(item)}></div>

                                      <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-800 shadow-sm pointer-events-none">
                                         {item.category}
                                      </div>
                                  </div>
                                  <div className="p-3 md:p-4 flex flex-col flex-1">
                                      <h4 className="font-serif font-bold text-gray-900 mb-1 truncate text-sm md:text-base">{item.title}</h4>
                                      <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2">
                                          <span className="text-xs md:text-sm font-bold text-brand-700">{item.price}</span>
                                          <span className="flex items-center text-brand-600 text-[10px] md:text-xs"><i className="fa-solid fa-heart mr-1"></i> {item.likes}</span>
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
          } else if (actionType === 'booking') {
              // Booking Form View
              return (
                  <div className="max-w-4xl mx-auto p-8 animate-fade-in text-center">
                      <button 
                          onClick={handleBack}
                          className="mb-8 text-gray-500 hover:text-brand-600 flex items-center gap-2 transition-colors mx-auto md:mx-0"
                      >
                          <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
                          {lang === 'ar' ? 'عودة للقائمة' : 'Back to Partners'}
                      </button>

                      {showSuccess ? (
                          <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-12 animate-fade-in">
                              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                  <i className="fa-solid fa-check text-3xl text-green-600"></i>
                              </div>
                              <h3 className="text-2xl font-serif font-bold mb-2">Request Sent!</h3>
                              <p>Your appointment request with {selectedPartner.name} has been received. We will contact you shortly.</p>
                          </div>
                      ) : (
                        <>
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-2 border-brand-200 shadow-md">
                                    <img src={selectedPartner.logo} alt={selectedPartner.name} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Book with {selectedPartner.name}</h2>
                                <p className="text-gray-500 max-w-lg mx-auto">
                                    Schedule a private styling consultation or fitting session with the artisans at {selectedPartner.name}.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-lg mx-auto text-left">
                                <form onSubmit={handleBook} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                        <input required type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                                        <input required type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="email@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                                        <input required type="tel" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="+213 ..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preferred Date</label>
                                        <input type="date" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message (Optional)</label>
                                        <textarea className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all h-24" placeholder="Specific garment or request..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold hover:bg-brand-700 transition-colors mt-4 shadow-lg">
                                        Confirm Request
                                    </button>
                                </form>
                            </div>
                        </>
                      )}
                  </div>
              );
          }
      }

      // List View
      return (
          <div className="max-w-6xl mx-auto p-8 animate-fade-in">
              <h2 className="text-4xl font-serif text-center mb-4">{lang === 'ar' ? 'شركاؤنا' : 'Our Artisans'}</h2>
              <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
                  {lang === 'ar' 
                    ? 'تعاون مع سادة الخيط والإبرة لتصميم زي أحلامك.'
                    : 'Collaborating with the masters of thread and needle. Select a partner to book a styling consultation.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PARTNERS.map((p, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-shadow group">
                          <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{p.name}</h3>
                          <p className="text-sm text-center text-gray-500 mb-6">Specialists in traditional embroidery and luxury velvets.</p>
                          
                          <div className="flex gap-2 w-full mt-auto">
                            <button 
                                onClick={() => { setSelectedPartner(p); setActionType('collection'); }}
                                className="flex-1 py-2 px-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                            >
                                {lang === 'ar' ? 'المجموعة' : 'Collection'}
                            </button>
                            <button 
                                onClick={() => { setSelectedPartner(p); setActionType('booking'); }}
                                className="flex-1 py-2 px-4 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
                            >
                                {lang === 'ar' ? 'حجز موعد' : 'Book Appointment'}
                            </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )
  }

  return null;
};

export default AboutPartners;