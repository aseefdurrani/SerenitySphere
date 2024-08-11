"use client";
import React, { useState } from "react";
import Layout from "../Layout"; // Import the Layout component
import { formatTextChunk } from "../../utils/formatText"; // Import the formatTextChunk function

const MindfulChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Mindfulness support assistant at SerenitySphere. How can I help you today?`,
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    const response = await fetch("http://localhost:8080/api/mindfulness", {
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
    <Layout
      messages={messages}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
    />
  );
};

export default MindfulChat;
