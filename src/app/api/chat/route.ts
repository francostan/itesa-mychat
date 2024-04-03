import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateHistory } from "../../utils";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(request: Request) {
  const { message, history } = await request.json();

  console.log(message, history?.length || 0);

  if (!genAI) {
    return new NextResponse(JSON.stringify({ error: "genAI is not defined" }), {
      status: 400,
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let generatedHistory = generateHistory(history.reverse().slice(0, 7));

    const chat = model.startChat({
      history: generatedHistory,
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });

    const result = await chat.sendMessage(message);
    console.log(result);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return new NextResponse(JSON.stringify({ response: text }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
