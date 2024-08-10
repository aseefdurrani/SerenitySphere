"use client";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import NavbarComp from "./components/navbar";

export default function Home() {
  const { openSignIn, openSignUp, signOut } = useClerk(); // Added signOut function
  const { isSignedIn } = useUser();
  const router = useRouter();

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

  const redirectUrl = '/home'; // The path to redirect to after sign-in or sign-up

  const handleSignIn = () => {
    if (isSignedIn) {
      router.push(redirectUrl);
    } else {
      openSignIn({ afterSignInUrl: redirectUrl });
    }
  };

  const handleSignUp = () => {
    if (isSignedIn) {
      // Sign out the current user before opening the sign-up modal
      signOut().then(() => {
        openSignUp({ afterSignUpUrl: redirectUrl });
      });
    } else {
      openSignUp({ afterSignUpUrl: redirectUrl });
    }
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
            onClick={handleSignIn}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={handleSignUp}
          >
            Sign up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
