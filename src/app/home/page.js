"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import NavbarComp from "../components/navbar";

export default function Home() {
  const { user } = useUser();
  const backgroundImage = "/bgs/sphere.webp";
  const router = useRouter();

  // Local state to track if user data is stored
  const [isUserDataStored, setIsUserDataStored] = useState(false);

  const handleButtonClick = (path) => {
    router.push(path);
  };

  const buttonStyle = {
    marginTop: "30px",
    backgroundColor: "transparent",
    color: "black",
    padding: "5px 20px",
    borderRadius: "20px",
    border: "1px solid black",
    textTransform: "capitalize",
    animation: "float 3s ease-in-out infinite",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      boxShadow: "0 0.5em 0.5em -0.4em #ffe5d9",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    },
  };

  const predefinedKeyframes = [
    { start: 0, mid: -16, end: 0 },
    { start: 0, mid: 16, end: 0 },
    { start: 0, mid: -9, end: 0 },
    { start: 0, mid: 9, end: 0 },
    { start: 0, mid: -14, end: 0 },
    { start: 0, mid: 14, end: 0 },
  ];

  const generateKeyframes = (index) => {
    const { start, mid, end } = predefinedKeyframes[index];
    return `
      @keyframes float-${index} {
        0% {
          transform: translateY(${start}px);
        }
        50% {
          transform: translateY(${mid}px);
        }
        100% {
          transform: translateY(${end}px);
        }
      }
    `;
  };

  const storeUserData = async (userId, email) => {
    console.log("Storing user data", { userId, email });
    try {
      const response = await fetch("/api/storeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to store user data: ${errorData.message}`);
      }

      const data = await response.json();
      console.log("User data stored successfully:", data);
      setIsUserDataStored(true); // Set the flag to true on successful storage
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  useEffect(() => {
    if (user && user.id && user.primaryEmailAddress && !isUserDataStored) {
      console.log("User detected, attempting to store data", { id: user.id, email: user.primaryEmailAddress.emailAddress });
      storeUserData(user.id, user.primaryEmailAddress.emailAddress);
    }
  }, [user, isUserDataStored]);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    for (let i = 0; i < predefinedKeyframes.length; i++) {
      const keyframes = generateKeyframes(i);
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, []);

  return (
    <>
      <NavbarComp />
      <style jsx global>{`
        ${predefinedKeyframes.map((_, i) => generateKeyframes(i)).join("\n")}
      `}</style>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
          }}
        >
          <Typography variant="h2" sx={{ color: "white" }}>
            Welcome, {user?.firstName}
          </Typography>
        </Box>
        <Stack spacing={4} direction="row" justifyContent="center">
          {[
            "/chat/fitness",
            "/chat/inspiration",
            "/chat/journal",
            "/chat/mindfulness",
            "/chat/mood",
            "/chat/liveSupport",
          ].map((path, index) => (
            <Button
              key={path}
              variant="contained"
              onClick={() => handleButtonClick(path)}
              sx={{
                ...buttonStyle,
                animation: `float-${index} 3s ease-in-out infinite`,
              }}
            >
              {path
                .split("/")[2]
                .replace(/([A-Z])/g, " $1")
                .trim()}
            </Button>
          ))}
        </Stack>
      </Box>
    </>
  );
}
