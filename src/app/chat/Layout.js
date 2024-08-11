import React from "react";
import { Box, Stack, TextField, Button, List, ListItem } from "@mui/material";
import NavbarComp from "../components/navbar";

const Layout = ({
  messages,
  message,
  setMessage,
  sendMessage,
  chatTopics = [],
  activeChat,
  setActiveChat,
  startNewConversation,
  children,
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
        alignItems="flex-start"
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
          sx={{ marginRight: "20px" }}
        >
          <Button onClick={startNewConversation} sx={{ width: "100%", bgcolor: "primary.dark" }}>
            New Conversation
          </Button>
          <List>
            {chatTopics.map((topic, index) => (
              <ListItem
                key={index}
                button
                selected={topic.id === activeChat?.id}
                onClick={() => setActiveChat(topic)}
                sx={{
                  borderBottom: "1px solid white",
                  justifyContent: "center",
                  bgcolor: topic.id === activeChat?.id ? "primary.main" : "transparent",
                }}
              >
                {new Date(topic.startedAt).toLocaleString()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Stack
          direction="column"
          width="calc(100% - 340px)"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
          bgcolor="rgba(255, 255, 255, 0.65)"
          borderRadius={2}
          overflow="auto"
          sx={{
            margin: "0 20px",
            marginTop: "20px"
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
              sx={{ width: '100%' }}
            >
              <Box
                bgcolor={msg.role === "assistant" ? "primary.main" : "secondary.main"}
                color="white"
                borderRadius={16}
                p={3}
                sx={{ maxWidth: '80%' }}
              >
                {msg.content}
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
        {children}
      </Box>
    </>
  );
};

export default Layout;
