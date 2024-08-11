'use client'
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useUser } from "@clerk/nextjs";
import { formatTextChunk } from "../../utils/formatText";

const FitnessChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatTopics, setChatTopics] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [botId, setBotId] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    const fetchBotId = async () => {
      try {
        const response = await fetch('/api/getBotId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'Fitness' }),
        });

        const data = await response.json();
        if (data.botId) {
          setBotId(data.botId);
        } else {
          console.error('Bot ID not found');
        }
      } catch (error) {
        console.error('Error fetching bot ID:', error);
      }
    };

    fetchBotId();
  }, []);

  useEffect(() => {
    const fetchOrCreateConversation = async () => {
      if (!user || !botId) return;
  
      try {
        const response = await fetch("/api/conversations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const conversations = await response.json();
        console.log('Conversations fetched:', conversations);
  
        if (conversations.length === 0) {
          // No existing conversations, create a new one
          const newConversationResponse = await fetch("/api/conversations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ botId, userId: user.id }),
          });
  
          if (!newConversationResponse.ok) {
            throw new Error(`HTTP error! status: ${newConversationResponse.status}`);
          }
  
          const newConversation = await newConversationResponse.json();
          console.log('New Conversation:', newConversation);
  
          setChatTopics([newConversation]);
          setActiveChat(newConversation);
  
          // Set initial message if new conversation is created
          setMessages(newConversation.messages.map(msg => ({
            role: msg.senderType.toLowerCase() === 'bot' ? 'assistant' : 'user',
            content: msg.content
          })));
        } else {
          // Existing conversations
          setChatTopics(conversations);
          setActiveChat(conversations[0]);
  
          // Load messages from the first existing conversation
          setMessages(conversations[0].messages.map(msg => ({
            role: msg.senderType.toLowerCase() === 'bot' ? 'assistant' : 'user',
            content: msg.content
          })));
        }
      } catch (error) {
        console.error("Error fetching or creating conversation:", error);
      }
    };
  
    fetchOrCreateConversation();
  }, [user, botId]);
    
    
  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    const response = await fetch("http://localhost:8080/api/fitness", {
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
  
  const startNewConversation = async () => {
    if (!user || !botId) return; 
  
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId, userId: user.id }),
      });
  
      const newConversation = await response.json();
      setChatTopics((topics) => [newConversation, ...topics]);
      setActiveChat(newConversation);
  
      // Convert the messages to the correct format
      setMessages(newConversation.messages.map(msg => ({
        role: msg.senderType.toLowerCase() === 'bot' ? 'assistant' : 'user',
        content: msg.content
      })));
    } catch (error) {
      console.error("Error starting new conversation:", error);
    }
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
    />
  );
};

export default FitnessChat;
