import NLPCloudClient from "nlpcloud";
import { NextResponse } from "next/server";

const NPLKEY = process.env.NPL_KEY;

export async function POST(request: Request) {
 const { message, history } = await request.json();

 console.log(message, history);
 console.log(NPLKEY);

 if (!NPLKEY) {
    return new NextResponse(JSON.stringify({ error: 'NLP_KEY is not defined' }), { status: 400 });
 }

 const client = new NLPCloudClient({
    model: 'dolphin',
    token: NPLKEY,
    gpu: true,
 });

 try {
    // Add delay before making the request
    await new Promise(resolve => setTimeout(resolve, 3500));

    const response = await client.chatbot({
      input: message,
      context: 'This is a conversation with an AI assistant. Ai is helpful, creative, clever, and very friendly, her name is Valeria.',
      history: history || [],
    });
    console.log(response.data);
    return new NextResponse(JSON.stringify(response.data), { status: 200 });
 } catch (error) {
   console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500});
 }
}