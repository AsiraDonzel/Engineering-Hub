import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your VITE_ prefix key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateLabReport = async (title: string, objectives: string, data: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Engineering Lab Assistant. 
      Generate a professional lab report section based on:
      Title: ${title}
      Objectives: ${objectives}
      Raw Data: ${data}
      
      Please provide:
      1. A "Theory" section (background physics/engineering principles).
      2. A "Discussion" of the results based on the data.
      3. A "Conclusion" summarizing if objectives were met.
      
      Format the output in clean Markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate lab report. Please check your connection.");
  }
};