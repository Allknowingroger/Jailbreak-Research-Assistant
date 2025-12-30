
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GenerationResult, ResearchSource } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateWhitePaperSection(prompt: string): Promise<GenerationResult> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "Failed to generate content.";
      const sources: ResearchSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        ?.map(chunk => ({
          title: chunk.web?.title || "Research Link",
          uri: chunk.web?.uri || "#"
        })) || [];

      return { text, sources };
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
