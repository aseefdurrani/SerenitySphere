// pages/api/conversations/[conversationId].js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { conversationId } = params;

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json({ error: 'Error fetching conversation', message: error.message }, { status: 500 });
  }
}
