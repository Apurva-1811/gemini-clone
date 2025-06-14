import { GoogleGenAI } from '@google/genai';

async function main(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing! Check your environment variable.");
  }

  const ai = new GoogleGenAI({

    

    apiKey,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemma-3-27b-it';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = "";
  for await (const chunk of response) {
  if (chunk && typeof chunk.text === 'string') {
    fullResponse += chunk.text;
  }
}


  return fullResponse || "";
}

export default main;
