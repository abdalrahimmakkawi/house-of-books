import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateBookNarration(text: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this book summary in a calm, professional, and engaging voice: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Calm, professional voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      console.log("Narration generated successfully, length:", base64Audio.length);
      
      try {
        const cleanBase64 = base64Audio.replace(/\s/g, '');
        const binaryString = atob(cleanBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // If it already has a RIFF header, just return it as a Blob
        if (cleanBase64.startsWith('UklGR')) {
          const blob = new Blob([bytes], { type: 'audio/wav' });
          return URL.createObjectURL(blob);
        }

        // Otherwise, assume it's raw PCM 16-bit mono 24kHz and wrap it in a WAV header
        const sampleRate = 24000;
        const numChannels = 1;
        const bitsPerSample = 16;
        
        const header = new ArrayBuffer(44);
        const view = new DataView(header);
        
        /* RIFF identifier */
        view.setUint32(0, 0x52494646, false); // "RIFF"
        /* file length */
        view.setUint32(4, 36 + len, true);
        /* RIFF type */
        view.setUint32(8, 0x57415645, false); // "WAVE"
        /* format chunk identifier */
        view.setUint32(12, 0x666d7420, false); // "fmt "
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, numChannels, true);
        /* sample rate */
        view.setUint32(24, sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, numChannels * (bitsPerSample / 8), true);
        /* bits per sample */
        view.setUint16(34, bitsPerSample, true);
        /* data chunk identifier */
        view.setUint32(36, 0x64617461, false); // "data"
        /* data chunk length */
        view.setUint32(40, len, true);
        
        const blob = new Blob([header, bytes], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
      } catch (e) {
        console.error("Error processing base64 audio:", e);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating narration:", error);
    return null;
  }
}

export async function askBookQuestion(bookTitle: string, bookSummary: string, question: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ 
        parts: [{ 
          text: `You are an expert on the book "${bookTitle}". 
          Here is a summary of the book: ${bookSummary}. 
          
          The user has a question about this book: "${question}". 
          
          Provide a concise, insightful, and helpful answer based on the summary and your general knowledge of this book. 
          Keep the tone professional and engaging.` 
        }] 
      }],
    });

    return response.text || "I'm sorry, I couldn't generate an answer right now.";
  } catch (error) {
    console.error("Error asking book question:", error);
    return null;
  }
}
