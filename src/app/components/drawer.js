import React from "react";
import {
  Drawer,
  Avatar,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useClerk, useUser } from "@clerk/nextjs";

const DrawerComponent = ({ isOpen, toggleDrawer }) => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const drawerStyle = {
    background: "linear-gradient(0deg, #89c2d9, white)",
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

  const handleSignOut = () => {
    signOut().then(() => {
      toggleDrawer(false)(); // Close the drawer after signing out
    }).catch((error) => {
      console.error("Failed to sign out", error);
    });
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 300, height: "100%", ...drawerStyle }}
    >
        <Stack spacing={3} direction="column" alignItems="center" marginTop={5}>
          {/* Conditional rendering for Avatar with fallback */}
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={user?.imageUrl}
            alt={user?.fullName || "User"}
          >
            {!user?.imageUrl && <AccountCircleIcon sx={{ fontSize: 100 }} />}
          </Avatar>
          <Typography variant="h6">{user?.fullName || "Unnamed User"}</Typography>
          <Typography variant="h6">Email: {user?.primaryEmailAddress?.emailAddress || "No Email Available"}</Typography>
          <Typography variant="h6">Subscription Level: Free</Typography>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={toggleDrawer(false)}
            sx={buttonStyle}
          >
            Close Menu
          </Button>
          <Button
            variant="contained"
            onClick={handleSignOut}
            sx={buttonStyle}
          >
            Sign Out
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default DrawerComponent;
