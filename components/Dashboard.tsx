import React from 'react';
import { ViewState, Language, Garment } from '../types';
import { I18N, GARMENTS, PARTNERS } from '../constants';

interface DashboardProps {
    setView: (view: ViewState) => void;
    lang: Language;
    onSelectGarment: (garment: Garment) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, lang, onSelectGarment }) => {
    return (
        <div className="flex flex-col w-full animate-fade-in bg-white">

            {/* Hero Section */}
            <section className="relative w-full bg-transparent text-white py-20 md:py-24 lg:py-32 px-6 flex flex-col items-center text-center overflow-hidden min-h-[80px] md:min-h-[100px] lg:min-h-[200px]">

                {/* Background Image from local directory */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img
                        src="images/backgrounds/heritage_hero.png"
                        alt="Algerian Heritage Background"
                        className="max-w-none w-auto h-full object-contain transform scale-[0.95] transition-transform duration-1000"
                    />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-brand-900/20 blur-[100px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                </div>
            </section>

            {/* Notification Bar (bottom of hero) */}
            <div className="bg-[#881337] text-white text-[10px] md:text-xs py-2.5 text-center tracking-[0.2em] font-bold uppercase z-10 relative">
                DELIVERY 69 WILAYAS • SECURE PAYMENT • AUTHENTIC QUALITY
            </div>

            {/* New Call to Action Section */}
            <div className="bg-white py-2 flex flex-col items-center justify-center gap-5 px-6 relative z-10 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl">
                    <button
                        onClick={() => setView(ViewState.STUDIO)}
                        className="bg-white text-gray-900 border border-gray-900 hover:bg-[#f97373] hover:text-white hover:border-[#f97373] px-8 py-4 w-full sm:w-auto font-serif font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-600 shadow-xl"
                    >
                        {I18N.cta_start[lang]}
                    </button>
                    <button
                        onClick={() => setView(ViewState.GALLERY)}
                        className="bg-[#111827] backdrop-blur-sm border border-gray-900 text-white hover:bg-white hover:text-[#111827] hover:border-[#111827] px-16 py-4 w-full sm:w-auto font-serif font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg text-center"
                    >
                        Explore Heritage
                    </button>
                </div>

                <div className="text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-[1.1] text-gray-900">
                        Embrace Your <span className="italic text-[#e11d48] font-serif">Roots.</span>
                    </h1>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light font-sans">
                        Experience the ultimate virtual fitting room dedicated to Algerian traditional attire. From the majestic Karakou to the elegant Blouza, visualize history on yourself.
                    </p>
                </div>
            </div>

            {/* Iconic Collections */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <span className="text-brand-600 text-xs font-bold tracking-widest uppercase block mb-2">Curated Selection</span>
                        <h3 className="text-3xl md:text-1xl font-serif text-gray-900">
                            Iconic Collections
                        </h3>
                    </div>

                    <button
                        onClick={() => setView(ViewState.GALLERY)}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-brand-600 transition-colors uppercase tracking-wider pb-1 border-b border-gray-200 hover:border-brand-600"
                    >
                        View All
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                <div className="w-full overflow-hidden">
                    <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] gap-2 px-4 w-max">
                        {[...GARMENTS, ...GARMENTS].map((garment, idx) => (
                            <div
                                key={`${garment.id}-${idx}`}
                                className="flex-none w-[168px] md:w-[204px] group cursor-pointer"
                                onClick={() => onSelectGarment(garment)}
                            >
                                <div className="aspect-[3/4] overflow-hidden relative mb-5 bg-gray-100 rounded-xl">
                                    <img
                                        src={garment.image}
                                        alt={garment.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/50 px-4 py-2 rounded-full backdrop-blur-md">View Details</span>
                                    </div>
                                </div>
                                <div className="px-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                        <h4 className="font-serif text-lg text-gray-900 truncate md:pr-2">{garment.name}</h4>
                                        <span className="text-sm font-medium text-brand-700 whitespace-nowrap">{garment.price}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{garment.region}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern Collection Section */}
            <section className="py-2 bg-gray-50/50">
                <div className="container mx-auto px-6 mb-12">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full border border-brand-100 p-1 bg-white shadow-sm overflow-hidden">
                            <img src="images/partners/modern_house.png" alt="Logo Moderne" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div>
                            <span className="text-accent-600 text-[10px] font-bold tracking-[0.2em] uppercase block">Exclusivité</span>
                            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 font-serif">
                                {I18N.modern_collection[lang]}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 italic">Par Maison L'Algérienne Moderne</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                        {GARMENTS.filter(g => g.category === 'Ensemble Moderne').map((garment) => (
                            <div
                                key={garment.id}
                                className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
                                onClick={() => onSelectGarment(garment)}
                            >
                                <div className="aspect-[3/4] overflow-hidden relative mb-5 rounded-xl">
                                    <img
                                        src={garment.image}
                                        alt={garment.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">New</div>
                                </div>
                                <h4 className="font-serif text-lg text-gray-900 mb-1">{garment.name}</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">{garment.region}</span>
                                    <span className="text-sm font-bold text-brand-700">{garment.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* PARCOURS CLIENT */}
            <section className="py-24 bg-[#fdfbf7] relative border-t border-accent-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-white rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent-50 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-accent-600 font-bold tracking-widest uppercase text-xs mb-4 block">
                            How It Works
                        </span>
                        <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 font-serif">
                            Your Journey to Elegance
                        </h3>

                        <div className="hidden md:inline-flex items-center justify-center gap-6 text-sm tracking-widest uppercase text-gray-500 font-medium bg-white/80 px-8 py-3 rounded-full shadow-sm border border-gray-100 backdrop-blur-sm">
                            <span className="text-brand-800 font-bold">1. Discover</span>
                            <div className="w-12 h-px bg-gray-200"></div>
                            <span className="text-brand-800 font-bold">2. Try On</span>
                            <div className="w-12 h-px bg-gray-200"></div>
                            <span className="text-brand-800 font-bold">3. Acquire</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            onClick={() => setView(ViewState.GALLERY)}
                            className="relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent-200 transition-all duration-300 cursor-pointer group text-center"
                        >
                            <span className="absolute top-4 right-6 text-9xl font-serif font-bold text-gray-50 group-hover:text-accent-50 transition-colors select-none">1</span>
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="fa-solid fa-magnifying-glass text-2xl"></i>
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4 font-serif">
                                    Discovery
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Explore exclusive collections from Algeria's finest artisans.
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={() => setView(ViewState.STUDIO)}
                            className="relative bg-white p-10 rounded-3xl border border-accent-100 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] hover:border-accent-400 hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer group text-center transform md:-translate-y-6 z-20"
                        >
                            <span className="absolute top-4 right-6 text-9xl font-serif font-bold text-accent-50/50 group-hover:text-accent-50 transition-colors select-none">2</span>
                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-accent-50">
                                    <i className="fa-solid fa-wand-magic-sparkles text-3xl"></i>
                                </div>
                                <h4 className="text-3xl font-serif font-bold text-accent-600 mb-4 font-serif">
                                    Virtual Try-On
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    See exactly how the garment looks on you using our AI technology.
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={() => setView(ViewState.PARTNERS)}
                            className="relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent-200 transition-all duration-300 cursor-pointer group text-center"
                        >
                            <span className="absolute top-4 right-6 text-9xl font-serif font-bold text-gray-50 group-hover:text-accent-50 transition-colors select-none">3</span>
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="fa-solid fa-bag-shopping text-2xl"></i>
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4 font-serif">
                                    Acquire
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Order the piece custom-tailored directly from the artisan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO BUY */}
            <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <span className="text-brand-600 text-xs font-bold tracking-widest uppercase block mb-3">
                                From Screen to Reality
                            </span>
                            <h3 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight font-serif">
                                Acquire Authentic Pieces
                            </h3>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed font-light">
                                Connect with the creators of Algerian beauty. Our platform facilitates direct engagement with accredited artisans for a personalized experience.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 text-brand-600">
                                        <i className="fa-solid fa-check-double text-xl"></i>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-1">1. Validate the Look</h5>
                                        <p className="text-sm text-gray-500">Ensure the color and cut suit you perfectly via the Virtual Studio.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setView(ViewState.PARTNERS)}
                                className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all hover:translate-x-1 flex items-center gap-3 w-fit"
                            >
                                Browse Artisans
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>

                        <div className="w-full md:w-1/2 relative">
                            <div className="aspect-square bg-gray-100 rounded-[2rem] overflow-hidden relative shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="images/visuals/shopping_experience.png"
                                    alt="Shopping Experience"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                            <span className="text-white font-bold text-lg">Order Confirmed</span>
                                        </div>
                                        <p className="text-gray-200 text-sm">Your order is being crafted by our artisan partner.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="bg-[#fcfbf9] py-24 border-t border-[#f0ebe0] overflow-hidden">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h3 className="font-serif text-2xl text-gray-400 mb-2 italic tracking-wider">
                        Partners in Craftsmanship
                    </h3>
                </div>

                <div className="relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fcfbf9] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fcfbf9] to-transparent z-10 pointer-events-none"></div>

                    <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] items-center w-max">
                        {[...PARTNERS, ...PARTNERS].map((p, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 mx-12 md:mx-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-pointer">
                                <div className="w-20 h-20 bg-white rounded-full p-2 shadow-sm group-hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 group-hover:ring-brand-100 transform group-hover:scale-110">
                                    <img src={p.logo} alt={p.name} className="w-full h-full object-cover rounded-full" />
                                </div>
                                <span className="font-serif font-medium text-sm text-gray-500 group-hover:text-gray-900 transition-colors whitespace-nowrap">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GUARANTEES & SECURITY */}
            <section className="py-24 bg-[#fff1f2] border-t border-brand-100 text-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4 font-serif">
                        {I18N.sec_title[lang]}
                    </h3>
                    <div className="inline-block bg-white px-8 py-3 rounded-full border border-gray-200 shadow-sm mb-16">
                        <span className="text-gray-500 font-medium tracking-wide font-sans">
                            {I18N.sec_subtitle[lang]}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Photo Security Card */}
                        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center text-accent-600">
                                    <i className="fa-solid fa-lock text-xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 font-serif">{I18N.sec_photo_title[lang]}</h4>
                            </div>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_photo_1[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_photo_2[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_photo_3[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_photo_4[lang]}</li>
                            </ul>
                        </div>

                        {/* Privacy Card */}
                        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center text-accent-600">
                                    <i className="fa-solid fa-user-shield text-xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 font-serif">{I18N.sec_privacy_title[lang]}</h4>
                            </div>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_privacy_1[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_privacy_2[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_privacy_3[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_privacy_4[lang]}</li>
                            </ul>
                        </div>

                        {/* Free Returns Card */}
                        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center text-accent-600">
                                    <i className="fa-solid fa-arrow-rotate-left text-xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 font-serif">{I18N.sec_return_title[lang]}</h4>
                            </div>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_return_1[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_return_2[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_return_3[lang]}</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>{I18N.sec_return_4[lang]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;