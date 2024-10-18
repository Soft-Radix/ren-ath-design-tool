import { Button } from "@mui/material";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

const SketchExample = ({
  handleSave,
  selectedColors = [],
  setSelectedColors,
}) => {
  const [newColor, setNewColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const handleChange = (color) => {
    setNewColor(color?.hex);
  };

  const handleSaveCurrentColor = () => {
    const preColor = selectedColors || [];

    if (newColor && !preColor.includes(newColor)) {
      setSelectedColors([...preColor, newColor]);
    }

    setNewColor("");
  };
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // zIndex: "2",
      },
    },
  });

  return (
    <div style={styles.popover}>
      <SketchPicker color={newColor} onChange={handleChange} />
      <Button
        sx={{
          alignSelf: "end",
        }}
        onClick={handleSaveCurrentColor}
      >
        Save
      </Button>
    </div>
  );
};

export default SketchExample;
