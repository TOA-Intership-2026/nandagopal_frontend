import React, { useState, type ChangeEvent } from 'react';
import placeholderImg from './assets/image.png';
import backgroundBg from './assets/bg_2.jpg';
import { translations, type Language } from './transalation';
import LangToggle from './components/LangToggle';
import ImageDisplay from './components/ImageDisplay';
import { uploadImageToModel} from './services/ModelRequest';
interface Prediction {
  confidence_percentage: number;
  predicted_class: string;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [predictions, updatePredictions] = useState<Prediction | null>(null);

  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'jp' : 'en');
  };

  const getTranslatedAnimal = (animal: string) => {
    const key = animal.toLowerCase();
    return t.animals[key] || animal;
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadImageToModel(file);
      updatePredictions(result);
    } catch (error) {
      console.error('Service Error:', error);
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
    className="h-screen w-screen bg-cover bg-center bg-no-repeat font-sans relative overflow-hidden"
    style={{ 
      backgroundImage: `url(${backgroundBg})`,
      filter: 'contrast(1.05) brightness(1.1)'
    }}
  >
    <div className="absolute inset-0 bg-black/5 z-0" />

    <LangToggle lang={lang} onToggle={toggleLanguage} />

    <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
      
      <h2 className="text-2xl tracking-[0.1em] mb-4 text-white drop-shadow-md">
        {t.title}
      </h2>

      <ImageDisplay 
        image={image} 
        placeholder={placeholderImg} 
        isUploading={isUploading} 
        predictions={predictions} 
        t={t}
        translatedAnimal={predictions ? getTranslatedAnimal(predictions.predicted_class) : ''}
      />

      <div className="mt-12 pt-4 w-full flex justify-center">
        <label className="inline-block group">
          <span className={`
            inline-block px-16 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
            ${isUploading ? 'bg-stone-400 text-white' : 'bg-[#8f5d06] text-[#f1f5f0] '}
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
);
};

export default App;