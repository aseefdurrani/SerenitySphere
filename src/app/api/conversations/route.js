import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      include: { messages: true },
      orderBy: { startedAt: 'desc' },
    });
    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: 'Error fetching conversations' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { botId, userId } = await request.json();

    if (!userId || !botId) {
      return NextResponse.json({ error: 'Both botId and userId are required' }, { status: 400 });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        botId,
        userId,
        startedAt: new Date(),
        messages: {
          create: {
            senderType: 'Bot',
            content: "Hi! I'm the Fitness support assistant at SerenitySphere. How can I help you today?",
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