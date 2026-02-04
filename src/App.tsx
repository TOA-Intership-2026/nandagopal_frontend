import React, { useState, type ChangeEvent } from 'react';
import placeholderImg from './assets/image.png';
import backgroundBg from './assets/bg_2.jpg';
import { translations, type Language } from './transalation'; // Import your new file

interface Prediction {
  confidence_percentage: number;
  predicted_class: string;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en'); // New Language State
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [predictions, updatePredictions] = useState<Prediction | null>(null);

  const t = translations[lang]; // Shortcut to translations

  const toggleLanguage = () => {
    const langs: Language[] = ['en', 'jp'];
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  // Safe translation function to avoid 'any' indexing error
  const getTranslatedAnimal = (animal: string) => {
    const key = animal.toLowerCase();
    if (key in t.animals) {
      return t.animals[key];
    }
    return animal; // Fallback to raw string
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        'https://nandagopalsb-animal-guesser.hf.space/uploadfile/',
        { method: 'POST', body: formData }
      );
      const result: Prediction = await response.json();
      updatePredictions(result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      updatePredictions(null);
      if (image) URL.revokeObjectURL(image);
      setImage(URL.createObjectURL(file));
      uploadFile(file);
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center bg-no-repeat font-sans relative"
      style={{ 
        backgroundImage: `url(${backgroundBg})`,
        filter: 'contrast(1.05) brightness(1.1)'
      }}
    >
    <button 
    onClick={toggleLanguage}
    className="absolute top-8 right-8 z-30 px-5 py-2 
    bg-grey/20 backdrop-blur-md border border-white/30 
    rounded-full text-black text-xs font-bold tracking-widest hover:bg-grey/40 
    transition-all uppercase">
    {lang === 'jp' ? '日本語' : lang.toUpperCase()}
    </button>
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl uppercase tracking-[0.2em] relative z-10">PawNet</h2>
        <div className="absolute inset-0 bg-black/5 z-0" />
        
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="h-32 flex flex-col items-center justify-center text-center">
            {predictions && !isUploading ? (
              <div className="animate-in fade-in zoom-in duration-500">
                <h3 className="font-black text-black text-4xl">
                  {t.resultPrefix} {getTranslatedAnimal(predictions.predicted_class)}{t.resultSuffix}
                </h3>
                <p className="text-black font-bold text-sm">
                  {predictions.confidence_percentage.toFixed(2)}% {t.match} 
                </p>
              </div>
            ) : isUploading ? (
              <p className="text-black font-black text-xl animate-pulse tracking-widest uppercase">
                {t.analyzing}
              </p>
            ) : (
              <h2 className="text-2xl font-black text-black uppercase tracking-[0.3em]"></h2>
            )}
          </div>
          <div className="relative">
            <div className="w-[400px] h-[400px] bg-white rounded-[40px] overflow-hidden flex items-center justify-center shadow-xl isolate">
              <img
                src={image || placeholderImg}
                alt="Subject"
                className={`w-full h-full object-cover transition-all duration-700
                  ${!image ? 'opacity-30 grayscale' : 'opacity-100'}`}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 pt-4 w-full flex justify-center">
            <label className="inline-block group">
              <span className={`
                inline-block px-16 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
                ${isUploading ? 'bg-stone-400 text-white' : 'bg-[#8B5E34] text-white hover:bg-black hover:-translate-y-1 active:translate-y-0 cursor-pointer shadow-xl'}
              `}>
                {isUploading ? t.wait : t.upload}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;