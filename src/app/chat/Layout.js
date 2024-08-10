// chat/layout/Layout.js
"use client";
import { Box } from "@mui/material";
import NavbarComp from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarComp />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "url(/assets/blue-indonesia.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
