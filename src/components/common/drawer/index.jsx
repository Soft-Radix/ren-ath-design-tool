import { ListSubheader, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import SketchExample from "../colorPicker";
import ThemeButton from "../ThemeButton";
export default function CustomDrawer({ open, toggleDrawer }) {
  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListSubheader
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "black",
                fontSize: 18,
              }}
            >
              Choose your Color Palette
            </Typography>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={toggleDrawer(false)}
            >
              <img src="../../../../src/assets/close-circle-line.svg" />
            </Box>
          </ListSubheader>
        </ListItem>
      </List>
      <Divider sx={{ width: "95%", margin: "auto" }} />
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "start",
          gap: 2,
        }}
      >
        <Typography variant="caption" sx={{ textAlign: "start" }}>
          Color
        </Typography>
        <SketchExample />
      </ListItem>
      <Box
        sx={{
          padding: "5px 15px",
        }}
      >
        <ThemeButton
          sx={{
            width: "100% !important",
          }}
        >
          Save Palette
        </ThemeButton>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
}
