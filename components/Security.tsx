import React from 'react';
import { Language } from '../types';
import { I18N } from '../constants';

interface SecurityProps {
  lang: Language;
}

const Security: React.FC<SecurityProps> = ({ lang }) => {
  return (
    <div className="w-full animate-fade-in bg-[#fcfbf9] min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
             <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-100 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-50 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="text-center mb-16">
                <h1 className={`text-4xl md:text-6xl font-serif text-gray-900 mb-6 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {I18N.sec_title[lang]}
                </h1>
                <div className="inline-block bg-white px-8 py-3 rounded-full border border-gray-200 shadow-sm">
                     <span className={`text-gray-500 text-lg font-medium tracking-wide ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                        {I18N.sec_subtitle[lang]}
                     </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Photo Security Card */}
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent-200 transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-20 h-20 bg-accent-50 rounded-full flex items-center justify-center mb-4 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                            <i className="fa-solid fa-lock text-3xl"></i>
                        </div>
                        <h4 className={`text-2xl font-bold text-gray-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {I18N.sec_photo_title[lang]}
                        </h4>
                    </div>
                    <ul className={`space-y-4 text-gray-600 text-base leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_photo_1[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_photo_2[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_photo_3[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_photo_4[lang]}
                        </li>
                    </ul>
                </div>

                {/* Privacy Card */}
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent-200 transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-20 h-20 bg-accent-50 rounded-full flex items-center justify-center mb-4 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                            <i className="fa-solid fa-user-shield text-3xl"></i>
                        </div>
                        <h4 className={`text-2xl font-bold text-gray-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {I18N.sec_privacy_title[lang]}
                        </h4>
                    </div>
                    <ul className={`space-y-4 text-gray-600 text-base leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_privacy_1[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_privacy_2[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_privacy_3[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_privacy_4[lang]}
                        </li>
                    </ul>
                </div>

                {/* Returns Card */}
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent-200 transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center mb-8">
                         <div className="w-20 h-20 bg-accent-50 rounded-full flex items-center justify-center mb-4 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                            <i className="fa-solid fa-rotate-left text-3xl"></i>
                        </div>
                        <h4 className={`text-2xl font-bold text-gray-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {I18N.sec_return_title[lang]}
                        </h4>
                    </div>
                    <ul className={`space-y-4 text-gray-600 text-base leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_return_1[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_return_2[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_return_3[lang]}
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-green-600 text-xs"></i>
                            </div>
                            {I18N.sec_return_4[lang]}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Security;