import NLPCloudClient from "nlpcloud";
import { NextResponse } from "next/server";

const NLPKEY = process.env.NPL_KEY;

export async function POST(request: Request) {
 const { message, history } = await request.json();

 if (!NLPKEY) {
    return new NextResponse(JSON.stringify({ error: 'NLP_KEY is not defined' }), { status: 500 });
 }

 const client = new NLPCloudClient({
    model: 'finetuned-llama-2-70b',
    token: NLPKEY,
    gpu: true
 });

 try {
    const response = await client.chatbot({
      input: message,
      context: 'This is a conversation with an AI assistant. Ai is helpful, creative, clever, and very friendly, her name is Valeria.',
      history: history || [],
    });

    return new NextResponse(JSON.stringify(response.data), { status: 200 });
 } catch (error) {
   console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500});
 }
}