"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import NavbarComp from "../components/navbar";
import { useEffect } from "react";

export default function Home() {
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

  const generateRandomKeyframes = (index) => {
    const translateYStart = Math.random() * 20 - 10; // Random start position between -10px and 10px
    const translateYMid = Math.random() * 40 - 20; // Random mid position between -20px and 20px
    const translateYEnd = Math.random() * 20 - 10; // Random end position between -10px and 10px

    return `
      @keyframes float-${index} {
        0% {
          transform: translateY(${translateYStart}px);
        }
        50% {
          transform: translateY(${translateYMid}px);
        }
        100% {
          transform: translateY(${translateYEnd}px);
        }
      }
    `;
  };

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    for (let i = 0; i < 6; i++) {
      const keyframes = generateRandomKeyframes(i);
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, []);

  return (
    <>
      <NavbarComp />
      <style jsx global>{`
        ${Array.from({ length: 6 }, (_, i) => generateRandomKeyframes(i)).join(
          "\n"
        )}
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
            Welcome (Insert Name)
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
