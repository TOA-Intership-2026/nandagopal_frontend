export type Language = 'en' | 'jp';

export interface Translation {
  analyzing: string;
  match: string;
  upload: string;
  wait: string;
  resultPrefix: string;
  resultSuffix: string;
  animals: Record<string, string>;
}

export const translations: Record<Language, Translation> = {
  en: {
    analyzing: "ANALYZING...",
    match: "ACCURACY",
    upload: "UPLOAD IMAGE",
    wait: "PLEASE WAIT",
    resultPrefix: "It's a",
    resultSuffix: "!",
    animals: { dog: "Dog", cat: "Cat" }
  },
 jp: {
    analyzing: "かいせきちゅう...", // Analyzing (Hiragana)
    match: "のせいど", // Accuracy (Hiragana)
    upload: "ファイルをアップロード", // Upload Image (Hiragana)
    wait: "おまちください", // Please wait (Hiragana)
    resultPrefix: "これは ", // This is...
    resultSuffix: " です！", // ...is!
    animals: { 
      dog: "いぬ", // Dog (Standard Katakana)
      cat: "ねこ"  // Cat (Standard Katakana)
    }
  }
};