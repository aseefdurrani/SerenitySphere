import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req) {
  try {
    const { userId, email } = await req.json();
    console.log('Received user data in API route:', { userId, email });

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      // Create a new user only if they don't exist
      const user = await prisma.user.create({
        data: { id: userId, email: email },
      });
      console.log('User stored successfully:', user);
      return NextResponse.json({ message: 'User ID and email stored successfully', user });
    } else {
      console.log('User already exists:', existingUser);
      return NextResponse.json({ message: 'User already exists', user: existingUser });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Error storing user ID and email', error: error.message },
      { status: 500 }
    );
  }
}
