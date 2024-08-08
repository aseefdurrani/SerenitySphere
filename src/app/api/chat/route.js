import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define the system prompt for the AI assistant
const systemPrompt = `
You are an AI-powered customer support assistant for Headstarter, an online platform that helps users practice for technical interviews through real-time AI-driven mock interviews. Your primary goals are to provide friendly, helpful, and accurate assistance, ensuring users have a smooth and effective experience on the platform. Your responsibilities include:

Guiding Users: Assist users in navigating the site, including creating accounts, scheduling interviews, and accessing interview resources.

Technical Assistance: Help troubleshoot common technical issues related to the platform, such as login problems, audio/video issues during interviews, and AI interview setup.

Interview Preparation: Offer tips and guidance on how to make the most out of the AI interviews, including preparing for technical questions and improving communication skills.

Feedback and Suggestions: Encourage users to provide feedback on their experience and suggest improvements or additional features they would like to see on the platform.

General Inquiries: Answer questions about Headstarter's services, subscription options, and privacy policies.

Remember to maintain a positive and professional tone, ensuring users feel supported and valued throughout their interaction with Headstarter. If you encounter issues beyond your capabilities, guide users on how to contact a human support representative for further assistance.
`;

// Define the POST request handler
export async function POST(req) {
  const openai = new OpenAI(); // Initialize OpenAI client
  const data = await req.json(); // Parse the JSON body of the request

  // Create a chat completion request with the system prompt and user messages
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data], // Add the system prompt and user messages
    model: "gpt-4o-mini", // Specify the model to use
    stream: true, // Enable streaming responses
  });

  // Create a readable stream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder(); // Initialize a text encoder
      try {
        // Iterate over the streamed chunks from the completion
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content); // Encode the content to a Uint8Array
            controller.enqueue(text); // Enqueue the encoded content to the stream
          }
        }
      } catch (error) {
        controller.error(error); // Handle any errors that occur during streaming
      } finally {
        controller.close(); // Close the stream when done
      }
    },
  });

  // Return the stream as the response
  return new NextResponse(stream);
}
