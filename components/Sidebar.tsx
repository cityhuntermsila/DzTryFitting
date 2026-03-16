import React from 'react';
import { ViewState, Language } from '../types';
import { I18N } from '../constants';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  lang: Language;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, lang, isOpen, setIsOpen }) => {
  
  const menuItems = [
    { view: ViewState.DASHBOARD, icon: 'fa-home', label: I18N.dashboard[lang] },
    { view: ViewState.STUDIO, icon: 'fa-wand-magic-sparkles', label: I18N.studio[lang] },
    { view: ViewState.GALLERY, icon: 'fa-layer-group', label: I18N.gallery[lang] },
    { view: ViewState.PARTNERS, icon: 'fa-handshake', label: I18N.partners[lang] },
    { view: ViewState.SUBSCRIPTION, icon: 'fa-crown', label: I18N.subscription[lang] },
    { view: ViewState.SECURITY, icon: 'fa-shield-halved', label: I18N.security[lang] },
    { view: ViewState.ABOUT, icon: 'fa-scroll', label: I18N.about[lang] },
  ];

  return (
    <>
      {/* Mobile Overlay (Only visible when open on mobile) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container 
          - Mobile: Toggled via isOpen
          - Desktop: Auto-hides (leaves a 12px strip), expands on hover
      */}
      <aside 
        className={`
          fixed inset-y-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-gray-100 shadow-2xl transform transition-transform duration-500 ease-out
          
          /* Positioning based on Language */
          left-0 border-r

          /* MOBILE BEHAVIOR (Controlled by button) */
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}

          /* DESKTOP BEHAVIOR (Controlled by Hover) */
          /* Default Desktop: Hide but leave 12px visible as a trigger */
          lg:-translate-x-[calc(100%-12px)] lg:hover:translate-x-0
        `}
      >
        <div className="flex flex-col h-full relative group">
          
          {/* Visual Handle / Hint Strip */}
          <div className={`absolute inset-y-0 w-1 bg-gray-200 group-hover:bg-brand-500 transition-colors duration-300 top-1/2 -translate-y-1/2 h-24 rounded-full my-auto right-2 lg:block hidden opacity-50`}></div>

          {/* Logo Area */}
          <div className="h-24 flex items-center justify-center border-b border-gray-50 shrink-0">
            <h1 className="font-serif text-2xl font-bold text-brand-600 tracking-tight">
              DZ<span className="text-accent-500">try</span>Fitting
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group/item relative overflow-hidden
                  ${currentView === item.view 
                    ? 'bg-brand-50 text-brand-600 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-brand-600'}
                `}
              >
                <i className={`fa-solid ${item.icon} w-6 mr-3 text-lg transition-transform group-hover/item:scale-110`}></i>
                <span className="font-medium tracking-wide font-sans">{item.label}</span>
                
                {/* Active Indicator */}
                {currentView === item.view && (
                    <div className="absolute top-0 bottom-0 w-1 bg-brand-600 right-0"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Footer Area */}
          <div className="p-6 border-t border-gray-50 shrink-0 bg-gray-50/50">
             <div className="text-center text-xs text-gray-400">
               DZtryFitting v1.0
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;