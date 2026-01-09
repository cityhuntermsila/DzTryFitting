import React from 'react';
import { Language } from '../types';

interface ApiKeySelectionProps {
  onSelect: () => void;
  lang: Language;
}

const ApiKeySelection: React.FC<ApiKeySelectionProps> = ({ onSelect, lang }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center animate-fade-in relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-50 rounded-full -ml-12 -mb-12 opacity-50"></div>

        <div className="relative z-10">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-key text-3xl text-brand-600"></i>
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                {lang === 'ar' ? 'مطلوب مفتاح API' : 'Unlock the Atelier'}
            </h1>
            
            <p className="text-gray-500 mb-8 leading-relaxed">
                {lang === 'ar' 
                    ? 'للوصول إلى تجربة القياس الافتراضي، يرجى اختيار مفتاح API الخاص بك.'
                    : 'To experience the AI-powered virtual fitting and access the collection, please select your Google Cloud API Key.'}
            </p>

            <button 
                onClick={onSelect}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-3 mb-6"
            >
                <span>{lang === 'ar' ? 'اختيار مفتاح API' : 'Select API Key'}</span>
                <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
            </button>

            <div className="text-xs text-gray-400 border-t border-gray-100 pt-4">
                <p className="mb-1">{lang === 'ar' ? 'مفتاح API مدفوع مطلوب من مشروع GCP.' : 'A paid API key from a GCP project is required.'}</p>
                <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 underline"
                >
                    {lang === 'ar' ? 'وثائق الفوترة' : 'Read Billing Documentation'}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySelection;