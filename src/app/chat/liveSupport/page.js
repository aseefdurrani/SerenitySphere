"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useUser } from "@clerk/nextjs";
import { formatTextChunk } from "../../utils/formatText";

const LiveSupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatTopics, setChatTopics] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [botId, setBotId] = useState(null);
  const chatType = "LiveSupport"; // Define chatType for this component

  const { user } = useUser();

  const startNewConversation = React.useCallback(
    async (chatType) => {
      if (!user || !botId) return;

      try {
        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ botId, userId: user.id, chatType }), // Pass chatType here
        });

        const newConversation = await response.json();
        setChatTopics((topics) => [newConversation, ...topics]);
        setActiveChat(newConversation);

        // Convert the messages to the correct format
        setMessages(
          newConversation.messages.map((msg) => ({
            role: msg.senderType.toLowerCase() === "bot" ? "assistant" : "user",
            content: msg.content,
          }))
        );
      } catch (error) {
        console.error("Error starting new conversation:", error);
      }
    },
    [botId, user]
  );

  useEffect(() => {
    const fetchBotId = async () => {
      try {
        const response = await fetch("/api/getBotId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: chatType }), // Use chatType variable
        });

        const data = await response.json();
        if (data.botId) {
          setBotId(data.botId);
        } else {
          console.error("Bot ID not found");
        }
      } catch (error) {
        console.error("Error fetching bot ID:", error);
      }
    };

    fetchBotId();
  }, [chatType]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user || !botId) return;

      try {
        const response = await fetch(
          `/api/conversations?userId=${user.id}&botId=${botId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const conversations = await response.json();
        console.log("Conversations fetched:", conversations);

        if (conversations.length > 0) {
          setChatTopics(conversations);
          setActiveChat(conversations[0]);

          // Load messages from the first existing conversation
          setMessages(
            conversations[0].messages.map((msg) => ({
              role:
                msg.senderType.toLowerCase() === "bot" ? "assistant" : "user",
              content: msg.content,
            }))
          );
        } else {
          // Start a new conversation if no existing ones
          startNewConversation(chatType);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [user, botId, chatType, startNewConversation]);

  const sendMessage = async () => {
    if (!message.trim() || !activeChat) return; // Prevent sending empty messages if no active chat

    const userMessage = {
      role: "user",
      content: message,
    };

    // Add the user's message to the state
    setMessages((messages) => [
      ...messages,
      userMessage,
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    // Save the user's message to the database
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: activeChat.id,
          content: message,
          senderType: "User",
        }),
      });
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    // change for live support
    const response = await fetch("http://localhost:8080/api/liveSupport", {
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
        // Save the assistant's message to the database
        try {
          await fetch("/api/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              conversationId: activeChat.id,
              content: assistantResponse,
              senderType: "Bot",
            }),
          });
        } catch (error) {
          console.error("Error saving assistant message:", error);
        }
        return;
      }

      const text = decoder.decode(value || new Int8Array(), { stream: true });

      // Format the text chunk
      const formattedText = formatTextChunk(text);
      assistantResponse += formattedText;

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: assistantResponse,
          },
        ];
      });

      return reader.read().then(processText);
    };

    reader.read().then(processText);
  };

  const handleConversationClick = (topic) => {
    setActiveChat(topic);
    setMessages(
      topic.messages.map((msg) => ({
        role: msg.senderType.toLowerCase() === "bot" ? "assistant" : "user",
        content: msg.content,
      }))
    );
  };

  return (
    <Layout
      messages={messages}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
      chatTopics={chatTopics}
      activeChat={activeChat}
      setActiveChat={setActiveChat}
      startNewConversation={startNewConversation}
      handleConversationClick={handleConversationClick} // Passing down the function
      chatType={chatType} // Pass chatType as a prop
    />
  );
};

export default LiveSupportChat;
