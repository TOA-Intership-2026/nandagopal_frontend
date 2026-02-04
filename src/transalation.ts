export type Language = 'en' | 'jp';

export interface Translation {
  analyzing: string;
  match: string;
  upload: string;
  wait: string;
  resultPrefix: string;
  resultSuffix: string;
  animals: Record<string, string>;
  title:string;
}

export const translations: Record<Language, Translation> = {
  en: {
    analyzing: "Analyzing...",
    match: "Accuracy",
    upload: "UPLOAD IMAGE",
    wait: "Please Wait",
    resultPrefix: "It's a ",
    resultSuffix: "!",
    animals: { dog: "Dog", cat: "Cat" },
    title:"PawNet"
  },
 jp: {
    analyzing: "かいせきちゅう...", 
    match: "のせいど", 
    upload: "ファイルをアップロード", 
    wait: "おまちください", 
    resultPrefix: "これは ", 
    resultSuffix: "です！", 
    animals: { 
      dog: "いぬ", 
      cat: "ねこ" 
    },
    title:"にくきゅう・ネット"
  }
};