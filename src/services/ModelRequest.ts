// Define the interface here so the service knows what it's returning
export interface Predictions {
  confidence_percentage: number;
  predicted_class: string;
}

const API_URL = 'https://nandagopalsb-animal-guesser.hf.space/uploadfile/';

/**
 * Sends an image file to the ML model and returns the prediction result.
 */
export const uploadImageToModel = async (file: File): Promise<Predictions> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }

  const result: Predictions = await response.json();
  return result;
};