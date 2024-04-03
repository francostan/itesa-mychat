import { NextResponse } from "next/server";
import { generateHistory } from "../../utils";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(request: Request) {
  const { message, history } = await request.json();

  console.log(message, history);

  if (!genAI) {
    return new NextResponse(JSON.stringify({ error: "genAI is not defined" }), {
      status: 400,
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    let generatedHistory = generateHistory(history);

    const chat = model.startChat({
      history: generatedHistory,
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    if (!text) {
      return new NextResponse(
        JSON.stringify({ response: "Try again later, please" }),
        {
          status: 200,
        }
      );
    }
    return new NextResponse(JSON.stringify({ response: text }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      { status: 500 }
    );
  }
}
