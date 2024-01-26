import { ObjectId } from 'mongodb';
import Conversation from '../../models/Conversation';
import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('userEmail');
  const date = searchParams.get('date');

  try {
    await connectToDatabase();

    // loguear info en la consola de vercel
    console.log('User email:', userEmail);
    console.log('Date:', date);

    if (!userEmail || !date) {
      return new NextResponse(JSON.stringify({ error: 'User email and date are required parameters' }), { status: 400 });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    const conversation = await Conversation.findOne({
      userEmail,
      lastMessageAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!conversation) {
      return new NextResponse(JSON.stringify({ message: 'No conversation found for the specified date' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(conversation), { status: 200 });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching conversation' }), { status: 500 });
  }
}

export async function POST(request: Request) {
    const { userEmail, lastMessageAt, message } = await request.json();
  
    try {
      await connectToDatabase();
  
      if (!userEmail || !message || !message.input || !message.response) {
        return new NextResponse(JSON.stringify({ error: 'User email and message with input and response are required' }), { status: 400 });
      }
  
      if (lastMessageAt) {
        const existingConversation = await Conversation.findOne({
          userEmail,
          lastMessageAt: { $gte: new Date(lastMessageAt).setHours(0, 0, 0, 0), $lte: new Date(lastMessageAt).setHours(24, 0, 0, 0) },
        });
  
        if (existingConversation) {
          existingConversation.messages.push(message);
          existingConversation.lastMessageAt = new Date();
          const savedConversation = await existingConversation.save();
  
          return new NextResponse(JSON.stringify(savedConversation), { status: 200 });
        }
      }
  
      const newConversation = new Conversation({
        userEmail,
        lastMessageAt: new Date(),
        messages: [message],
      });
  
      const savedConversation = await newConversation.save();
      return new NextResponse(JSON.stringify(savedConversation), { status: 201 });
    } catch (error) {
      console.error('Error handling conversation:', error);
      return new NextResponse(JSON.stringify({ error: 'Error handling conversation' }), { status: 500 });
    }
  }
  