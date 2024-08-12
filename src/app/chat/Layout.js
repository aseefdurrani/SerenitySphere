import React, { useRef, useEffect } from "react";
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
  loadConversation, // Ensure the loadConversation function is passed in
  handleConversationClick, // Accept the function as a prop
  chatType, // Add chatType as a prop
  children,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <NavbarComp />
      <Box
        width="100vw"
        height="calc(100vh - 80px)" // Adjusted height to fit within the screen with a gap
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          backgroundImage: "url(/bgs/chatBg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "16px", // Added margin to create space between the navbar and boxes
        }}
      >
        <Box
          width="300px"
          height="100%" // Set to fill the remaining vertical space
          bgcolor="#537684" // Sidebar background color
          color="white"
          overflow="auto"
          sx={{ 
            marginRight: "20px", 
            borderRadius: 2, // Curved edges
          }}
        >
          <Button
            onClick={() => startNewConversation(chatType)} // Use the chatType prop
            sx={{ 
              width: "100%", 
              bgcolor: "#89c2d9", // Same color as the navbar
              color: "white",
              '&:hover': {
                bgcolor: "#76a1c2", // Slightly darker shade on hover
              }
            }}
          >
            New Conversation
          </Button>
          <List>
            {chatTopics.map((topic, index) => (
              <ListItem
                key={index}
                button
                selected={topic.id === activeChat?.id}
                onClick={() => handleConversationClick(topic)}
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
          height="100%" // Set to fill the remaining vertical space
          border="1px solid black"
          p={2}
          spacing={3}
          bgcolor="rgba(255, 255, 255, 0.65)"
          borderRadius={2}
          sx={{
            margin: "0 20px",
            overflow: "auto",
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
                sx={{ width: '100%', marginBottom: "16px" }} // Added spacing between messages
              >
                <Box
                  bgcolor={msg.role === "assistant" ? "#89c2d9" : "#89a2d9"} // Adjusted colors
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
                    __html: msg.content, // Corrected usage of dangerouslySetInnerHTML
                  }}
                />
              </Box>
            ))}
            <div ref={messagesEndRef} /> {/* Auto-scroll to this div */}
          </Box>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#89c2d9', // Navbar color for border
                  },
                  '&:hover fieldset': {
                    borderColor: '#89c2d9',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#89c2d9',
                  },
                },
              }}
            />
            <Button 
              variant="contained" 
              onClick={sendMessage}
              sx={{ 
                bgcolor: "#89c2d9", // Navbar color
                '&:hover': {
                  bgcolor: "#76a1c2", // Slightly darker shade on hover
                }
              }}
            >
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
