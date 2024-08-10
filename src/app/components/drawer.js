import React, { useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// want a gradient from this color: #89c2d9 to white in the drawer going from top to bottom

const DrawerComponent = ({ isOpen, toggleDrawer }) => {
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

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 300, height: "100%", ...drawerStyle }}
    >
      <Stack spacing={3} direction="column" alignItems="center" marginTop={5}>
        <AccountCircleIcon sx={{ fontSize: 100 }} />
        <Typography variant="h6"> [User Name] </Typography>
        <Typography variant="h6">Email: [insert email] </Typography>
        <Typography variant="h6">Subscription Level: Free </Typography>
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
            onClick={toggleDrawer(false)}
            sx={buttonStyle}
          >
            Logout
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
