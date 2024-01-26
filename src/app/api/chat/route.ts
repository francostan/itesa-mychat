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

  try {
    const client = new NLPCloudClient({
      model: 'chatdolphin',
      token: NPLKEY,
      gpu: true,
    });

    let retries = 3;
    let response;

    while (retries > 0) {
      try {
        response = await client.chatbot({
          input: message,
          context: 'This is a conversation with an AI assistant. Ai is helpful, creative, clever, and very friendly, her name is Valeria.',
          history: history || [],
        });

        break;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers['retry-after']) || 5;
          console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        } else {
          throw error;
        }
      }

      retries--;
    }

    console.log(response.data);
    return new NextResponse(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}