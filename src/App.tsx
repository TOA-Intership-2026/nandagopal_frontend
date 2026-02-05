import React, { useState, type ChangeEvent } from 'react';
import placeholderImg from './assets/image.png';
import backgroundBg from './assets/bg_2.jpg';
import { translations, type Language } from './transalation';
import LangToggle from './components/LangToggle';
import ImageDisplay from './components/ImageDisplay';
import { uploadImageToModel} from './services/ModelRequest';
import UploadButton from './components/UploadButton';
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
    className="min-h-screen w-full bg-cover bg-center bg-no-repeat font-sans relative mobile-bg-optimize"
    style={{ 
      backgroundImage: `url(${backgroundBg})`,
      filter: 'contrast(1.05) brightness(1.1)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}
  >
    <div className="absolute inset-0 bg-black/5 sm:bg-black/5 bg-black/10 z-0" />

    <LangToggle lang={lang} onToggle={toggleLanguage} />

    <div className="flex flex-col items-center justify-center min-h-screen w-full relative z-10 px-4 py-8 sm:px-6 lg:px-8">
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-[0.1em] mb-4 sm:mb-6 text-white drop-shadow-md text-center">
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

      <UploadButton 
          isUploading={isUploading}
          uploadText={t.upload}
          waitText={t.wait}
          onUpload={handleUpload}
        />
    </div>
  </div>
);
};

export default App;