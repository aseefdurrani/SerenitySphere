"use client";
import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import Layout from "../Layout"; // Import the Layout component
import { formatTextChunk } from "../../utils/formatText"; // Import the formatTextChunk function

const JournalChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Journaling support assistant at SerenitySphere. How can I help you today?`,
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

    const response = await fetch("http://localhost:8080/api/journal", {
      // fetch end point is updated
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { query: message }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let assistantResponse = "";

    const processText = async ({ done, value }) => {
      if (done) {
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: assistantResponse },
          ];
        });
        return;
      }

      const text = decoder.decode(value, { stream: true });

      // console.log("UNFORMATTED decdoed text chunk", text);

      // Format the text chunk
      const formattedText = formatTextChunk(text);
      assistantResponse += formattedText;

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: assistantResponse },
        ];
      });
      reader.read().then(processText);
    };

    reader.read().then(processText);
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
                message.role === "assistant" ? "primary.main" : "secondary.main"
              }
              color="white"
              borderRadius={16}
              p={3}
              sx={{
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                maxWidth: "80%",
                wordWrap: "break-word",
                boxShadow: 2,
                "& strong": {
                  fontWeight: "bold",
                },
                "& br": {
                  display: "block",
                  content: '""',
                  marginTop: "0.5em",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: message.content,
              }}
            ></Box>
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

export default JournalChat;
