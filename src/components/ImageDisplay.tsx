import React from 'react';
import type { Translation } from '../transalation';

interface Props {
  image: string | null;
  placeholder: string;
  isUploading: boolean;
  predictions: any;
  t: Translation;
  translatedAnimal: string;
}

const ImageDisplay: React.FC<Props> = ({ image, placeholder, isUploading, predictions, t, translatedAnimal }) => {
  return (
    <div className="relative z-10 flex flex-col items-center w-full">
      <div className="h-24 sm:h-32 flex flex-col items-center justify-center text-center px-4">
        {predictions && !isUploading ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <h3 className="font-black text-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
              {t.resultPrefix} {translatedAnimal}{t.resultSuffix}
            </h3>
            <p className="text-black font-bold text-xs sm:text-sm mt-1">
              {predictions.confidence_percentage.toFixed(2)}% {t.match}
            </p>
          </div>
        ) : isUploading ? (
          <p className="text-black font-black text-lg sm:text-xl animate-pulse tracking-widest uppercase">
            {t.analyzing}
          </p>
        ) : (
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-[0.3em]"></h2>
        )}
      </div>

      <div className="relative">
        <div className="w-80 h-80 sm:w-[400px] sm:h-[400px] bg-white rounded-3xl sm:rounded-[40px] overflow-hidden flex items-center justify-center shadow-xl isolate">
          <img
            src={image || placeholder}
            alt="Subject"
            className={`w-full h-full object-cover transition-all duration-700 ${!image ? 'opacity-30 grayscale' : 'opacity-100'}`}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;