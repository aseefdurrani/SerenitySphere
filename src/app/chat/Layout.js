"use client";
import React from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import NavbarComp from "../components/navbar";

const Layout = ({
  messages,
  message,
  setMessage,
  sendMessage,
  chatTopics = [], // Default to an empty array if not provided
  activeChat,
  setActiveChat,
  startNewConversation,
  children, // Allow additional children content
}) => {
  return (
    <>
      <NavbarComp />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start" // Adjust alignment to flex-start to align at the top
        sx={{
          backgroundImage: "url(/bgs/chatBg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          width="300px"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.7)"
          color="white"
          overflow="auto"
          sx={{ marginRight: "20px" }} // Add space between conversation sidebar and chat box
        >
          <Button
            onClick={startNewConversation}
            sx={{ width: "100%", bgcolor: "primary.dark" }}
          >
            New Conversation
          </Button>
          <List>
            {chatTopics.map((topic, index) => (
              <ListItem
                key={index}
                button
                selected={topic === activeChat}
                onClick={() => setActiveChat(topic)}
                sx={{
                  borderBottom: "1px solid white",
                  justifyContent: "center",
                  bgcolor:
                    topic === activeChat ? "primary.main" : "transparent", // Highlight the active conversation
                }}
              >
                {new Date(topic).toLocaleTimeString()} // Display timestamp as
                title
              </ListItem>
            ))}
          </List>
        </Box>
        <Stack
          direction="column"
          width="calc(100% - 340px)" // Ensure the chat box expands to fill the space
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
          bgcolor="rgba(255, 255, 255, 0.65)"
          borderRadius={2}
          overflow="auto"
          sx={{
            margin: "0 20px",
            marginTop: "20px",
          }}
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
        {children}
      </Box>
    </>
  );
};

export default Layout;
