import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { conversationId, content, senderType } = await request.json();

    if (!conversationId || !content || !senderType) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        content,
        senderType,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: 'Error saving message', message: error.message }, { status: 500 });
  }
}
