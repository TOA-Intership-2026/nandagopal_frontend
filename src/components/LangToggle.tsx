import React from 'react';
import type { Language } from '../transalation.ts';

interface Props {
  lang: Language;
  onToggle: () => void;
}

const LangToggle: React.FC<Props> = ({ lang, onToggle }) => (
  <button 
    onClick={onToggle}
    className="
      /* Absolute positioning in the top-right of the screen */
      absolute top-4 right-4 sm:top-8 sm:right-8 z-50 
      
      /* Visual styling */
      px-4 py-2 sm:px-6 sm:py-2.5 rounded-full 
      bg-white/20 backdrop-blur-md 
      border border-white/40 
      shadow-lg 
      
      /* Typography */
      text-white text-xs font-extrabold tracking-widest 
      
      /* Interaction */
      hover:bg-white/30 hover:scale-105 active:scale-95 
      transition-all duration-300 uppercase cursor-pointer
    "
  >
    {lang === 'jp' ? 'にほんご' : 'ENGLISH'}
  </button>
);
export default LangToggle;