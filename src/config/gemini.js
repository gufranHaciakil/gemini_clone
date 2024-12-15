import { GoogleGenerativeAI } from "@google/generative-ai";

//   HarmCategory,
//   HarmBlockThreshold,

const apiKey = "AIzaSyBN0u5exyWad0pHMZ6dojZiTw6DehzCi_c";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(propmt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(propmt);
  console.log(result.response.text());
  console.log(result);

  return result.response.text();
}

export default run;
