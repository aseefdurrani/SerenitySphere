import React, { useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const DrawerComponent = ({ isOpen, toggleDrawer }) => {
  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 300 }}
    >
      <List>
        {["Item 1", "Item 2", "Item 3", "Item 4"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default DrawerComponent;
