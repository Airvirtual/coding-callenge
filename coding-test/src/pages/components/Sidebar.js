import { Drawer } from "./drawer";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { mainListItems } from "./listItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";

export const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer} className="toggle-menu-btn">
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">{mainListItems}</List>
    </Drawer>
  );
};
