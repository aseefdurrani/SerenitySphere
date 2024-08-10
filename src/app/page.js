"use client";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useClerk } from '@clerk/nextjs';
import NavbarComp from "./components/navbar";

export default function Home() {
  const { openSignIn, openSignUp } = useClerk();

  const backgroundImage = "/bgs/cloud2.webp";

  const buttonStyle = {
    marginTop: "30px",
    backgroundColor: "transparent",
    color: "black",
    padding: "5px 20px",
    borderRadius: "20px",
    border: "1px solid black",
    textTransform: 'capitalize',
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      boxShadow: "0 0.5em 0.5em -0.4em #ffe5d9",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    }
  };

  const redirectUrl = '/home';

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
          transform: "translateY(-60px)",
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
            onClick={() => openSignIn( redirectUrl )}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => openSignUp( redirectUrl )}
          >
            Sign up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
