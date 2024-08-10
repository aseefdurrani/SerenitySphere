"use client";
import React, { useState } from 'react';
import { Box, Button, Stack, TextField } from "@mui/material";
import Layout from '../Layout'; // Import the Layout component

const FitnessChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Headstarter support assistant. How can I help you today?`,
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

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
      return reader.read().then(function processText({ done, value }) {
        if (done) return result;

        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default FitnessChat;
