import React from "react";
import { Box, Stack, TextField, Button, List, ListItem } from "@mui/material";
import NavbarComp from "../components/navbar";

// New component for the scrollable chat area
const ScrollableChatArea = React.forwardRef(({ messages }, ref) => {
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      ref={ref}
      sx={{ flexGrow: 1, overflow: "auto", maxHeight: "calc(100% - 56px)" }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
          sx={{ width: "100%", marginBottom: "16px" }}
        >
          <Box
            bgcolor={msg.role === "assistant" ? "#89c2d9" : "#89a2d9"}
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
              "& strong": { fontWeight: "bold" },
              "& br": { display: "block", content: '""', marginTop: "0.5em" },
            }}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        </Box>
      ))}
    </Box>
  );
});

const Layout = ({
  messages,
  message,
  setMessage,
  sendMessage,
  chatTopics = [],
  activeChat,
  setActiveChat,
  startNewConversation,
  loadConversation,
  handleConversationClick,
  chatType,
  children,
}) => {
  const chatAreaRef = React.useRef(null);

  return (
    <>
      <NavbarComp />
      <Box
        height="100vh"
        sx={{
          backgroundImage: "url(/bgs/chatBg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          width="100vw"
          height="calc(100vh - 80px)"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            paddingTop: "10px",
            backgroundColor: "transparent",
          }}
        >
          <Box
            width="300px"
            height="100%"
            bgcolor="#537684"
            color="white"
            overflow="auto"
            sx={{
              marginRight: "20px",
              marginLeft: "20px",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 4,
            }}
          >
            <Button
              onClick={() => startNewConversation(chatType)}
              sx={{
                width: "100%",
                bgcolor: "#89c2d9",
                color: "white",
                "&:hover": { bgcolor: "#76a1c2" },
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
                    bgcolor:
                      topic.id === activeChat?.id
                        ? "primary.main"
                        : "transparent",
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
            height="100%"
            border="1px solid black"
            p={2}
            spacing={3}
            bgcolor="rgba(255, 255, 255, 0.65)"
            borderRadius={2}
            sx={{
              margin: "0 20px",
              overflow: "hidden",
              boxShadow: 4,
            }}
          >
            <ScrollableChatArea ref={chatAreaRef} messages={messages} />
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#89c2d9" },
                    "&:hover fieldset": { borderColor: "#89c2d9" },
                    "&.Mui-focused fieldset": { borderColor: "#89c2d9" },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                sx={{
                  bgcolor: "#89c2d9",
                  "&:hover": { bgcolor: "#76a1c2" },
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
