import React, { useState, type ChangeEvent } from 'react';
// Assuming your assets are in the src/assets folder
import placeholderImg from './assets/image.png';
import backgroundBg from './assets/cute.jpg';

interface Prediction {
  confidence_percentage: number;
  predicted_class: string;
}

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [predictions, updatePredictions] = useState<Prediction | null>(null);

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
      className="h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center p-10 font-sans select-none relative"
      style={{ backgroundImage: `url(${backgroundBg})` }}
    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        
        {/* 1. Prediction (Top) */}
        <div className="h-32 flex flex-col items-center justify-end mb-8 text-center">
          {predictions && !isUploading ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <h3 className="text-6xl font-black text-black capitalize tracking-tighter">
                It's a {predictions.predicted_class}!
              </h3>
              <p className="text-zinc-600 font-bold tracking-widest uppercase text-xs mt-2">
                {predictions.confidence_percentage.toFixed(1)}% Match Confidence
              </p>
            </div>
          ) : isUploading ? (
            <p className="text-black font-black text-xl animate-pulse uppercase tracking-widest">
              Analyzing Pixels...
            </p>
          ) : (
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
              Animal Guesser
            </h2>
          )}
        </div>

        {/* 2. Image Placeholder (Middle) */}
        <div className="relative group">
          <div className="  overflow-hidden transition-all duration-500">
            <img
              src={image || placeholderImg}
              alt="Subject"
              className={`w-full h-full object-cover transition-all duration-700 
                ${!image ? 'opacity-30 grayscale' : 'opacity-100'}`}
            />
            
            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* 3. Upload Button (Bottom) */}
        <div className="mt-12">
          <label className="inline-block group">
            <span className={`
              inline-block px-14 py-5 text-sm font-black tracking-[0.3em] uppercase transition-all duration-200
              ${isUploading ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800 hover:scale-110 active:scale-90 cursor-pointer shadow-2xl'}
            `}>
              {isUploading ? 'Wait...' : 'Upload Image'}
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