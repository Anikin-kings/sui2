
import { GoogleGenAI } from "@google/genai";
import { Mode } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (mode: Mode, input: string): string => {
  const basePrompt = "You are an expert programmer specializing in the Move language, used for smart contracts on blockchains like Sui and Aptos. Your name is Move Mentor.";
  
  switch (mode) {
    case Mode.GENERATE:
      return `${basePrompt}\n\nGenerate a complete, well-documented Move code module or function based on the following request. Ensure the code is secure and follows best practices. Provide the code in a markdown block.\n\nREQUEST: "${input}"`;
    case Mode.EXPLAIN:
      return `${basePrompt}\n\nExplain the following Move code snippet. Break down its functionality, explain the purpose of key components like structs, functions, and abilities, and discuss any potential security implications. Format your explanation clearly.\n\nCODE:\n\`\`\`move\n${input}\n\`\`\``;
    case Mode.FIX:
      return `${basePrompt}\n\nAnalyze the following Move code, identify any bugs, syntax errors, or logical flaws. Provide a corrected version of the code in a markdown block and a clear explanation of the fixes you made.\n\nBROKEN CODE:\n\`\`\`move\n${input}\n\`\`\``;
    case Mode.LEARN:
      return `${basePrompt}\n\nExplain the following concept related to the Move programming language in detail. Use examples where appropriate to clarify your explanation.\n\nCONCEPT: "${input}"`;
    default:
      throw new Error('Invalid mode selected.');
  }
};

export const runQuery = async (mode: Mode, input: string): Promise<string> => {
  const prompt = getPrompt(mode, input);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from AI. Please check your API key and network connection.");
  }
};
