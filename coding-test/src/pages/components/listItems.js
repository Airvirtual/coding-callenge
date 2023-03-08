import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TokenIcon from "@mui/icons-material/Token";
import WavesIcon from "@mui/icons-material/Waves";
import ReceiptIcon from "@mui/icons-material/Receipt";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton to="/">
      <ListItemIcon>
        <WavesIcon />
      </ListItemIcon>
      <ListItemText primary="Pools" />
    </ListItemButton>
    <ListItemButton to="/tokens">
      <ListItemIcon>
        <TokenIcon />
      </ListItemIcon>
      <ListItemText primary="Tokens" />
    </ListItemButton>
    <ListItemButton to="/transactions">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
  </React.Fragment>
);
