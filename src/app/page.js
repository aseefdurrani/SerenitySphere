"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import NavbarComp from "./components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  // const backgroundImage = "/SerenitySphereMaybe-modified2.png";

  const backgroundImage = "/bgs/cloud2.webp";

  const router = useRouter();

  const buttonStyle = {
    marginTop: "30px",
    backgroundColor: "transparent",
    color: "black",
    padding: "5px 20px",
    borderRadius: "20px",
    border: "1px solid black",
    textTransform: 'capitalize', // Only capitalize the first letter
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      boxShadow: "0 0.5em 0.5em -0.4em #ffe5d9",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    }
  };

  // would have intermediate page to route to where user can deecide what chat to click on
  // just sample for now
  // const handleButtonClick = () => {
  //   router.push("/chatRoom/fitness");
  // };

  const handleButtonClick = (path) => {
    router.push(path);
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
        <Stack spacing={1.8} alignContent="center" alignItems="center">
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
            sx={buttonStyle}
            onClick={() => handleButtonClick("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick("/signup")}
          >
            Signup
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
