import React from 'react';
import { Language } from '../types';

interface SubscriptionProps {
    lang: Language;
}

const Subscription: React.FC<SubscriptionProps> = ({ lang }) => {
    const isAr = lang === 'ar';

    return (
        <div className="w-full animate-fade-in bg-white min-h-screen pb-20">

            {/* Hero Section - Luxury B2B */}
            <div className="relative bg-[#0a0f18] text-white py-24 md:py-32 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img src="images/backgrounds/artisan_hero.png" className="w-full h-full object-cover" alt="Artisan Background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f18] via-transparent to-[#0a0f18]"></div>
                    <div className="absolute inset-0 bg-brand-900/20 backdrop-multiply"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block border border-accent-400/30 rounded-full px-6 py-2 mb-8 backdrop-blur-md bg-accent-400/5">
                        <span className="text-accent-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
                            {isAr ? 'منصة الحرفيين الرقمية' : 'The Digital Artisan Workspace'}
                        </span>
                    </div>
                    <h1 className={`text-4xl md:text-7xl font-serif mb-8 leading-tight ${isAr ? 'font-arabic' : ''}`}>
                        {isAr ? 'ارتقِ بفنك إلى العصر الرقمي' : 'Scale Your Heritage to the Digital Age'}
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        {isAr
                            ? 'انضم إلى DZtryFitting وامنح زبائنك تجربة قياس افتراضية ثورية. حول متجرك التقليدي إلى استوديو رقمي عالمي.'
                            : 'Transform your traditional atelier into a global digital studio. Offer your customers a high-fidelity virtual fitting experience powered by cutting-edge AI.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#pricing" className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all transform hover:-translate-y-1">
                            {isAr ? 'عرض الخطط' : 'Explore Plans'}
                        </a>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold transition-all">
                            {isAr ? 'تحدث مع خبير' : 'Speak with an Expert'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Value Propositions */}
            <section className="py-24 bg-[#fdfbf7]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl md:text-4xl font-serif text-gray-900 mb-4 ${isAr ? 'font-arabic' : ''}`}>
                            {isAr ? 'لماذا تنضم إلينا؟' : 'Why Partner with DZtryFitting?'}
                        </h2>
                        <div className="w-24 h-1 bg-accent-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                <i className="fa-solid fa-wand-magic-sparkles text-3xl"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">{isAr ? 'تكنولوجيا تجربة القياس' : 'AI Try-On Tech'}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {isAr ? 'دع زبائنك يرتدون تصاميمك افتراضياً بدقة مذهلة.' : 'Let your clients wear your designs virtually with stunning precision before they buy.'}
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                <i className="fa-solid fa-earth-africa text-3xl"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">{isAr ? 'وصول وطني شامل' : 'National Reach'}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {isAr ? 'تواصل مع الزبائن في جميع الولايات الـ 69 دون قيود جغرافية.' : 'Connect with customers across all 69 Wilayas without geographical limitations.'}
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                <i className="fa-solid fa-chart-line text-3xl"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">{isAr ? 'تحليلات الموضة' : 'Fashion Insights'}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {isAr ? 'افهم ما يفضله الزبائن عبر تقارير تفاعلية حول أكثر الموديلات تجربة.' : 'Understand customer preferences with interactive reports on most-tried designs.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Grid */}
            <section id="pricing" className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                        {/* Starter Plan */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                            <div className="mb-8">
                                <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Entry Level</span>
                                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">Starter</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900">0</span>
                                    <span className="text-gray-400 font-medium">DZD / mo</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 text-gray-600 flex-1">
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm">3 Garments Showcase</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm">Standard AI Resolution</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                                        <i className="fa-solid fa-xmark text-[10px]"></i>
                                    </div>
                                    <span className="text-sm text-gray-400">Advanced Analytics</span>
                                </li>
                            </ul>

                            <button className="w-full py-4 border border-gray-900 rounded-2xl font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                                {isAr ? 'ابدأ مجاناً' : 'Get Started Free'}
                            </button>
                        </div>

                        {/* Pro Plan - Featured */}
                        <div className="bg-white rounded-[2rem] p-10 border-2 border-accent-400 shadow-2xl relative transform md:-translate-y-6 flex flex-col z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-400 to-accent-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                                {isAr ? 'الخيار المفضل' : 'Most Popular'}
                            </div>

                            <div className="mb-8">
                                <span className="text-accent-600 font-bold tracking-widest uppercase text-[10px] mb-2 block">Professional Artisan</span>
                                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">Pro Studio</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-brand-600">2,500</span>
                                    <span className="text-gray-400 font-medium">DZD / mo</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 text-gray-700 flex-1">
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm font-medium">Unlimited Garments</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm font-medium">High-Def AI Rendering</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm font-medium">Priority Customer Support</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                    <span className="text-sm font-medium">Social Media Integration</span>
                                </li>
                            </ul>

                            <button className="w-full py-5 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl hover:shadow-brand-500/40 hover:-translate-y-1">
                                {isAr ? 'اشترك الآن' : 'Subscribe to Pro'}
                            </button>
                        </div>

                        {/* Business Plan */}
                        <div className="bg-luxury-dark text-white rounded-[2rem] p-10 border border-gray-800 shadow-xl flex flex-col relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-400/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent-400/20 transition-all duration-700"></div>

                            <div className="mb-8 relative z-10">
                                <span className="text-accent-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Luxury Houses</span>
                                <h3 className="font-serif text-3xl font-bold text-white mb-4">Maison Business</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">Custom Quote</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 text-gray-400 flex-1 relative z-10">
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-accent-400 shrink-0">
                                        <i className="fa-solid fa-star text-[10px]"></i>
                                    </div>
                                    <span className="text-sm">White-label Experience</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-accent-400 shrink-0">
                                        <i className="fa-solid fa-star text-[10px]"></i>
                                    </div>
                                    <span className="text-sm">API Access for Your Website</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-accent-400 shrink-0">
                                        <i className="fa-solid fa-star text-[10px]"></i>
                                    </div>
                                    <span className="text-sm">Dedicated Account Manager</span>
                                </li>
                            </ul>

                            <button className="w-full py-4 bg-accent-400 text-luxury-dark font-bold rounded-2xl hover:bg-accent-300 transition-all relative z-10 shadow-lg">
                                {isAr ? 'طلب عرض مخصص' : 'Contact Enterprise'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Quote */}
            <section className="py-20 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <i className="fa-solid fa-quote-left text-brand-100 text-6xl mb-6"></i>
                    <p className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed mb-8">
                        {isAr
                            ? '"DZtryFitting فتحت لنا أبواباً لم نكن نتخيلها. الآن يمكن لزبائننا في فرنسا وكندا تجربة ملابسنا التقليدية بضغطة زر."'
                            : '"DZtryFitting opened doors we never imagined. Now our clients in France and Canada can try on our traditional attire with a simple click."'}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-brand-50 shadow-sm">
                            <img src="images/partners/maison_caftan.png" alt="Testimonial" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <h5 className="font-bold text-gray-900 leading-none">Maison du Caftan</h5>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">Verified Partner since 2025</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Subscription;