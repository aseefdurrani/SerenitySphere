"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import NavbarComp from "../../components/navbar";

export default function Home() {
  // State to hold the list of messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Headstarter support assistant. How can I help you today?`,
    },
  ]);

  // State to hold the current message input by the user
  const [message, setMessage] = useState("");

  // Function to handle sending a message
  const sendMessage = async () => {
    // Clear the input field
    setMessage("");
    // Add the user's message and a placeholder for the assistant's response
    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: message,
      },
      { role: "assistant", content: "" },
    ]);

    // Send the message to the server
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      // Read the response stream
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        // Decode the response text
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        // Update the last message with the assistant's response
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <>
      <NavbarComp />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "url(/bgs/chatBg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack
          direction="column"
          width="600px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
          bgcolor="rgba(255, 255, 255, 0.65)"
          borderRadius={2}
          overflow="auto"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
