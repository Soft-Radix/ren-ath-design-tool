import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const SketchExample = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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
        // zIndex: "2",
      },
    },
  });

  return (
    <div style={styles.popover}>
      <div style={styles.cover} onClick={handleClose} />
      <SketchPicker color={color} onChange={handleChange} />
    </div>
  );
};

export default SketchExample;
