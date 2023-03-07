import RefreshIcon from "@mui/icons-material/Refresh";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Tokens from "./Tokens";
import TopPools from "./TopPools";
import Transactions from "./Transactions";
export default function MenuAppBar() {
  const [refresh, setRefresh] = React.useState(true);
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Uniswap V3 Subgraph Dashboard
          </Typography>

          <div>
            <IconButton
              onClick={() => setRefresh(!refresh)}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Typography variant="subtitle1" sx={{ pr: 1 }}>
                Refresh
              </Typography>
              <RefreshIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Grid container>
        <TopPools refresh={refresh} />
        <Tokens refresh={refresh} />
        <Transactions refresh={refresh} />
      </Grid>
    </Box>
  );
}
