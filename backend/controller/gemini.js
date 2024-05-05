import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Run = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ err: "you need to provide a text" });
  }
  try {
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = message;

    const result = await chat.sendMessageStream(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return res.json({ text });
  } catch (error) {
    return res.json({ error });
  }
};

export default Run;
