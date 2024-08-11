"use client";
import React, { useState } from "react";
import Layout from "../Layout"; // Import the Layout component

const MoodChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Mood support assistant at SerenitySphere. How can I help you today?`,
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

    const response = await fetch("http://localhost:8080/api/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { query: message }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = "";
    const processText = ({ done, value }) => {
      if (done) return result;

      const text = decoder.decode(value || new Int8Array(), { stream: true });
      const jsonResponse = JSON.parse(text);
      const assistantResponse = jsonResponse.response;

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + assistantResponse,
          },
        ];
      });

      return reader.read().then(processText);
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

export default MoodChat;
