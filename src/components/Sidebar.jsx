import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import BarChartIcon from "@mui/icons-material/BarChart";
import { colors } from "../styles/theme";
import CRI_logo from "../images/CRI-logo_teks-white.png";

const DrawerItem = ({ url, handleClick, children, label, ...props }) => {
  return (
    <ListItem disablePadding {...props}>
      <Link href={url} sx={{ width: "100%" }} underline="none">
        <ListItemButton
          onClick={handleClick}
          sx={{
            ":hover": { bgcolor: colors.blue[100], borderRadius: 2 },
            ml: 1,
            mr: 2,
          }}
        >
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              color: colors.grey[900],
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

const drawerWidth = 200;

const Sidebar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            component={"img"}
            alt="Company Icon"
            src={CRI_logo}
            sx={{
              height: 54,
              width: 151,
            }}
          ></Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <DrawerItem label={"Data"} url={"/"}>
              <FolderIcon />
            </DrawerItem>
            <DrawerItem label={"Grafik"} url={"/chart"}>
              <BarChartIcon />
            </DrawerItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
