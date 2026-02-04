import React, { type ChangeEvent } from 'react';

interface Props {
  isUploading: boolean;
  uploadText: string;
  waitText: string;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<Props> = ({ isUploading, uploadText, waitText, onUpload }) => {
  return (
    <div className="mt-12 pt-4 w-full flex justify-center relative z-10">
      <label className="inline-block group">
        <span className={`
          inline-block px-16 py-4 rounded-xl text-sm font-black tracking-[0.2em] uppercase 
          
          transition-all duration-300 transform
          
          ${isUploading 
            ? 'bg-stone-400 text-white cursor-not-allowed scale-100 opacity-80' 
            : 'text-[#f1f5f0] shadow-xl cursor-pointer hover:bg-[#a66d08] hover:-translate-y-1 hover:shadow-2xl active:scale-95 active:translate-y-0'}
        `}>
          {isUploading ? waitText : uploadText}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={onUpload}
          accept="image/*"
          disabled={isUploading}
        />
      </label>
    </div>
  );
};

export default UploadButton;