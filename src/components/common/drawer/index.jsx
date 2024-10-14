import { ListSubheader, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../../../hook/CustomHook/usefetch";
import { useProductStore } from "../../../store";
import SketchExample from "../colorPicker";
import LoadingBars from "../loader/LoadingBars";
import ThemeButton from "../ThemeButton";
import {
  getUserColorPellete,
  getUserColorPelleteTemporary,
  getUserLocalData,
  setUserColorPellete,
  setUserColorPelleteTemporary,
} from "../../../utils/common";
import useGetColorPelleteList from "../../../hook/CustomHook/useGetColorPelleteList";

export default function ColorPelleteDrawer({ open, toggleDrawer }) {
  const userToken = getUserLocalData();
  const colorPalletePre = getUserColorPellete();
  const colorPelletTemp = getUserColorPelleteTemporary();
  // get pre saved color for this login user from store
  const { handleUpdateCollorPellteCollection } = useProductStore(
    (store) => store
  );
  const colorList = useGetColorPelleteList();
  const [selectedColors, setSelectedColors] = useState([]); // state for multiple colors

  // fecth api to save user color pellete list
  const [saveColorPelleteQuery, { response, loading, error }] = useFetch(
    "/color-palette/add",
    {
      method: "post",
    }
  );

  // handle save function to call saveColorPelleteQuery to save colorPellete list
  const handleSaveSelectedColors = () => {
    if (selectedColors?.length > 0 && userToken) {
      const createStringOfColors = selectedColors.join(",");
      saveColorPelleteQuery({ color_palette: createStringOfColors });
      setUserColorPellete(selectedColors);
      handleUpdateCollorPellteCollection(selectedColors);
    } else {
      handleUpdateCollorPellteCollection(selectedColors);
      setUserColorPelleteTemporary(selectedColors);
    }
  };

  // handle remove function to remove selected color from list
  const handleRemoveColor = (color) => {
    const selectedColorsList = [...selectedColors];
    const listOfNonMatchingColors = selectedColorsList?.filter((preColor) => {
      return color !== preColor;
    });
    setSelectedColors([...listOfNonMatchingColors]);
  };

  // use effect to handle response and error for saveColorPelleteQuery api
  React.useEffect(() => {
    toast.dismiss();
    if (response) {
      toast.success(response.message);
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
    toggleDrawer(false);
  }, [response, error]);

  // update selectedColors state when pre saved colors updated from store
  React.useEffect(() => {
    if (userToken) {
      if (colorPalletePre?.length > 0) {
        setSelectedColors([...colorList]);
      }
    } else {
      setSelectedColors(colorPelletTemp);
    }
  }, [colorList]);

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
              <img src="/close-circle-line.svg" />
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
        {/* Pass the color selection handler to SketchExample */}
        <SketchExample
          setSelectedColors={setSelectedColors}
          selectedColors={selectedColors}
        />
      </ListItem>
      <Divider sx={{ width: "95%", margin: "auto", marginTop: 2 }} />
      {/* Render saved colors */}
      {selectedColors?.length > 0 && (
        <Box sx={{ padding: "15px" }}>
          <Typography variant="subtitle2">Saved Colors:</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 3 }}>
            {selectedColors.map((color, index) => (
              <Box key={index} className="colorListBox">
                <img
                  src="/close-circle-line.svg"
                  onClick={() => handleRemoveColor(color)}
                />
                <Box
                  className="colorListBoxChild"
                  sx={{
                    backgroundColor: color,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          padding: "5px 15px",
        }}
      >
        {/* Save button triggers color saving */}
        <ThemeButton
          sx={{
            width: "100% !important",
          }}
          onClick={handleSaveSelectedColors}
        >
          {loading && <LoadingBars />} Save Palette
        </ThemeButton>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      onChange={(color) => console.log("color", color)}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
}
