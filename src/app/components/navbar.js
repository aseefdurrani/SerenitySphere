import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

// Navbar component
export default function NavbarComp() {
  return (
    <>
      {/* AppBar component from MUI with a static position and blue background */}
      <AppBar position="static" sx={{ backgroundColor: blue }}>
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
              onClick={() => console.log("works")} // Corrected the onClick handler
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
            >
              <PersonIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
