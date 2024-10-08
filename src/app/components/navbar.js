import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { blue, lightBlue } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import DrawerComponent from "./drawer";
import { useState } from "react";

// Navbar component
export default function NavbarComp() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    router.push("/home");
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const navColor = "#89c2d9";

  return (
    <>
      {/* AppBar component from MUI with a static position and blue background */}
      <AppBar position="static" sx={{ backgroundColor: navColor }}>
        {/* Toolbar component to hold the content of the AppBar */}
        <Toolbar
          sx={{ justifyContent: "space-between", backgroundColor: blue }}
        >
          {/* Typography component for the title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            @SerenitySphere
          </Typography>
          {/* Box component to hold the buttons, with flex display and gap between buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Button component for "Go Home" */}
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleButtonClick} // Corrected the onClick handler
              sx={{
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <HomeIcon />
            </Button>
            {/* Button component for "Profile" */}
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={toggleDrawer(true)}
            >
              <PersonIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
}
