import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Fetch all conversations for a given user and bot
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const botId = searchParams.get('botId');

    if (!userId || !botId) {
      return NextResponse.json({ error: 'Both userId and botId are required' }, { status: 400 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
        botId,
      },
      include: { messages: true },
      orderBy: { startedAt: 'desc' },
    });
    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: 'Error fetching conversations' }, { status: 500 });
  }
}

// Create a new conversation with a welcome message
export async function POST(request) {
  try {
    const { botId, userId, chatType } = await request.json();

    if (!userId || !botId || !chatType) {
      return NextResponse.json({ error: 'botId, userId, and chatType are required' }, { status: 400 });
    }

    const welcomeMessages = {
      Fitness: "Hi! I'm the Fitness support assistant at SerenitySphere. How can I help you today?",
      Inspiration: "Hello! I'm here to inspire you. What can I do for you today?",
      Journal: "Welcome to your personal journal. What would you like to reflect on?",
      Mindfulness: "Let's take a moment to be mindful. How are you feeling today?",
      Mood: "Tell me about your mood, and I'll try to help.",
      LiveSupport: "This is Live Support. How can we assist you today?",
    };

    const welcomeMessage = welcomeMessages[chatType] || "Hello! How can I assist you today?";

    const newConversation = await prisma.conversation.create({
      data: {
        botId,
        userId,
        chatType, // Ensure chatType is set here
        startedAt: new Date(),
        messages: {
          create: {
            senderType: 'Bot',
            content: welcomeMessage,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error("Error creating new conversation:", error);
    return NextResponse.json({ error: 'Error creating new conversation', message: error.message }, { status: 500 });
  }
}
