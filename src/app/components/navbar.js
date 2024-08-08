import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function NavbarComp() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: blue }}>
        <Toolbar
          sx={{ justifyContent: "space-between", backgroundColor: blue }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            @pantryTracker
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={console.log("works")}
              sx={{
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Go Home
            </Button>
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
              Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
