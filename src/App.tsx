import React, { useState, type ChangeEvent } from 'react';
import placeholderImg from './assets/image.png';
import backgroundBg from './assets/bg_2.jpg';

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
      const result: Prediction = await response.json(); // Assigning the type of result to Prediciton
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
      className="h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center font-sans  relative"
      style={{ backgroundImage: `url(${backgroundBg})`,
              filter: 'contrast(1.05) brightness(1.1)'}}
    >
      <div className="absolute inset-0 bg-black/5 z-0" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="h-32 flex flex-col items-center justify-center  text-center">
          {predictions && !isUploading ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <h3 className="font-black text-black ">
                It's a {predictions.predicted_class}!
              </h3>
              <p className="text-black font-bold text-sm">
                {predictions.confidence_percentage.toFixed(1)}% Accuracy
              </p>
            </div>
          ) : isUploading ? (
            <p className="text-black font-black text-xl animate-pulse tracking-widest uppercase">Analyzing...</p>
          ) : (
            <h2 className="text-2xl font-black text-black uppercase tracking-[0.3em]">PawNet</h2>
          )}
        </div>

       <div className="relative">
      <div className="w-[400px] h-[400px] bg-white rounded-[40px]  overflow-hidden flex items-center justify-center shadow-xl">
        <img
          src={image || placeholderImg}
          alt="Subject"
          className={`w-full h-full object-cover transition-all duration-700 
            ${!image ? 'opacity-30 grayscale' : 'opacity-100'}`}
        />
        {isUploading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-[40px] animate-spin" />
          </div>
        )}
      </div>
    </div>

        <div className="mt-12 pt-4 w-full flex justify-center">
          <label className="inline-block group">
            <span className={`
              inline-block px-16 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
              ${isUploading ? 'bg-stone-400 text-stone-600' : 'text-white hover:bg-[#8B5E34] hover:-translate-y-1 active:translate-y-0 cursor-pointer shadow-xl'}
            `}>
              {isUploading ? 'PLEASE WAIT' : 'UPLOAD IMAGE'}
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