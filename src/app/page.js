"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import NavbarComp from "./components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const backgroundImage = "/SerenitySphereMaybe-modified2.png"; // Update with your image path

  const router = useRouter();

  // would have intermediate page to route to where user can deecide what chat to click on
  // just sample for now
  const handleButtonClick = () => {
    router.push("/chat/fitness");
  };

  return (
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
          height: "100%",
          transform: "translateY(-60px)", // Adjust the value as needed
        }}
      >
        <Stack spacing={3} alignContent="center" alignItems="center">
          <Box
            sx={{
              fontSize: "5rem",
              fontWeight: "light",
              color: "black",
            }}
          >
            SerenitySphere
          </Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              fontWeight: "light",
              color: "black",
            }}
          >
            your oasis of calm and care
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: "30px",
            }}
            onClick={handleButtonClick}
          >
            Click to Get Started
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
