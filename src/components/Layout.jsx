import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ mt: 8, width: '100%', height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
