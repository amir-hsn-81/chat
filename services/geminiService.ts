
import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';

let chat: Chat | null = null;

const initializeChat = (history: Message[]) => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    return;
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const formattedHistory = history.map(msg => ({
    role: msg.senderId === 4 ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: formattedHistory,
    config: {
        systemInstruction: "You are a helpful and friendly conversational AI. Keep your responses concise and engaging.",
    }
  });
};


export const getGeminiResponse = async (prompt: string, history: Message[]): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Error: API Key not configured. Please set the API_KEY environment variable.";
    }

    if (!chat) {
        initializeChat(history);
    }
    
    if (!chat) {
        return "Error: Chat could not be initialized.";
    }

    try {
        const response = await chat.sendMessage({ message: prompt });
        return response.text;
    } catch (error) {
        console.error("Error fetching response from Gemini API:", error);
        return "Sorry, I encountered an error. Please try again later.";
    }
};
