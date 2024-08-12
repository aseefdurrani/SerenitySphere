"use client";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const backgroundImage = "/assets/SerenitySphereBlueWave-transformed.png";

  const buttonStyle = {
    marginTop: "30px",
    backgroundColor: "transparent",
    color: "#14213d",
    padding: "5px 20px",
    borderRadius: "20px",
    border: "1px solid #14213d",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      boxShadow: "0 0.5em 0.5em -0.4em #ffe5d9",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    },
  };

  const redirectUrl = "/home"; // The path to redirect to after sign-in or sign-up

  useEffect(() => {
    console.log("useEffect triggered", { isSignedIn, user });
    if (isSignedIn && user && user.id && user.primaryEmailAddress) {
      console.log("Attempting to store user data", {
        id: user.id,
        email: user.primaryEmailAddress.emailAddress,
      });
      storeUserData(user.id, user.primaryEmailAddress.emailAddress);
    }
  }, [isSignedIn, user]);

  const storeUserData = async (userId, email) => {
    console.log("storeUserData called", { userId, email });
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
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const handleSignIn = () => {
    if (isSignedIn) {
      router.push(redirectUrl);
    } else {
      openSignIn({ afterSignInUrl: redirectUrl });
    }
  };

  const handleSignUp = () => {
    if (isSignedIn) {
      router.push(redirectUrl);
    } else {
      openSignUp({
        afterSignUpUrl: redirectUrl,
        redirectUrl: redirectUrl,
        onSignUpComplete: (result) => {
          if (result.createdUserId && result.createdSessionId) {
            storeUserData(result.createdUserId, result.emailAddress);
          }
        },
      });
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
              color: "#003049",
            }}
          >
            SerenitySphere
          </Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              fontWeight: "light",
              color: "#14213d",
            }}
          >
            your oasis of calm and care
          </Box>
          <Button variant="contained" sx={buttonStyle} onClick={handleSignIn}>
            Sign in
          </Button>
          <Button variant="contained" sx={buttonStyle} onClick={handleSignUp}>
            Sign up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
