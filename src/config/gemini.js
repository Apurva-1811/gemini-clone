// To run this code, install dependencies:
// npm install @google/genai mime
// npm install -D @types/node  (optional for TS only)

import { GoogleGenAI } from '@google/genai';

async function main(prompt) {
  // Initialize the client with your API key from environment variables
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // Configuration for the response format
  const config = {
    responseMimeType: 'text/plain',
  };

  // Free Gemini model
  const model = 'gemma-3-27b-it';

  // User input prompt - replace with your actual input
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

  // Call the model to generate a streamed response
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  // Print the streamed chunks as they arrive
    let fileIndex = 0;
  let fullResponse = "";

for await (const chunk of response) {
  fullResponse += chunk.text;
  
}

console.log(fullResponse); 
return fullResponse;// prints the entire response in one go

}

// Run the main function


export default main;
