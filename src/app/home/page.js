"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import NavbarComp from "../components/navbar";
import { useEffect } from "react";
import DrawerComponent from "../components/drawer";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const backgroundImage = "/bgs/sphere.webp";
  const router = useRouter();

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
    { start: 0, mid: -20, end: 0 },
    { start: 0, mid: 20, end: 0 },
    { start: 0, mid: -15, end: 0 },
    { start: 0, mid: 15, end: 0 },
    { start: 0, mid: -18, end: 0 },
    { start: 0, mid: 18, end: 0 },
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
